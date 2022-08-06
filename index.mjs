import 'dotenv/config';

import express from 'express';
import configRouter from './controller/config.controller.mjs';

const app = express();

app.use('/config', configRouter);

app.listen(5000);
