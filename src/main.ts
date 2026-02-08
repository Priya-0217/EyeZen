import { app, BrowserWindow, ipcMain, screen, globalShortcut } from "electron";
import path from "node:path";
import started from "electron-squirrel-startup";

if (started) {
  app.quit();
}

let mainWindow: BrowserWindow | null = null;
let overlayWindow: BrowserWindow | null = null;

/* -------------------------------------------------- */
/* 🪟 MAIN APP WINDOW */
/* -------------------------------------------------- */
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 650,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(
        __dirname,
        `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`
      )
    );
  }

  mainWindow.webContents.openDevTools();
}

/* -------------------------------------------------- */
/* 🎨 OVERLAY HTML GENERATOR (FIXED) */
/* -------------------------------------------------- */
function getOverlayHTML(warmth: number, brightness: number) {
  /*
    warmth → controls orange tint
    brightness → controls dimming
  */

  // Warm RGB tint calculation
  const red = 255;
  const green = Math.round(200 - warmth * 120);
  const blue = Math.round(150 - warmth * 140);

  // Tint strength
  const tintOpacity = 0.06 + warmth * 0.28;

  // Brightness dim layer
  const darkness = 1 - brightness;

  return `
    <html>
      <body style="margin:0;overflow:hidden;">

        <!-- Warm tint layer -->
        <div style="
          position:fixed;
          inset:0;
          background:rgba(${red},${green},${blue},${tintOpacity});
          pointer-events:none;
        "></div>

        <!-- Brightness dim layer -->
        <div style="
          position:fixed;
          inset:0;
          background:rgba(0,0,0,${darkness * 0.65});
          pointer-events:none;
        "></div>

      </body>
    </html>
  `;
}

/* -------------------------------------------------- */
/* 👀 CREATE OVERLAY */
/* -------------------------------------------------- */
function createOverlay(warmth = 0.3, brightness = 1) {
  if (overlayWindow) return;

  const display = screen.getPrimaryDisplay();
  const { width, height } = display.bounds;

  overlayWindow = new BrowserWindow({
    width,
    height,
    x: 0,
    y: 0,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    focusable: false,
    resizable: false,
  });

  overlayWindow.setAlwaysOnTop(true, "screen-saver");
  overlayWindow.setIgnoreMouseEvents(true);

  overlayWindow.loadURL(
    "data:text/html;charset=utf-8," +
      encodeURIComponent(getOverlayHTML(warmth, brightness))
  );
}

/* -------------------------------------------------- */
/* 🔄 UPDATE OVERLAY */
/* -------------------------------------------------- */
function updateOverlay(warmth: number, brightness: number) {
  if (!overlayWindow) {
    createOverlay(warmth, brightness);
    return;
  }

  overlayWindow.loadURL(
    "data:text/html;charset=utf-8," +
      encodeURIComponent(getOverlayHTML(warmth, brightness))
  );
}

/* -------------------------------------------------- */
/* ❌ REMOVE OVERLAY */
/* -------------------------------------------------- */
function removeOverlay() {
  if (overlayWindow) {
    overlayWindow.close();
    overlayWindow = null;
  }
}

/* -------------------------------------------------- */
/* 🔌 IPC EVENTS */
/* -------------------------------------------------- */

// Toggle filter
ipcMain.on("toggle-filter", (_, enabled: boolean) => {
  console.log("Overlay toggle:", enabled);

  if (enabled) {
    createOverlay();
  } else {
    removeOverlay();
  }
});

// Update warmth + brightness
ipcMain.on(
  "update-filter",
  (_, warmth: number, brightness: number) => {
    console.log("Filter update:", warmth, brightness);
    updateOverlay(warmth, brightness);
  }
);

/* -------------------------------------------------- */
/* 🚀 APP LIFECYCLE */
/* -------------------------------------------------- */
function registerShortcuts() {
  globalShortcut.register("CommandOrControl+Alt+F", () => {
    if (overlayWindow) {
      removeOverlay();
    } else {
      createOverlay();
    }
  });

  globalShortcut.register("CommandOrControl+Alt+D", () => {
    if (mainWindow) {
      mainWindow.show();
      mainWindow.focus();
      mainWindow.webContents.send("navigate", "/");
    }
  });

  globalShortcut.register("CommandOrControl+Alt+S", () => {
    if (mainWindow) {
      mainWindow.show();
      mainWindow.focus();
      mainWindow.webContents.send("navigate", "/settings");
    }
  });
}

app.whenReady().then(() => {
  createWindow();
  registerShortcuts();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});
