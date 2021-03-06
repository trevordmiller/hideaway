import { ipcRenderer } from 'electron'
import dev from 'electron-is-dev'
import React, { Component } from 'react'
import { uiGroups } from 'nova-colors'
import WobblySpinner from 'react-wobbly-spinner'
import hexToRgba from 'hex-rgba'
import { spacing, fontSizes } from '../utils/theme'
import TimeInput from './TimeInput'
import Button from './Button'
import Label from './Label'

const oneMinute = dev ? 1000 : 60000

const initialState = {
  hasCompletedFirstStart: true,
  isOn: false,
  totalMinutes: 30,
  minutesLeft: 30,
  minuteIntervalId: null,
  totalMinutesTimeoutId: null,
}

class Timer extends Component {
  state = initialState

  componentDidMount = () => {
    const hasCompletedFirstStart = ipcRenderer.sendSync(
      'configGet',
      'hasCompletedFirstStart'
    )
    this.setState({
      hasCompletedFirstStart,
    })
  }

  reset = () => {
    const { minuteIntervalId, totalMinutesTimeoutId } = this.state
    const { onTimerReset } = this.props
    onTimerReset()
    clearInterval(minuteIntervalId)
    clearTimeout(totalMinutesTimeoutId)
    this.setState(initialState)
    ipcRenderer.send('reset')
  }

  finish = () => {
    this.reset()
    ipcRenderer.send('finish')
  }

  minutePassed = () => {
    const { minutesLeft } = this.state
    this.setState({
      minutesLeft: minutesLeft - 1,
    })
  }

  handleTotalMinutesChange = totalMinutes => {
    this.setState({
      totalMinutes,
      minutesLeft: totalMinutes,
    })
  }

  handleStart = () => {
    const { hasCompletedFirstStart, totalMinutes } = this.state
    const { onTimerStart } = this.props

    onTimerStart()

    this.setState({
      isOn: true,
      minuteIntervalId: setInterval(this.minutePassed, oneMinute),
      totalMinutesTimeoutId: setTimeout(this.finish, totalMinutes * oneMinute),
    })

    ipcRenderer.send('start')

    if (!hasCompletedFirstStart) {
      ipcRenderer.send('configSet', 'hasCompletedFirstStart', true)
      this.setState({
        hasCompletedFirstStart: true,
      })
    }
  }

  handleStop = () => {
    this.reset()
  }

  render() {
    const {
      hasCompletedFirstStart,
      isOn,
      totalMinutes,
      minutesLeft,
    } = this.state
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {isOn
          ? <div
              style={{
                position: 'relative',
                marginBottom: spacing.medium,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: fontSizes.xlarge,
                    color: uiGroups.userCurrentState,
                    textAlign: 'center',
                  }}
                >
                  {minutesLeft}
                </div>
              </div>

              <WobblySpinner
                diameter={90}
                wobbleOffset={5}
                thickness={5}
                spinRate={2000}
                outerColor={hexToRgba(uiGroups.userCurrentState, 25)}
                innerColor={hexToRgba(uiGroups.userCurrentState, 50)}
                wobbleColor={hexToRgba(uiGroups.userCurrentState, 75)}
              />
            </div>
          : <TimeInput
              value={totalMinutes}
              onChange={this.handleTotalMinutesChange}
            />}

        <div
          style={{
            marginBottom: spacing.medium,
            textAlign: 'center',
          }}
        >
          {isOn ? 'minutes left' : 'minutes'}
        </div>

        <Button onClick={isOn ? this.handleStop : this.handleStart}>
          {`${isOn ? 'Stop' : 'Start'} Hideaway`}
        </Button>

        {!hasCompletedFirstStart &&
          <div
            style={{
              textAlign: 'center',
              maxWidth: 300,
              marginTop: spacing.medium,
            }}
          >
            <Label>
              Starting closes all apps, hides your dock, and turns on Do Not
              Disturb for the amount of time you have set
            </Label>
          </div>}
      </div>
    )
  }
}

export default Timer
