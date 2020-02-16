const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const Discord = require("discord.js");
const path = require("path");
const request = require("request");
const Logger = require("./utils/logger");
const { name } = require("./package.json");

const logger = new Logger((process.defaultApp ? "console" : "file"), app.getPath("userData"));
const client = new Discord.Client();

let mainWindow;

function startApp() {
    mainWindow = new BrowserWindow({
        width: 500,
        height: 200,
        maximizable: false,
        webPreferences: {
            nodeIntegration: true
        },
        resizable: false,
        title: name
    });

    app.allowRendererProcessReuse = false;

    if(process.defaultApp) {
        mainWindow.setResizable(true);
        mainWindow.setMaximizable(true);
    } else {
        mainWindow.setMenu(null);
    }

    mainWindow.loadFile(path.join(__dirname, "static", "login.html"))
}

ipcMain.on("authenticate", (_, token) => {
    client
        .login(token)
        .then(async () => {
            mainWindow.setSize(750, 500);
            await mainWindow.loadFile(path.join(__dirname, "static", "main.html"));
            mainWindow.webContents.send("userdata", { tag: client.user.tag, avatar: client.user.displayAvatarURL });
        })
        .catch(err => {
            logger.log(err);
            dialog.showErrorBox("Authentication failed", "Your token is invalid");
        });
});

app.on("ready", () => startApp());

app.on("window-all-closed", () => {
    app.quit();
});