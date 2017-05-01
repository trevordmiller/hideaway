const turnOnDoNotDisturb = `
osascript <<EOD
  tell application "System Events"

    if (get autohide of dock preferences) is false then
      tell dock preferences to set autohide to not autohide
    end if

  end tell
EOD
`

module.exports = turnOnDoNotDisturb
