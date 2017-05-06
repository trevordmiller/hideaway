import React, {Component} from 'react'
import {spacing} from '../utils/styleGuide'
import Heading from './Heading'
import Image from './Image'
import Paragraph from './Paragraph'
import Button from './Button'

const steps = [
  {
    description: 'Open "System Preferences"',
    imageSrc: '/static/images/setup-system-preferences.png',
  },
  {
    description: 'Tap "Security & Privacy"',
    imageSrc: '/static/images/setup-security.png',
  },
  {
    description: 'Tap "Privacy"',
    imageSrc: '/static/images/setup-privacy.png',
  },
  {
    description: 'Select "Accessibility"',
    imageSrc: '/static/images/setup-accessibility.png',
  },
  {
    description: 'Tap "Click the lock to make changes"',
    imageSrc: '/static/images/setup-unlock.png',
  },
  {
    description: 'Tap "+"',
    imageSrc: '/static/images/setup-add.png',
  },
  {
    description: 'Select "Hideaway"',
    imageSrc: '/static/images/setup-select-hideaway.png',
  },
  {
    description: 'It should look like this',
    imageSrc: '/static/images/setup-complete.png',
  },
]

class Intro extends Component {

  state = {
    currentStep: 0,
  }

  handleNextStep = () => {
    const {currentStep} = this.state
    this.setState({
      currentStep: currentStep + 1,
    })
  }

  render() {
    const {currentStep} = this.state
    const {handleCompleteIntro} = this.props
    return (
      <section style={{
        textAlign: 'center',
      }}>

        <Paragraph>
          To let Hideaway control your screen...
        </Paragraph>

        <div style={{
          marginTop: spacing.small,
          marginBottom: spacing.small,
        }}>
          <div style={{
            marginBottom: spacing.xsmall,
          }}>
            <Heading>
              {steps[currentStep].description}
            </Heading>
          </div>
          <div style={{
            maxHeight: 200,
          }}>
            <Image src={steps[currentStep].imageSrc} />
          </div>
        </div>

        <Button onClick={currentStep < (steps.length - 1)
          ? this.handleNextStep
          : handleCompleteIntro
        }>
          {currentStep < (steps.length - 1)
            ? 'Next'
            : 'Done'
          }
        </Button>

      </section>
    )
  }
}

export default Intro
