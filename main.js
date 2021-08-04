const {app, BrowserWindow, Menu} = require("electron")
const path = require("path")

let win;

const createWin = () => {
    win = new BrowserWindow({
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        },
        useContentSize: true
    })

    win.loadFile(path.resolve(__dirname, "./app/index.html"))

    win.webContents.openDevTools({
        mode: 'bottom'
    })
}

const MenuTemplate = [
  {
    label: 'ملف',
    submenu: [
      {
        label: 'اعادة تشغيل',
        click: () => {
          app.relaunch()
          app.exit(0)
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'إغلاق',
        click: () => {
          app.quit()
        }
      },
    ]
  }
]

/* let menu = Menu.buildFromTemplate(MenuTemplate)

Menu.setApplicationMenu(menu) */

app.whenReady().then(() => createWin())

app.on("window-all-closed", () => app.quit())