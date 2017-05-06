const {app, BrowserWindow, ipcMain, shell} = require('electron')
const exec = require('child_process').exec
const runApplescript = require('run-applescript')
const checkDockAutohide = require('./utils/checkDockAutohide')
const closeOtherApps = require('./utils/closeOtherApps')
const enableDoNotDisturb = require('./utils/enableDoNotDisturb')
const enableDockAutohide = require('./utils/enableDockAutohide')
const disableDoNotDisturb = require('./utils/disableDoNotDisturb')
const disableDockAutohide = require('./utils/disableDockAutohide')

let mainWindow
let initialUserConfig = {
  dockAutohide: null,
}

runApplescript(checkDockAutohide)
  .then(result => {
    initialUserConfig.dockAutohide = result
  })

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

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  ipcMain.on('start', () => {
    exec(closeOtherApps)
    exec(enableDoNotDisturb)
    exec(enableDockAutohide)
  })

  ipcMain.on('reset', () => {
    exec(disableDoNotDisturb)
    if (initialUserConfig.dockAutohide !== 'true') {
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
