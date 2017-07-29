const {join} = require('path')
const {format} = require('url')
const exec = require('child_process').exec
const {BrowserWindow, app, ipcMain, shell} = require('electron')
const isDev = require('electron-is-dev')
const prepareNext = require('electron-next')
const Config = require('electron-config')
const {uiGroups} = require('nova-colors')
const runApplescript = require('run-applescript')
const closeOtherApps = require('./utils/closeOtherApps')
const enableDoNotDisturb = require('./utils/enableDoNotDisturb')
const disableDoNotDisturb = require('./utils/disableDoNotDisturb')
const checkDockAutohide = require('./utils/checkDockAutohide')
const enableDockAutohide = require('./utils/enableDockAutohide')
const disableDockAutohide = require('./utils/disableDockAutohide')

let sessionConfig = {}
const config = new Config()

app.on('ready', async () => {
  await prepareNext('./renderer')

  const mainWindow = new BrowserWindow({
    width: 500, 
    height: 500,
    backgroundColor: uiGroups.background,
  })

  const url = isDev ? 'http://localhost:8000/start' : format({
    pathname: join(__dirname, '../renderer/start/index.html'),
    protocol: 'file:',
    slashes: true
  })

  mainWindow.loadURL(url)

  ipcMain.on('configGet', (event, key) => {
    const value = config.get(key)
    event.returnValue = value || false
  })

  ipcMain.on('configSet', (event, key, value) => {
    config.set(key, value)
  })

  ipcMain.on('configWipe', () => {
    config.clear()
    app.relaunch()
    app.quit()
  })

  ipcMain.on('start', () => {
    runApplescript(checkDockAutohide)
      .then(result => {
        sessionConfig.dockAutohide = result === 'true' ? true : false
        exec(closeOtherApps)
        exec(enableDoNotDisturb)
        exec(enableDockAutohide)
        const startScript = config.get('startScript')
        if(startScript) {
          exec(`sleep 3;${startScript}`)
        }
      })
  })

  ipcMain.on('reset', () => {
    exec(disableDoNotDisturb)
    if (sessionConfig.dockAutohide === false) {
      exec(disableDockAutohide)
    }
  })

  ipcMain.on('finish', () => {
    mainWindow.show()
    shell.beep()
    const finishScript = config.get('finishScript')
    if(finishScript) {
      exec(`sleep 3;${finishScript}`)
    }
  })
})

app.on('window-all-closed', app.quit)
