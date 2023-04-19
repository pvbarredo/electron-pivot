let log = require("electron-log")
const {autoUpdater} = require("electron-updater")
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')


exports.createMainWindow = async(mainWindow) => {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        autoHideMenuBar: true,
        icon: path.join(__dirname, '../../assets/icon/icon.png'),
        webPreferences: {
            preload: path.join(__dirname, './main-preload.js')
        }
    })
    await mainWindow.loadFile(path.join(__dirname, './main.html'))

    mainWindow.on("close", event => {
        if (!app.isQuiting) {
            event.sender.hide()
            event.preventDefault() //prevent quit process
        }
    })

    return mainWindow
}