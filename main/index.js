const {app, BrowserWindow, ipcMain, shell} = require('electron')
const Config = require('electron-config')
const exec = require('child_process').exec
const sudoExec = require('sudo-prompt').exec
const runApplescript = require('run-applescript')
const closeOtherApps = require('./utils/closeOtherApps')
const enableDoNotDisturb = require('./utils/enableDoNotDisturb')
const disableDoNotDisturb = require('./utils/disableDoNotDisturb')
const checkDockAutohide = require('./utils/checkDockAutohide')
const enableDockAutohide = require('./utils/enableDockAutohide')
const disableDockAutohide = require('./utils/disableDockAutohide')
const enableWebsiteBlocking = require('./utils/enableWebsiteBlocking')
const disableWebsiteBlocking = require('./utils/disableWebsiteBlocking')

let mainWindow
let sessionConfig = {}
const config = new Config()
const sudoPromptOptions = {
  name: 'Hideaway',
  icns: '/Applications/Hideaway.app/Contents/Resources/electron.icns'
}

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
        const blockedWebsites = config.get('blockedWebsites')
        if(blockedWebsites) {
          sudoExec(enableWebsiteBlocking(blockedWebsites), sudoPromptOptions)
        }
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
    const blockedWebsites = config.get('blockedWebsites')
    if(blockedWebsites) {
      sudoExec(disableWebsiteBlocking, sudoPromptOptions)
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
