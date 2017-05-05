import React from 'react'
import Head from 'next/head'
import {
  uiGroups, 
  fontFamilies, 
  lineHeights, 
  fontSizes, 
  fontWeights, 
  spacing, 
  animationSpeeds,
  borderRadii,
  borderSizes,
} from '../utils/styleGuide'

const Screen = ({children}) => (
  <div>

    <Head>
      <meta
        name='viewport'
        content='initial-scale=1.0, width=device-width'
      />
      <style>
        {`
          @font-face {
            font-family: 'Quicksand';
            src: url('/static/fonts/quicksand.woff2') format('woff2');
          }

          body {
            margin: 0;
          }

          html {
            box-sizing: border-box;
          }

          *, *:before, *:after {
            box-sizing: inherit;
          }

          *:focus {
            box-shadow: none;
            border-color: none;
            outline: none;
            z-index: 1;
          }

          ::selection {
            background: ${uiGroups.userCurrentState};
            color: ${uiGroups.backgroundShade};
          }

          input {
            -webkit-appearance: none;
            -moz-appearance: none;
            border: 0;
            font-family: ${fontFamilies.primary};
            font-size: ${fontSizes.large}px;
            width: 100%;
            padding: ${spacing.medium}px;
            background: ${uiGroups.gray3};
            color: ${uiGroups.userCurrentState};
            border-radius: ${borderRadii.medium}px;
            border: ${borderSizes.small}px solid transparent;
            transition: border ${animationSpeeds.xfast}s;
          }

          input::placeholder {
            color: ${uiGroups.backgroundShade};
          }

          button {
            display: inline-block;
            border: 0;
            background: ${uiGroups.userCurrentState};
            color: ${uiGroups.backgroundShade};
            padding: ${spacing.medium}px;
            border-radius: ${borderRadii.medium}px;
            font-size: ${fontSizes.large}px;
            min-width: 200px;
          }

          a, button {
            transition: opacity ${animationSpeeds.xfast}s;
          }

          a:hover, a:focus,
          button:hover, button:focus {
            opacity: 0.5;
            cursor: pointer;
          }

          input {
            transition: border ${animationSpeeds.xfast}s;
          }

          input:hover, input:focus {
            border: 2px solid ${uiGroups.userCurrentState};
          }
        `}
      </style>
    </Head>

    <div style={{
      background: uiGroups.background,
      color: uiGroups.gray4,
      fontFamily: fontFamilies.primary,
      fontSize: fontSizes.medium,
      fontWeight: fontWeights.normal,
      lineHeight: lineHeights.medium,
      minHeight: '100vh',
    }}>
      {children}
    </div>

  </div>
)

export default Screen
