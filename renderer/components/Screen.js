import React from 'react'
import Head from 'next/head'
import {
  uiGroups, 
  fontFamilies, 
  lineHeights, 
  fontSizes, 
  fontWeights, 
  animationSpeeds,
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
            border: none;
            outline: none;
            z-index: 1;
          }

          ::selection {
            background: ${uiGroups.userCurrentState};
            color: ${uiGroups.backgroundShade};
          }

          button {
            transition: opacity ${animationSpeeds.xfast}s;
          }
          button:hover, button:focus {
            opacity: 0.5;
            cursor: pointer;
          }

          input {
            border: 0 !important;
          }
          input::placeholder {
            color: ${uiGroups.backgroundShade};
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
