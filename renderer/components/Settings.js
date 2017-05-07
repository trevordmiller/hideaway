import React from 'react'
import Tabs from './Tabs'
import ConfigForm from './ConfigForm'

const Settings = () => (
  <div style={{
    width: '100%',
  }}>
    <Tabs
      tabs={[
        {
          title: 'Websites',
          render: (
            <ConfigForm 
              description='Websites to block during Hideaway'
              configKey='blockedWebsites'
            />
          ),
        },
        {
          title: 'Start',
          render: (
            <ConfigForm 
              description='Shell script to run on Hideaway start'
              configKey='startScript'
            />
          ),
        },
        {
          title: 'Finish',
          render: (
            <ConfigForm 
              description='Shell script to run on Hideaway finish'
              configKey='finishScript'
            />
          ),
        }
      ]}
    />
  </div>
)

export default Settings
