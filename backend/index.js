const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
const port = process.env.PORT || 3001;
dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(multer().any());

const {
  getFolderData, addFolder, editFolder, deleteFolder, addFile, editFile, deleteFile,
} = require('./routeHandlers');

app.post('/get_folder_data', getFolderData);
app.post('/create_folder', addFolder);
app.post('/rename_folder', editFolder);
app.post('/delete_folder', deleteFolder);
app.post('/create_file', addFile);
app.post('/rename_file', editFile);
app.post('/delete_file', deleteFile);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
