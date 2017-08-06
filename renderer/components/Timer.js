import { ipcRenderer } from 'electron'
import dev from 'electron-is-dev'
import React, { Component } from 'react'
import { uiGroups } from 'nova-colors'
import { spacing, fontSizes, lineHeights } from '../utils/theme'
import TimeInput from './TimeInput'
import Button from './Button'

const oneMinute = dev ? 1000 : 60000

const initialState = {
  isOn: false,
  totalMinutes: 30,
  minutesLeft: 30,
  minuteIntervalId: null,
  totalMinutesTimeoutId: null,
}

class Timer extends Component {
  state = initialState

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
    const { totalMinutes } = this.state
    const { onTimerStart } = this.props
    onTimerStart()
    this.setState({
      isOn: true,
      minuteIntervalId: setInterval(this.minutePassed, oneMinute),
      totalMinutesTimeoutId: setTimeout(this.finish, totalMinutes * oneMinute),
    })
    ipcRenderer.send('start')
  }

  handleStop = () => {
    this.reset()
  }

  render() {
    const { isOn, totalMinutes, minutesLeft } = this.state
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
                fontSize: fontSizes.xlarge,
                paddingTop: spacing.small,
                paddingBottom: spacing.small,
                color: uiGroups.userCurrentState,
                textAlign: 'center',
                lineHeight: lineHeights.small,
              }}
            >
              {minutesLeft}
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
      </div>
    )
  }
}

export default Timer
