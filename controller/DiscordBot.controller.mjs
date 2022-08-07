import express from 'express';
import { Router } from 'express';
import db from '../db/index.mjs';

const router = Router();
let DiscordBot = db.DiscordBot;
let DiscordChannel = db.DiscordChannel;

router.use(express.json());

router.post('/', async (req, res) => {
    DiscordBot.create(req.body);

    res.send("Success");
})

router.get('/:id', async (req, res) => {
    let result = await DiscordBot.findByPk(req.params.id, {
        include: DiscordChannel
    });
    res.send(result.dataValues);
});

router.put('/:id', async (req, res) => {
    let result = await DiscordBot.findByPk(req.params.id);
    result.set(req.body);
    result.save();
    res.send(`The discord bot token is updated to ${req.body}`);
});

export default router;