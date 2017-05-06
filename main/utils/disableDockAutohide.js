const disableDockAutohide = `
osascript <<EOD
  tell application "System Events"
    tell dock preferences to set autohide to not autohide
  end tell
EOD
`

module.exports = disableDockAutohide
