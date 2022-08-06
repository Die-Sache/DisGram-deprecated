import express from 'express';
import {Router} from 'express';
import { Client, GatewayIntentBits } from 'discord.js';
import { Telegraf } from 'telegraf';
const router = Router();

router.use(express.json());

router.post('/setEnv', (req, res) => {
 process.env = {...process.env, ...req.body}
    res.send(process.env);
});

router.get('/start', (req, res) => {
    console.log(process.env.TELEGRAM_BOT_TOKEN);
     const telegramBot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
    console.log('Ready!');
 
 });
 
 
 client.on("messageCreate", (message) => {
    console.log(message.author.username)
    if (message.channel.name === process.env.DISCORD_CHANNEL_NAME && !message.author.bot) {
       telegramBot.telegram.sendMessage(process.env.TELEGRAM_CHANNEL_ID, message.content);
       console.log(message.content);
    }
 
 });

 telegramBot.launch()
client.login(process.env.DISCORD_BOT_TOKEN);

res.send("Success");

})

export default router;