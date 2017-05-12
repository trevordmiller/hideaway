const {app, dialog} = require('electron')
const log = require('electron-log')
const server = require('./utils/server')

app.on('ready', async () => {
  try {
    await server()
  } catch (err) {
    console.error(err) // eslint-disable-line no-console
    log.error(JSON.stringify(err, ['message', 'arguments', 'type', 'name'], 2))
    dialog.showMessageBox(null, {
      type: 'error',
      message: 'An error occurred',
      detail: 'Hideaway hit an error when starting',
      buttons: [],
    })
    return
  }
})
