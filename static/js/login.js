const { ipcRenderer } = require("electron");

document.getElementById("loginForm").addEventListener("submit", e => {
    e.preventDefault();

    const token = document.getElementById("token").value;

    ipcRenderer.send("authenticate", token);
});