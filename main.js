/**
 * Created by icepoint1999 on 01/03/2017.
 */
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({width: 800, height: 600})

    // and load the index.html of the app.

    win.loadURL(url.format({
        pathname: path.join(__dirname, '/config/pro/dist/index.html'),
        protocol: 'file:',
        slashes: true
    }))

    win.webContents.openDevTools()

    // Emitted when the window is closed.
    win.on('closed', () => {
        win = null
    })
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})