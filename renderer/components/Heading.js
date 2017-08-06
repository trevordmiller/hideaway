import React from 'react'
import { fontSizes, fontWeights, uiGroups } from '../utils/theme'

const Heading = ({ children }) =>
  <h1
    style={{
      fontSize: fontSizes.large,
      fontWeight: fontWeights.light,
      margin: 0,
      color: uiGroups.userCurrentState,
    }}
  >
    {children}
  </h1>

export default Heading
