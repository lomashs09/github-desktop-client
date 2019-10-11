const electron = require('electron');

const { app } = electron;
const { BrowserWindow } = electron;
const { Menu } = electron;

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 900, height: 680 });
  mainWindow.loadURL(
    isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`
  );

  mainWindow.on('closed', () => (mainWindow = null));

  const mainMenuTemplate = [
    {
      label: app.name,
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    },
    {
      label: 'File',
      submenu: [
        {
          label: 'New Repository...',
          click() {
            //   newRepository();
          }
        },
        { type: 'separator' },
        { label: 'Add Local Repository...' },
        { type: 'separator' },
        { label: 'Clone Repository...' }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { label: 'Undo' },
        { type: 'separator' },
        { label: 'Redo' },
        { type: 'separator' },
        { label: 'Cut' },
        { type: 'separator' },
        { label: 'Copy' },
        { type: 'separator' },
        { label: 'Paste' },
        { type: 'separator' },
        { label: 'Select All' },
        { type: 'separator' },
        { label: 'Find' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { label: 'Show changes' },
        { type: 'separator' },
        { label: 'Show history' },
        { type: 'separator' },
        { label: 'Show Repository List' },
        { type: 'separator' },
        { label: 'Show Branches List' }
      ]
    },
    {
      label: 'Repository',
      submenu: [
        { label: 'Pull' },
        { type: 'separator' },
        { label: 'Push' },
        { type: 'separator' },
        { label: 'Remove' },
        { type: 'separator' },
        { label: 'View on GitHub' }
      ]
    },
    {
      label: 'Branch',
      submenu: [
        { label: 'New Branch...' },
        { type: 'separator' },
        { label: 'Rename...' },
        { type: 'separator' },
        { label: 'Delete...' },
        { type: 'separator' },
        { label: 'Discard All Changes...' },
        { type: 'separator' },
        { label: 'Compare to branch' },
        { type: 'separator' },
        { label: 'Merge into Current Branch...' },
        { type: 'separator' },
        { label: 'Rebase Current Branch...' }
      ]
    }
  ];

  // If it is a developer then add Developer tools
  if (isDev) {
    mainMenuTemplate.push({
      label: 'Developer Tools',
      submenu: [
        {
          label: 'Toggle DevTools',
          accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
          click(item, focusedWindow) {
            focusedWindow.toggleDevTools();
          }
        },
        {
          role: 'Reload'
        }
      ]
    });
  }

  // Build Menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

  // Insert the menu
  Menu.setApplicationMenu(mainMenu);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
