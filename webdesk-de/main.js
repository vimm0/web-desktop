const { app, BrowserWindow } = require('electron')
const path = require('path')
const {spawn} = require('child_process');

let DJANGO_CHILD_PROCESS = null;
const MAIN_WINDOW_WEBPACK_ENTRY = '';

const spawnDjango = () =>
{
    // if (isDevelopmentEnv()) {
    //     return spawn(`python\\edtwExampleEnv\\Scripts\\python.exe`,
    //         ['python\\edtwExample\\manage.py', 'runserver', '--noreload'], {
    //         shell: true,
    //     });
    // }
    return spawn(`cd back && webdeskbackend.exe runserver --noreload`, {
        shell: true,
    });
}

const startDjangoServer = () =>
{
    DJANGO_CHILD_PROCESS = spawnDjango();
}

const createWindow = () => {
    startDjangoServer();
    // Create the browser window.
    // const mainWindow = new BrowserWindow({
    //     height: 600,
    //     width: 800,
    // });

    // mainWindow.webContents.session.webRequest.onBeforeSendHeaders(
    //     (details, callback) =>
    //     {
    //         const { requestHeaders } = details;
    //         UpsertKeyValue(requestHeaders, 'Access-Control-Allow-Origin', ['*']);
    //         callback({ requestHeaders });
    //     },
    // );

    // mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) =>
    // {
    //     const { responseHeaders } = details;
    //     UpsertKeyValue(responseHeaders, 'Access-Control-Allow-Origin', ['*']);
    //     UpsertKeyValue(responseHeaders, 'Access-Control-Allow-Headers', ['*']);
    //     callback({
    //         responseHeaders,
    //     });
    // });

    // // and load the index.html of the app.
    // mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    // Open the DevTools.
    // openDevTools(mainWindow);
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        // webPreferences: {
        //     preload: path.join(__dirname, 'preload.js')
        // }
    })

    // win.loadFile('index.html')
    win.loadURL('http://localhost:8000/admin')

}


app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})