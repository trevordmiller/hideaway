const exec = require('child_process').exec
const runApplescript = require('run-applescript')

const reset = (callback) => {
  const resetApplescript = `
    sleep 3
osascript <<EOD
  tell application "System Events"

    ${userAutohidesDock === 'false'
      ? 'tell dock preferences to set autohide to not autohide'
      : ''
    }

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
  `

  exec(resetApplescript, (error) => {
    if (error !== null) {
      new Notification('Hideaway', {
        body: `Error: ${error}`
      })
    }
    else if (callback) {
      callback()
    }
  })
}

const startHideaway = () => {

  exec(`
    foregroundAppsString=$(osascript -e 'tell application "System Events" to get name of (processes where background only is false)')
    IFS=',' read -r -a foregroundApps <<< "$foregroundAppsString"
    for foregroundApp in "\${foregroundApps[@]}"
    do
      appName=$(echo "$foregroundApp" | sed 's/^ *//g')
      if [[ ! "$appName" == "Finder" && ! "$appName" == "Electron" && ! "$appName" == "Hideaway" && ! "$appName" == "Hyper" && ! "$appName" == "Spotify" ]]; then
        osascript -e 'quit app "'"$appName"'"'
      fi
    done

    sleep 3
osascript <<EOD
  tell application "System Events"

    if (get autohide of dock preferences) is false then
      tell dock preferences to set autohide to not autohide
    end if

    tell application process "SystemUIServer"
      try
        key down option
        click menu bar item "Notification Center" of menu bar 1
        key up option
      on error
        key up option
      end try
    end tell

  end tell
EOD
    sleep 3
  `, (error) => {
    if (error !== null) {
      reset(() => {
        new Notification('Hideaway', {
          body: `Error: ${error}`
        })
      })
    }
  })
}

const stopHideaway = () => {
  reset()
}

const initialize = () => {

  timerMinutesInputElement.defaultValue = '30'
  runApplescript(`
    tell application "System Events" 
      return get autohide of dock preferences
    end tell
  `)
    .then(result => {
      userAutohidesDock = result
      startElement.addEventListener('click', startHideaway)
      stopElement.addEventListener('click', stopHideaway)
    })
}

initialize()
