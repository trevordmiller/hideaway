const disableDoNotDisturb = `
sleep 3
osascript <<EOD
  tell application "System Events"
    tell application process "SystemUIServer"
      try
        key down option
        click menu bar item "Notification Center, Do Not Disturb enabled" of menu bar 1
        key up option
      on error
        key up option
      end try
    end tell
  end tell
EOD
sleep 3
`

module.exports = disableDoNotDisturb
