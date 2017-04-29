const startElement = document.querySelector('#start')
const endElement = document.querySelector('#end')

const startSession = () => {
  startElement.style.display = 'none'
  endElement.style.display = 'inline-block'
}

const endSession = () => {
  startElement.style.display = 'inline-block'
  endElement.style.display = 'none'
}

startElement.addEventListener('click', startSession)
endElement.addEventListener('click', endSession)
