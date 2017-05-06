import React from 'react'
import {uiGroups, spacing, borderRadii, fontSizes} from '../utils/styleGuide'

const Button = ({children, onClick}) => (
  <button 
    onClick={onClick}
    style={{
      display: 'inline-block',
      border: 0,
      background: uiGroups.userCurrentState,
      color: uiGroups.backgroundShade,
      padding: spacing.medium,
      borderRadius: borderRadii.medium,
      fontSize: fontSizes.large,
      minWidth: 200,
    }}
  >
    {children}
  </button>
)

export default Button
