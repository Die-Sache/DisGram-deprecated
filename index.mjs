import 'dotenv/config';

import express from 'express';
import discordBotRouter from './controller/DiscordBot.controller.mjs'
import discordChannelRouter from './controller/DiscordChannel.controller.mjs';
import telegramBotRouter from './controller/TelegramBot.controller.mjs';
import telegramChannelRouter from './controller/TelegramChannel.controller.mjs';
import disGramConfigRouter from './controller/DisGramConfig.controller.mjs';
import tokenControllerRouter from './controller/Token.controller.mjs';
import userRouter from './controller/User.controller.mjs'
import cors from 'cors';
import db from './db/index.mjs';
import tokenAuthentication from './config/tokenAuthentication.config.mjs';

db.sequelize.sync();
const app = express();

app.use(cors());
app.use('/api/v1/*', tokenAuthentication);

app.use('/api/v1/DiscordBot', discordBotRouter);
app.use('/api/v1/DiscordChannel', discordChannelRouter);
app.use('/api/v1/TelegramBot', telegramBotRouter);
app.use('/api/v1/TelegramChannel', telegramChannelRouter);
app.use('/api/v1/config', disGramConfigRouter);
app.use('/', tokenControllerRouter);
app.use('/User', userRouter);


app.listen(process.env.PORT || 5000);

