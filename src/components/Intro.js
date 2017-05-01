import React from 'react'

const Intro = ({handleCompleteIntro}) => (
  <section>

    <p>
      Since this is your first time using Hideaway, you need to give it permission to control your screen
    </p>

    <ul>
      <li>Open "System Preferences"</li>
      <li>Tap "Security & Privacy"</li>
      <li>Select "Privacy"</li>
      <li>Select "Accessibility"</li>
      <li>Tap "Click the lock to make changes" and enter your password</li>
      <li>Tap "+"</li>
      <li>Navigate to your "Applications" folder</li>
      <li>Select "Hideaway"</li>
    </ul>

    <button onClick={handleCompleteIntro}>
      Done
    </button>

  </section>
)

export default Intro
