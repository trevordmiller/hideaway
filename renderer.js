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

  clearInterval(minuteInterval)
  clearTimeout(hideawayTimeout)
}

const finishHideaway = () => {
  new Notification('Hideaway', {
    body: 'Hideaway finished'
  })
  initialize()
}

const startHideaway = () => {
  startElement.style.display = 'none'
  timerElement.style.display = 'block'
  stopElement.style.display = 'block'

  const timerMinutes = 5
  let timerMinutesLeft = timerMinutes

  const updateTimer = () => {
    timerValueElement.innerHTML = timerMinutesLeft
    timerLabelElement.innerHTML = `${timerMinutesLeft === 1 ? 'minute' : 'minutes'} left`
    timerMinutesLeft = timerMinutesLeft - 1
  }

  updateTimer()
  minuteInterval = setInterval(updateTimer, 1000)
  hideawayTimeout = setTimeout(finishHideaway, timerMinutes * 1000)
}

const stopHideaway = () => {
  initialize()
}

const main = () => {
  initialize()
  startElement.addEventListener('click', startHideaway)
  stopElement.addEventListener('click', stopHideaway)
}

main()
