const checkDockAutohide = `
tell application "System Events" 
  return get autohide of dock preferences
end tell
`

module.exports = checkDockAutohide
