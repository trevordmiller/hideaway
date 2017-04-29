const exec = require('child_process').exec

const offElement = document.querySelector('#off')
const onElement = document.querySelector('#on')
const startElement = document.querySelector('#start')
const stopElement = document.querySelector('#stop')
const timerValueElement = document.querySelector('#timer-value')
const timerLabelElement = document.querySelector('#timer-label')
let minuteInterval = null
let hideawayTimeout = null

const initialize = () => {
  offElement.style.display = 'block'
  onElement.style.display = 'none'
}

const reset = (callback) => {
  initialize()

  clearInterval(minuteInterval)
  clearTimeout(hideawayTimeout)

  exec(`
    sleep 3
osascript <<EOD

  tell application "System Preferences"
    activate
    reveal pane id "com.apple.preference.general"
    delay 1
  end tell

  tell application "System Events"

    click checkbox "Automatically hide and show the menu bar" of window "General" of process "System Preferences"
    key code 12 using command down

    if (get autohide of dock preferences) is true then
      tell dock preferences to set autohide to not autohide
    end if

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
  `, (error) => {
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

const finishHideaway = () => {
  reset(() => {
    new Notification('Hideaway', {
      body: 'Hideaway finished'
    })
  })
}

const startHideaway = () => {
  offElement.style.display = 'none'
  onElement.style.display = 'block'

  const timerMinutes = 20
  let timerMinutesLeft = timerMinutes

  const updateTimer = () => {
    timerValueElement.innerHTML = timerMinutesLeft
    timerLabelElement.innerHTML = `${timerMinutesLeft === 1 ? 'minute' : 'minutes'} left`
    timerMinutesLeft = timerMinutesLeft - 1
  }

  updateTimer()
  minuteInterval = setInterval(updateTimer, 1000)
  hideawayTimeout = setTimeout(finishHideaway, timerMinutes * 1000)

  exec(`
    foregroundAppsString=$(osascript -e 'tell application "System Events" to get name of (processes where background only is false)')
    IFS=',' read -r -a foregroundApps <<< "$foregroundAppsString"
    for foregroundApp in "\${foregroundApps[@]}"
    do
      appName=$(echo "$foregroundApp" | sed 's/^ *//g')
      if [[ ! "$appName" == "Finder" && ! "$appName" == "Electron" && ! "$appName" == "Hideaway" && ! "$appName" == "Hyper" ]]; then
        osascript -e 'quit app "'"$appName"'"'
      fi
    done

    sleep 3
osascript <<EOD

  tell application "System Preferences"
    activate
    reveal pane id "com.apple.preference.general"
    delay 1
  end tell

  tell application "System Events"

    set autoHideMenuBarCheckbox to checkbox "Automatically hide and show the menu bar" of window "General" of process "System Preferences"
    tell autoHideMenuBarCheckbox
      if not (its value as boolean) then click autoHideMenuBarCheckbox
    end tell
    key code 12 using command down

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

const main = () => {
  initialize()
  startElement.addEventListener('click', startHideaway)
  stopElement.addEventListener('click', stopHideaway)
}

main()
