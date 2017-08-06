import { ipcRenderer } from 'electron'
import React from 'react'
import { spacing } from '../utils/theme'
import Tabs from './Tabs'
import ConfigForm from './ConfigForm'
import Paragraph from './Paragraph'
import Button from './Button'

const Settings = () =>
  <div
    style={{
      width: '100%',
    }}
  >
    <Tabs
      tabs={[
        {
          title: 'On Start',
          render: (
            <ConfigForm
              description="Shell script to run on Hideaway start"
              configKey="startScript"
              placeholder="open -a &quot;Reminders&quot;"
            />
          ),
        },
        {
          title: 'On Finish',
          render: (
            <ConfigForm
              description="Shell script to run on Hideaway finish"
              configKey="finishScript"
              placeholder="say &quot;Hideaway complete&quot;&#x0a;open &quot;https://twitter.com&quot;&#x0a;open -a &quot;Calendar&quot;&#x0a;open -a &quot;Mail&quot;&#x0a;open -a &quot;Slack&quot;"
            />
          ),
        },
        {
          title: 'Reset',
          render: (
            <div>
              <div
                style={{
                  marginBottom: spacing.xsmall,
                }}
              >
                <Paragraph>Wipe all app data</Paragraph>
              </div>
              <Button
                onClick={() => {
                  ipcRenderer.send('configWipe')
                }}
              >
                Wipe
              </Button>
            </div>
          ),
        },
      ]}
    />
  </div>

export default Settings
