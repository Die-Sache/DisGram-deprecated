import express from 'express';
import { Router } from 'express';
import { Client, GatewayIntentBits } from 'discord.js';
import { Telegraf } from 'telegraf';

const router = Router();
let telegramBot;
let discordBot;

router.use(express.json());

router.get('/enable', async (req, res) => {
   discordBot?.destroy();
   console.log('DisGram bot is destroyed.')


   telegramBot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
   res.status(401);

   discordBot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

   discordBot.once('ready', () => {
      console.log('DisGram bot is ready!');

   });

   discordBot.on("messageCreate", (message) => {
      if (message.channel.name === process.env.discordChannelName) {
         telegramBot.telegram.sendMessage(process.env.telegramChannelId, message.content);
      }

   });

   try {
      await discordBot.login(process.env.DISCORD_BOT_TOKEN);
      await telegramBot.launch();
   }
   catch (error) {
      res.status(401);
      return res.send("Invalid tokens for telegram and discord were provided");
   }
   return res.send("Success");
})

export default router;