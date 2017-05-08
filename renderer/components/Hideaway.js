import {ipcRenderer} from 'electron'
import React, {Component} from 'react'
import {FaClose, FaCog} from 'react-icons/lib/fa';
import {spacing, fontSizes, uiGroups} from '../utils/styleGuide'
import Intro from './Intro'
import Settings from './Settings'
import Timer from './Timer'

class Hideaway extends Component {

  state = {
    hasCompletedIntro: true,
    isSettingsActive: false,
    isTimerOn: false,
  }

  componentDidMount = () => {
    const hasCompletedIntro = ipcRenderer.sendSync('configGet', 'hasCompletedIntro') 
    this.setState({
      hasCompletedIntro,
    })
  }

  handleCompleteIntro = () => {
    ipcRenderer.send('configSet', 'hasCompletedIntro', true) 
    this.setState({
      hasCompletedIntro: true,
    })
  }

  handleSettingsToggle = () => {
    const {isSettingsActive} = this.state
    this.setState({
      isSettingsActive: !isSettingsActive,
    })
  }

  handleTimerStart = () => {
    this.setState({
      isTimerOn: true,
    })
  }

  handleTimerReset = () => {
    this.setState({
      isTimerOn: false,
    })
  }

  render() {
    const {hasCompletedIntro, isSettingsActive, isTimerOn} = this.state
    return (
      <main style={{
        minHeight: '100vh',
        padding: spacing.xlarge,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}>
        {hasCompletedIntro && !isTimerOn
          ? <nav style={{
              position: 'absolute',
              fontSize: fontSizes.large,
              top: spacing.large,
              right: spacing.large,
              color: isSettingsActive
                ? uiGroups.userCurrentState
                : uiGroups.gray4
            }}>
              <a onClick={this.handleSettingsToggle}>
                {isSettingsActive
                  ? <FaClose />
                  : <FaCog />
                }
              </a>
            </nav>
          : null
        }
        {hasCompletedIntro
          ? isSettingsActive
            ? <Settings />
            : <Timer 
                onTimerStart={this.handleTimerStart} 
                onTimerReset={this.handleTimerReset}
              />
          : <Intro handleCompleteIntro={this.handleCompleteIntro} />
        }
      </main>
    )
  }
}

export default Hideaway
