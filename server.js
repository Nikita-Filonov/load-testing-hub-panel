const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = 13100;

const app = express();

app.use(favicon(__dirname + '/build/favicon.ico'));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/config', function (_, res) {
  res.json({
    serverUrl: process.env.SERVER_URL,
    apiVersion: process.env.API_VERSION,

    apiDateFormat: process.env.API_DATE_FORMAT,
    apiTimeFormat: process.env.API_TIME_FORMAT,

    pickerDateFormat: process.env.PICKER_DATE_FORMAT,
    pickerTimeFormat: process.env.PICKER_TIME_FORMAT
  });
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, '0.0.0.0');
