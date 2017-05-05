import React, {Component} from 'react'
import Intro from './Intro'
import Timer from './Timer'

class Hideaway extends Component {

  constructor(props) {
    super(props)
    this.state = {
      hasCompletedIntro: false,
    }
    this.handleCompleteIntro = this.handleCompleteIntro.bind(this)
  }

  componentDidMount() {
    const hasCompletedIntro = localStorage.getItem('hasCompletedIntro')
    this.setState({
      hasCompletedIntro,
    })
  }

  handleCompleteIntro() {
    localStorage.setItem('hasCompletedIntro', true)
    this.setState({
      hasCompletedIntro: true,
    })
  }

  render() {
    const {hasCompletedIntro} = this.state
    return (
      <main style={{
        padding: 30,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {!hasCompletedIntro
          ? <Intro handleCompleteIntro={this.handleCompleteIntro} />
          : <Timer />
        }
      </main>
    )
  }
}

export default Hideaway
