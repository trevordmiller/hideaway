import React from 'react'
import { fontSizes, uiGroups } from '../utils/theme'

const Label = ({ children }) =>
  <p
    style={{
      margin: 0,
      fontSize: fontSizes.small,
      color: uiGroups.gray3,
    }}
  >
    {children}
  </p>

export default Label
