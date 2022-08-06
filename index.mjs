import 'dotenv/config';

import express from 'express';
import configRouter from './controller/config.controller.mjs';
import cors from 'cors';

const app = express();

app.use(cors());
app.use('config', configRouter);

app.listen(5000);
