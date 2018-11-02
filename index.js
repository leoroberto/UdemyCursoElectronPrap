const electron = require('electron');
var sizeOf = require('image-size');

/* Processo principal da aplicação (app), ele é utilizado para gerenciamento de todo o ciclo de 
vida da aplicação. Neste caso ele já existe, está contido e está sendo extraído da 
constante electron via desestruturação. O mesmo vale para BrowserWindows que é uma propriedade 
para criação e manipulação de janelas gráficas no Electron. Os processos App e BrowserWindow
são distintos e rodam separadamente */
const {app, BrowserWindow, ipcMain} = electron;
let mainWindow;

/* A função específica vai ser executada quando o evento ready ocorrer, ou seja, quando o 
processo principal da aplicação estiver pronto para interação, pois o mesmo leva um tempo 
para estar pronto */ 
app.on('ready', () => {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on('obterDimensoesDaImagem', (event, path) => {
    sizeOf(path, function (err, dimensions) {
        //console.log('Largura: ' + dimensions.width, 'Altura: ' + dimensions.height);
        mainWindow.webContents.send('dimensoesDaImagem', dimensions);
    });
});