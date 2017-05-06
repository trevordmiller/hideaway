import {ipcRenderer} from 'electron'
import React, {Component} from 'react'
import {spacing} from '../utils/styleGuide'
import Button from './Button'
import Heading from './Heading'
import Textarea from './Textarea'

class ConfigForm extends Component {

  state = {
    value: '',
    isSaved: true,
  }

  componentDidMount = () => {
    const {configKey} = this.props
    const value = ipcRenderer.sendSync('getConfig', configKey) 
    if(value) {
      this.setState({
        value,
      })
    }
  }

  handleValueChange = (event) => {
    this.setState({
      value: event.target.value,
      isSaved: false,
    })
  }

  handleSave = () => {
    const {value} = this.state
    const {configKey} = this.props
    ipcRenderer.send('setConfig', configKey, value) 
    this.setState({
      isSaved: true,
    })
  }

  render() {
    const {value, isSaved} = this.state
    const {description} = this.props

    return (
      <div>

        <Heading>
          {description}
        </Heading>

        <Textarea
          value={value}
          onChange={this.handleValueChange}
        />

        <div style={{
          marginTop: spacing.small,
          visibility: isSaved ? 'hidden' : 'visible',
        }}>
          <Button 
            onClick={this.handleSave}
          >
            Save
          </Button>
        </div>

      </div>
    )
  }
}

export default ConfigForm
