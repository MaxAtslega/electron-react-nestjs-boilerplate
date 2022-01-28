import 'core-js/stable'
import 'regenerator-runtime/runtime'
import path from 'path'
import { app, BrowserWindow, Menu, Tray } from 'electron'
import * as url from 'url'


import randomString from './src/utils/randomString'
import Store from 'electron-store'
import createNest from './src/backend/main.backend'

const store = new Store()

const TRAY_TOOL_TIP = 'Electron-React-NestJS Boilerplate'

let mainWindow: BrowserWindow | null = null
let tray: Tray | null = null


const createWindow = async () => {

  if(!store.get('address')) store.set('address', '127.0.0.1')
  if(!store.get('port')) store.set('port', 8080)
  if(!store.get('key')) store.set('key', randomString(88))

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../assets')

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths)
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 600,
    frame: false,
    backgroundColor: '#ffffff',
    icon: getAssetPath('icon.png'),
    titleBarStyle: 'hidden' || 'customButtonsOnHover',
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    }
  })

  mainWindow.setMenuBarVisibility(true)
  mainWindow.setResizable(false)

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:4000').then()
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'renderer/index.html'),
        protocol: 'file:',
        slashes: true
      })
    ).then()
  }

  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined')
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize()
    } else {
      mainWindow.show()
      mainWindow.focus()
    }
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.on('minimize', function (event) {
    mainWindow?.hide()
    tray = createTray(mainWindow)
    event.preventDefault()
  })

  mainWindow.on('restore', function () {
    mainWindow?.show()
    tray?.destroy()
  })
}

function createTray(mainWindow: BrowserWindow) {
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../assets')

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths)
  }

  const nTray = new Tray(getAssetPath('icon.ico'))
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show', click: function () {
        mainWindow.show()
      }
    },
    {
      label: 'Exit', click: function () {
        app.quit()
      }
    }
  ])

  nTray.on('click', function () {
    mainWindow.show()
  })

  nTray.setToolTip(TRAY_TOOL_TIP)
  nTray.setContextMenu(contextMenu)

  return nTray
}

app.whenReady().then(async () => {
  await createWindow()
  await createNest()
})

app.on('activate', async () => {
  if (mainWindow === null) await createWindow()
})
