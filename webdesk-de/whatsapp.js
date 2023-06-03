const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
    })

    win.loadURL('https://web.whatsapp.com/')
    win.webContents.session.webRequest.onHeadersReceived(
        { urls: ['https://web.whatsapp.com/'] },
        (details, callback) => {
            if (details && details.responseHeaders['X-Frame-Options']) {
                delete details.responseHeaders['X-Frame-Options'];
            } else if (details.responseHeaders['x-frame-options']) {
                delete details.responseHeaders['x-frame-options'];
            }
            callback({ cancel: false, responseHeaders: details.responseHeaders });
        });

    win.webContents.session.webRequest.onBeforeSendHeaders(
        { urls: ['https://web.whatsapp.com/'] },
        (details, callback) => {
            details.requestHeaders['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36';
            // details.requestHeaders['User-Agent'] = userAgent;
            details.requestHeaders['Access-Control-Allow-Origin'] = '*';
            if (details.requestHeaders['Sec-Fetch-Dest']) {
                delete details.requestHeaders['Sec-Fetch-Dest'];
            }
            callback({ cancel: false, requestHeaders: details.requestHeaders });
        });

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