import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  toggleFilter: (enabled: boolean) =>
    ipcRenderer.send("toggle-filter", enabled),

  updateFilter: (warmth: number, brightness: number) =>
    ipcRenderer.send("update-filter", warmth, brightness),

  onNavigate: (callback: (path: string) => void) => {
    ipcRenderer.on("navigate", (_, path: string) => callback(path));
  },
});
