import React from 'react'
import {uiGroups, spacing, fontSizes, borderRadii} from '../utils/styleGuide'

const Textarea = ({value, onChange}) => (
  <div>
    <textarea
      type='text'
      rows='5'
      value={value}
      onChange={onChange}
      style={{
        background: uiGroups.gray2,
        color: uiGroups.foreground,
        fontSize: fontSizes.medium,
        padding: spacing.medium,
        width: '100%',
        borderRadius: borderRadii.medium,
      }}
    />
  </div>
)

export default Textarea
