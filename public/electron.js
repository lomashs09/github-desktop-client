const electron = require('electron');

const { app } = electron;
const { BrowserWindow } = electron;
const { Menu } = electron;
const { ipcMain } = electron;

// Load remote compnent that contains the dialog dependency
const { dialog } = electron;
const fs = require('fs'); // Load the File System to execute our common tasks (CRUD)

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    width,
    height,
    webPreferences: {
      nodeIntegration: true
    },
    resizable: false,
    icon: './assets/logo.png'
  });
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
          label: 'New Repository...'
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

// Open Dialogue Box for add and create local Repository
ipcMain.on('Repo', async (event, arg) => {
  if (arg === 'ADD_REPO') {
    dialog.showOpenDialog(
      {
        title: 'Select a folder',
        properties: ['openDirectory']
      },
      folderPaths => {
        // folderPaths is an array that contains all the selected paths
        event.reply('folderPath', folderPaths);
      }
    );
  } else if (arg.name === 'CREATE_README') {
    const path = `${arg.path}/README.md`;
    fs.writeFileSync(path, '', err => {
      if (err) {
        alert('ERROR! Failed to Create README.md');
      }
    });
  } else if (arg.type === 'CREATE_REPO') {
    try {
      const finalPath = `${arg.path}/${arg.repoName}`;
      fs.mkdirSync(finalPath);
      event.reply('newFile', finalPath);
    } catch (err) {
      dialog.showMessageBox({
        type: 'info',
        message: 'Error! Failed to create folder'
      });
    }
  }
});

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
