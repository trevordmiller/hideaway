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
  }

  componentDidMount = () => {
    const hasCompletedIntro = ipcRenderer.sendSync('getConfig', 'hasCompletedIntro') 
    this.setState({
      hasCompletedIntro,
    })
  }

  handleCompleteIntro = () => {
    ipcRenderer.send('setConfig', 'hasCompletedIntro', true) 
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

  render() {
    const {hasCompletedIntro, isSettingsActive} = this.state
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
        {hasCompletedIntro
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
            : <Timer />
          : <Intro handleCompleteIntro={this.handleCompleteIntro} />
        }
      </main>
    )
  }
}

export default Hideaway
