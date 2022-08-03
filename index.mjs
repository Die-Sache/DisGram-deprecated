import 'dotenv/config';
import { Client, GatewayIntentBits } from 'discord.js';
import fetch from 'node-fetch';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
client.once('ready', () => {
   console.log('Ready!');

});

client.on("messageCreate", (message) => {
   console.log(message.channel.name)
   if (message.channel.name === 'text') {
      console.log(message.content);
      fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${process.env.TELEGRAM_CHANNEL_ID}&text=${message.content}`);
   }

});

client.login(process.env.DISCORD_BOT_TOKEN);