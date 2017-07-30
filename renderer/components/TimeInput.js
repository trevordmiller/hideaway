import React from 'react'
import { uiGroups, spacing, fontSizes, fontFamilies } from '../utils/styleGuide'
import NumericInput from 'react-numeric-input'

const TimeInput = ({ value, onChange }) =>
  <NumericInput
    value={value}
    onChange={onChange}
    step={15}
    min={15}
    max={300}
    readOnly
    mobile
    style={{
      input: {
        fontFamily: fontFamilies.primary,
        fontSize: fontSizes.xlarge,
        paddingTop: spacing.small,
        paddingBottom: spacing.small,
        background: uiGroups.gray2,
        color: uiGroups.userCurrentState,
        maxWidth: 200,
      },
      'btn:hover': {
        cursor: 'pointer',
      },
    }}
  />

export default TimeInput
