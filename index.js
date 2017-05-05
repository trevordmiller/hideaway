const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const url = require('url')
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

  const loadUrl = process.env.NODE_ENV === 'production'
    ? url.format({
        pathname: path.join(__dirname, 'build/index.html'),
        protocol: 'file:',
        slashes: true,
      })
    : 'http://localhost:3000'
  mainWindow.loadURL(loadUrl)

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  ipcMain.on('closeOtherApps', () => {
    exec(closeOtherApps)
  })

  ipcMain.on('enableDoNotDisturb', () => {
    exec(enableDoNotDisturb)
  })

  ipcMain.on('enableDockAutohide', () => {
    exec(enableDockAutohide)
  })

  ipcMain.on('disableDoNotDisturb', () => {
    exec(disableDoNotDisturb)
  })

  ipcMain.on('disableDockAutohide', () => {
    if (initialUserConfig.dockAutohide !== 'true') {
      exec(disableDockAutohide)
    }
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
