const { app, BrowserWindow } = require("electron");
const { name } = require("./package.json");

let mainWindow;

function startApp() {
    mainWindow = new BrowserWindow({
        width: 500,
        height: 250,
        maximizable: false,
        webPreferences: {
            nodeIntegration: true
        },
        resizable: false,
        title: name
    });

    mainWindow.setMenu(null);
}

app.on("ready", () => startApp());

app.on("window-all-closed", () => {
    app.quit();
});