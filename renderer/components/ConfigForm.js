import { ipcRenderer } from 'electron'
import React, { Component } from 'react'
import { spacing } from '../utils/theme'
import Button from './Button'
import Paragraph from './Paragraph'
import Textarea from './Textarea'

class ConfigForm extends Component {
  state = {
    value: '',
    isSaved: true,
  }

  componentDidMount = () => {
    const { configKey } = this.props
    const value = ipcRenderer.sendSync('configGet', configKey)
    if (value) {
      this.setState({
        value,
      })
    }
  }

  handleValueChange = event => {
    this.setState({
      value: event.target.value,
      isSaved: false,
    })
  }

  handleSave = () => {
    const { value } = this.state
    const { configKey } = this.props
    ipcRenderer.send('configSet', configKey, value)
    this.setState({
      isSaved: true,
    })
  }

  render() {
    const { value, isSaved } = this.state
    const { description, placeholder } = this.props

    return (
      <div>
        <div
          style={{
            marginBottom: spacing.xsmall,
          }}
        >
          <Paragraph>
            {description}
          </Paragraph>
        </div>

        <Textarea
          value={value}
          placeholder={placeholder}
          onChange={this.handleValueChange}
        />

        <div
          style={{
            marginTop: spacing.small,
            visibility: isSaved ? 'hidden' : 'visible',
          }}
        >
          <Button onClick={this.handleSave}>Save</Button>
        </div>
      </div>
    )
  }
}

export default ConfigForm
