const startElement = document.querySelector('#start')
const timerElement = document.querySelector('#timer')
const timerValueElement = document.querySelector('#timer-value')
const timerLabelElement = document.querySelector('#timer-label')
const endElement = document.querySelector('#end')
let minuteInterval = null
let sessionTimeout = null

const initialize = () => {
  startElement.style.display = 'block'
  timerElement.style.display = 'none'
  endElement.style.display = 'none'

  clearInterval(minuteInterval)
  clearTimeout(sessionTimeout)
}

const startSession = () => {
  startElement.style.display = 'none'
  timerElement.style.display = 'block'
  endElement.style.display = 'block'

  const timerMinutes = 5
  let timerMinutesLeft = timerMinutes

  const updateTimer = () => {
    timerValueElement.innerHTML = timerMinutesLeft
    timerLabelElement.innerHTML = `${timerMinutesLeft === 1 ? 'minute' : 'minutes'} left`
    timerMinutesLeft = timerMinutesLeft - 1
  }

  updateTimer()
  minuteInterval = setInterval(updateTimer, 1000)
  sessionTimeout = setTimeout(initialize, timerMinutes * 1000)
}

const endSession = () => {
  initialize()
}

const main = () => {
  initialize()
  startElement.addEventListener('click', startSession)
  endElement.addEventListener('click', endSession)
}

main()
