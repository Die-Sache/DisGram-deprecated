import 'dotenv/config';
import { Client, GatewayIntentBits } from 'discord.js';
import fetch from 'node-fetch';
import { Telegraf } from 'telegraf';

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
