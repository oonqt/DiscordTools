const { ipcRenderer } = require("electron");

ipcRenderer.on("userdata", (_, data) => {
    document.getElementById("userAvatar").src = data.avatar;
    document.getElementById("userAvatar").alt = data.tag;
    document.getElementById("userTag").textContent = data.tag;
});