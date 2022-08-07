import express from 'express';
import { Router } from 'express';
import { Client, GatewayIntentBits } from 'discord.js';
import { Telegraf } from 'telegraf';
import db from '../db/index.mjs';

const router = Router();
let telegramClient;
let discordClient;


router.use(express.json());

router.get('/enable', async (req, res) => {
   let telegramBot = await db.TelegramBot.findOne({
      include: db.TelegramChannel
   });
   let discordBot = await db.DiscordBot.findOne({
      include: db.DiscordChannel
   });

   discordClient?.destroy();
   console.log('DisGram bot is destroyed.')


   telegramClient = new Telegraf(telegramBot.token);
   discordClient = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

   discordClient.once('ready', () => {
      console.log('DisGram bot is ready!');

   });

   discordClient.on("messageCreate", (message) => {
      if (message.channel.name === discordBot.DiscordChannel.name) {
         telegramBot.TelegramChannels.forEach(async it => {
            let telegramMessage = await telegramClient.telegram.sendMessage(it.channelId, message.content);
            if (it.retentionTime) {
               setTimeout(() => {
                  telegramClient.telegram.deleteMessage(it.channelId, telegramMessage.message_id);
               }, 1000 * 60 * it.retentionTime);
            }
         });
      }
   });

   try {
      await discordClient.login(discordBot.token);
      await telegramClient.launch();
   }
   catch (error) {
      res.status(401);
      return res.send("Invalid tokens for telegram and discord were provided");
   }
   return res.send("Success");
})

export default router;