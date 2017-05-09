const {app, dialog} = require('electron')
const server = require('./utils/server')

app.on('ready', async () => {
  try {
    await server()
  } catch (err) {
    console.error(err) // eslint-disable-line no-console
    dialog.showMessageBox(null, {
      type: 'error',
      message: 'An error occurred',
      detail: 'The server had an error when starting',
      buttons: [],
    })
    return
  }
})
