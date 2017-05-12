const fs = require('fs')
const {createServer} = require('http')
const exec = require('child_process').exec
const {app, BrowserWindow, ipcMain, shell} = require('electron')
const dev = require('electron-is-dev')
const Config = require('electron-config')
require('electron-debug')({showDevTools: true})
const next = require('next')
const {resolve} = require('app-root-path')
const {uiGroups} = require('nova-colors')
const runApplescript = require('run-applescript')
const closeOtherApps = require('./closeOtherApps')
const enableDoNotDisturb = require('./enableDoNotDisturb')
const disableDoNotDisturb = require('./disableDoNotDisturb')
const checkDockAutohide = require('./checkDockAutohide')
const enableDockAutohide = require('./enableDockAutohide')
const disableDockAutohide = require('./disableDockAutohide')

let router
let mainWindow
let sessionConfig = {}
const config = new Config()

if (!dev) {
  const {Router} = require('electron-routes')
  const render = require('next/dist/server/render')

  router = new Router('next')

  render.serveStatic = (req, res, path) => {
    fs.readFile(path, (err, buffer) => {
      if (err) return res.notFound()
      res.send(buffer)
    })
  }
}

module.exports = async () => {
  const dir = resolve('./renderer')
  const nextApp = next({dev, dir})
  const nextHandler = nextApp.getRequestHandler()

  await nextApp.prepare()

  if (!dev) {
    router.use('app/*', (req, res) => {
      req.url = req.url.replace(/\/$/, '')
      return nextHandler(req, res)
    })
    return
  }

  const server = createServer(nextHandler)
  server.listen(3000, () => {

    mainWindow = new BrowserWindow({
      show: false,
      width: 500, 
      height: 500,
      backgroundColor: uiGroups.background,
    })

    mainWindow.loadURL(dev
      ? 'http://localhost:3000'
      : 'next://app'
    )

    mainWindow.on('ready-to-show', () => {
      mainWindow.show()
    })

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

    mainWindow.on('closed', () => {
      mainWindow = null
    })

    app.on('before-quit', () => server.close())

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })
  })
}
