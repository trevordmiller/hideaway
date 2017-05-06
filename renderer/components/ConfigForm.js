import {ipcRenderer} from 'electron'
import React, {Component} from 'react'
import Button from './Button'
import Paragraph from './Paragraph'
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

        <Paragraph>
          {description}
        </Paragraph>

        <Textarea
          value={value}
          onChange={this.handleValueChange}
        />

        {isSaved
          ? null
          : <Button onClick={this.handleSave}>
              Save
            </Button>
        }

      </div>
    )
  }
}

export default ConfigForm