const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const url = require('url')
const exec = require('child_process').exec

let mainWindow

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
    const closeOtherApps = require('./appShellScripts/closeOtherApps')
    exec(closeOtherApps)
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
