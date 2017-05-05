import {ipcRenderer} from 'electron'
import React, {Component} from 'react'
import {uiGroups} from 'nova-colors'
import NumericInput from 'react-numeric-input'

const oneMinute = process.env.NODE_ENV === 'development'
  ? 1000
  : 60000

const initialState = {
  isOn: false,
  totalMinutes: 30,
  minutesLeft: 30,
  minuteIntervalId: null,
  totalMinutesTimeoutId: null,
}

class Timer extends Component {

  state = initialState

  reset() {
    const {minuteIntervalId, totalMinutesTimeoutId} = this.state
    clearInterval(minuteIntervalId)
    clearTimeout(totalMinutesTimeoutId)
    this.setState(initialState)
    ipcRenderer.send('reset')
  }

  finish() {
    this.reset()
    ipcRenderer.send('finish')
  }

  minutePassed() {
    const {minutesLeft} = this.state
    this.setState({
      minutesLeft: minutesLeft - 1,
    })
  }

  handleTotalMinutesChange = (totalMinutes) => {
    this.setState({
      totalMinutes,
      minutesLeft: totalMinutes,
    })
  }

  handleStart = () => {
    const {totalMinutes} = this.state
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
