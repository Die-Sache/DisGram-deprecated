import 'dotenv/config';

import express from 'express';
import discordBotRouter from './controller/DiscordBot.controller.mjs'
import discordChannelRouter from './controller/DiscordChannel.controller.mjs';
import telegramBotRouter from './controller/TelegramBot.controller.mjs';
import telegramChannelRouter from './controller/TelegramChannel.controller.mjs';
import disGramConfigRouter from './controller/DisGramConfig.controller.mjs';
import cors from 'cors';
import db from './db/index.mjs';

db.sequelize.sync();
const app = express();

app.use(cors());
app.use('/api/v1/DiscordBot', discordBotRouter);
app.use('/api/v1/DiscordChannel', discordChannelRouter);
app.use('/api/v1/TelegramBot', telegramBotRouter);
app.use('/api/v1/TelegramChannel', telegramChannelRouter);
app.use('/api/v1/config', disGramConfigRouter);

app.listen(process.env.PORT || 5000);

