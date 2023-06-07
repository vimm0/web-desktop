const { app, BrowserWindow } = require('electron');
const { spawn } = require('child_process');

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
let dj;
let mainWindow = null;

const startDjango = () => {
    // return new Promise((resolve) => {
    dj = spawn(`./back/webdeskbackend runserver --noreload`, { shell: true });

    dj.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    dj.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });

    dj.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
    // });
};

app.whenReady().then(() => {
    startDjango();

    setTimeout(() => {
        mainWindow = new BrowserWindow({ width: 800, height: 600 });
        mainWindow.loadURL('http://localhost:8000/admin');
        mainWindow.on('closed', function () {
            mainWindow = null;
            dj.kill('SIGINT');
        });
    }, 1000);
});


// Kill local Django server
app.on('before-quit', function () {
    dj.kill('SIGINT')
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {

    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin')
        app.quit()
})