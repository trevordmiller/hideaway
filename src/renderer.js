const exec = require('child_process').exec
const runApplescript = require('run-applescript')

const introElement = document.querySelector('#intro')
const introSubmitElement = document.querySelector('#intro__submit')

const offElement = document.querySelector('#off')
const timerMinutesInputElement = document.querySelector('#minutes__input')
const startElement = document.querySelector('#start')

const onElement = document.querySelector('#on')
const timerValueElement = document.querySelector('#timer__value')
const timerLabelElement = document.querySelector('#timer__label')
const stopElement = document.querySelector('#stop')

let minuteInterval = null
let hideawayTimeout = null
let userAutohidesDock = null

const initializeStyles = () => {
}

const reset = (callback) => {
  offElement.style.display = 'block'
  onElement.style.display = 'none'

  clearInterval(minuteInterval)
  clearTimeout(hideawayTimeout)

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

  const timerMinutes = timerMinutesInputElement.value || 30
  let timerMinutesLeft = timerMinutes

  const updateTimer = () => {
    timerValueElement.innerHTML = timerMinutesLeft
    timerLabelElement.innerHTML = `${timerMinutesLeft === 1 ? 'minute' : 'minutes'} left`
    timerMinutesLeft = timerMinutesLeft - 1
  }

  updateTimer()
  minuteInterval = setInterval(updateTimer, 60000)
  hideawayTimeout = setTimeout(finishHideaway, timerMinutes * 60000)

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
  const hasCompletedIntro = localStorage.getItem('hasCompletedIntro')

  if(!hasCompletedIntro) {
    introSubmitElement.addEventListener('click', () => {
      localStorage.setItem('hasCompletedIntro', true)
      initialize()
    })
  }

  introElement.style.display = hasCompletedIntro ? 'none' : 'block'
  offElement.style.display = hasCompletedIntro ? 'block' : 'none'
  onElement.style.display = 'none'

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
