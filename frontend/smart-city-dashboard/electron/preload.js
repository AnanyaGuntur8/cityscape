// preload.js
const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  // expose future native APIs here
});
