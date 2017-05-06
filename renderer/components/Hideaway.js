import {ipcRenderer} from 'electron'
import React, {Component} from 'react'
import Intro from './Intro'
import Timer from './Timer'

class Hideaway extends Component {

  state = {
    hasCompletedIntro: true,
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

  render() {
    const {hasCompletedIntro} = this.state
    return (
      <main style={{
        minHeight: '100vh',
        padding: 30,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {hasCompletedIntro
          ? <Timer />
          : <Intro handleCompleteIntro={this.handleCompleteIntro} />
        }
      </main>
    )
  }
}

export default Hideaway
