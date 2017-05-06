import React from 'react'
import ConfigForm from './ConfigForm'

const Settings = () => (
  <div style={{
    width: '100%',
  }}>
    <ConfigForm 
      description='Shell script to run on start'
      configKey='scriptOnStart'
    />
  </div>
)

export default Settings
