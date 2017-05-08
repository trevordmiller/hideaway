import {ipcRenderer} from 'electron'
import React from 'react'
import {spacing} from '../utils/styleGuide'
import Tabs from './Tabs'
import ConfigForm from './ConfigForm'
import Paragraph from './Paragraph'
import Button from './Button'

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
        {
          title: 'Wipe',
          render: (
            <div>
              <div style={{
                marginBottom: spacing.xsmall,
              }}>
                <Paragraph>
                  Wipe the app data
                </Paragraph>
              </div>
              <Button onClick={() => {
                ipcRenderer.send('configWipe') 
              }}>
                Wipe
              </Button>
            </div>
          ),
        },
      ]}
    />
  </div>
)

export default Settings
