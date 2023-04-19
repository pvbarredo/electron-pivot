const {app, BrowserWindow} = require('electron')
let log = require("electron-log")
const packageJson = require('../package.json')
const isDev = require('electron-is-dev')
const AutoLaunch = require("auto-launch")
const {createMainWindow} = require("./main/main-electron");
const {createTray} = require("./tray/tray");


app.whenReady().then(async() => {
    let mainWindow = null
    log.info("App is Ready")

    //initialized token for first time


    mainWindow = await createMainWindow(mainWindow)

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            log.info("App activate but 0 windows")
            createMainWindow(mainWindow)
        }
    })

    createTray(mainWindow)
})

if (!isDev) {
    const autoStart = new AutoLaunch({
        name: "Pivot " + packageJson.version,
    });
    autoStart.enable();
}

let isSingleInstance = app.requestSingleInstanceLock()
if (!isSingleInstance) {
    // prevent multiple process
    log.info("App multiple instance prevented")
    app.quit()
}

app.on('before-quit', function () {
    log.info("App is quitting")
    app.isQuiting = true;
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
