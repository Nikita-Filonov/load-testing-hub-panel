import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const buildDirectory = path.join(path.dirname(fileURLToPath(import.meta.url)), 'build');
const app = express();

app.use(express.static(buildDirectory));

app.get('/config', (_, response) => {
  response.json({
    serverUrl: process.env.SERVER_URL,
    apiVersion: process.env.API_VERSION,
    apiDateFormat: process.env.API_DATE_FORMAT,
    apiTimeFormat: process.env.API_TIME_FORMAT,
    durationFormat: process.env.DURATION_FORMAT,
    pickerDateFormat: process.env.PICKER_DATE_FORMAT,
    pickerTimeFormat: process.env.PICKER_TIME_FORMAT
  });
});

app.get('/*splat', (_, response) => {
  response.sendFile(path.join(buildDirectory, 'index.html'));
});

app.listen(13100, '0.0.0.0');
