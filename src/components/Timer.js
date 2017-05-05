import {ipcRenderer} from 'electron'
import React, {Component} from 'react'
import {uiGroups} from 'nova-colors'
import NumericInput from 'react-numeric-input'

const oneMinute = process.env.NODE_ENV === 'production'
  ? 60000
  : 1000

const initialState = {
  isOn: false,
  totalMinutes: 30,
  minutesLeft: 30,
  minuteIntervalId: null,
  totalMinutesTimeoutId: null,
}

class Timer extends Component {

  constructor(props) {
    super(props)
    this.state = initialState
    this.handleTotalMinutesChange = this.handleTotalMinutesChange.bind(this)
    this.handleStart = this.handleStart.bind(this)
    this.handleStop = this.handleStop.bind(this)
  }

  reset() {
    const {minuteIntervalId, totalMinutesTimeoutId} = this.state
    clearInterval(minuteIntervalId)
    clearTimeout(totalMinutesTimeoutId)
    this.setState(initialState)
    ipcRenderer.send('disableDoNotDisturb')
    ipcRenderer.send('disableDockAutohide')
  }

  finish() {
    this.reset()
    new Notification('Hideaway', {
      body: 'Hideaway finished'
    })
  }

  minutePassed() {
    const {minutesLeft} = this.state
    this.setState({
      minutesLeft: minutesLeft - 1,
    })
  }

  handleTotalMinutesChange(totalMinutes) {
    this.setState({
      totalMinutes,
      minutesLeft: totalMinutes,
    })
  }

  handleStart() {
    const {totalMinutes} = this.state
    ipcRenderer.send('closeOtherApps')
    ipcRenderer.send('enableDoNotDisturb')
    ipcRenderer.send('enableDockAutohide')
    this.setState({
      isOn: true,
      minuteIntervalId: setInterval(this.minutePassed, oneMinute),
      totalMinutesTimeoutId: setTimeout(this.finish, totalMinutes * oneMinute),
    })
  }

  handleStop() {
    this.reset()
  }

  render() {
    const {isOn, totalMinutes, minutesLeft} = this.state
    return (
      <div>

        {isOn
          ? <div style={{
              color: uiGroups.userCurrentState,
            }}>
              {minutesLeft}
            </div>
          : <NumericInput 
              value={totalMinutes} 
              min={15}
              max={300}
              step={15}
              onChange={this.handleTotalMinutesChange} 
              readOnly
              mobile
            />
        }

        <div>
          {isOn ? 'minutes left' : 'minutes'}
        </div>

        <button onClick={isOn ? this.handleStop : this.handleStart}>
          {`${isOn ? 'Stop' : 'Start'} Hideaway`}
        </button>

      </div>
    )
  }
}

export default Timer
