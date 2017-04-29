const exec = require('child_process').exec

const startElement = document.querySelector('#start')
const timerElement = document.querySelector('#timer')
const timerValueElement = document.querySelector('#timer-value')
const timerLabelElement = document.querySelector('#timer-label')
const stopElement = document.querySelector('#stop')
let minuteInterval = null
let hideawayTimeout = null


const initialize = () => {
  startElement.style.display = 'block'
  timerElement.style.display = 'none'
  stopElement.style.display = 'none'
}

const reset = (callback) => {
  initialize()

  clearInterval(minuteInterval)
  clearTimeout(hideawayTimeout)

  exec(`
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
  startElement.style.display = 'none'
  timerElement.style.display = 'block'
  stopElement.style.display = 'block'

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
  tell application "System Events"
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
