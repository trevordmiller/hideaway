import React from 'react'
import ConfigForm from './ConfigForm'

const Settings = () => (
  <div>
    <ConfigForm 
      description='Shell script to run on start'
      configKey='scriptOnStart'
    />
  </div>
)

export default Settings
