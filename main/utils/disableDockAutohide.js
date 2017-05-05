const disableDockAutohide = `
osascript <<EOD
  tell dock preferences to set autohide to not autohide
EOD
`

module.exports = disableDockAutohide
