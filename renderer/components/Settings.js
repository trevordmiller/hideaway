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
          title: 'Start',
          render: (
            <ConfigForm 
              description='Shell script to run on Hideaway start'
              configKey='startScript'
              placeholder='spotify play&#x0a;open "https://todoist.com"'
            />
          ),
        },
        {
          title: 'Finish',
          render: (
            <ConfigForm 
              description='Shell script to run on Hideaway finish'
              configKey='finishScript'
              placeholder='spotify pause&#x0a;open "https://mail.google.com"&#x0a;open -a Slack'
            />
          ),
        },
      ]}
    />
  </div>
)

export default Settings
