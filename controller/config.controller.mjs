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
    console.log("#############");
    console.log(process.env.telegramChannelId);
     const telegramBot = new Telegraf(process.env.telegramBotToken);
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
    console.log('Ready!');
 
 });
 
 client.on("messageCreate", (message) => {
    console.log(message.author.username)
    if (message.channel.name === process.env.discordChannelName) {
       telegramBot.telegram.sendMessage(process.env.telegramChannelId, message.content);
    }

 });

 telegramBot.launch()
client.login(process.env.discordBotToken);

res.send("Success");

})

export default router;