const {app, BrowserWindow, ipcMain, shell} = require('electron')
const Config = require('electron-config')
const exec = require('child_process').exec
const runApplescript = require('run-applescript')
const closeOtherApps = require('./utils/closeOtherApps')
const enableDoNotDisturb = require('./utils/enableDoNotDisturb')
const disableDoNotDisturb = require('./utils/disableDoNotDisturb')
const checkDockAutohide = require('./utils/checkDockAutohide')
const enableDockAutohide = require('./utils/enableDockAutohide')
const disableDockAutohide = require('./utils/disableDockAutohide')

let mainWindow
let sessionConfig = {}
const config = new Config()

const createWindow = () => {
  mainWindow = new BrowserWindow({
    show: false,
    width: 500, 
    height: 500,
  })

  mainWindow.loadURL(process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'next://app'
  )

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  if(process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  ipcMain.on('getConfig', (event, key) => {
    const value = config.get(key)
    event.returnValue = value || false
  })

  ipcMain.on('setConfig', (event, key, value) => {
    config.set(key, value)
  })

  ipcMain.on('start', () => {
    runApplescript(checkDockAutohide)
      .then(result => {
        sessionConfig.dockAutohide = result === 'true' ? true : false
        exec(closeOtherApps)
        exec(enableDoNotDisturb)
        exec(enableDockAutohide)
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
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
