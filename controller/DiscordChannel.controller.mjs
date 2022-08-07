import express from 'express';
import { Router } from 'express';
import db from '../db/index.mjs';

const router = Router();
let DiscordChannel = db.DiscordChannel;

router.use(express.json());

router.post('/', async (req, res) => {
    DiscordChannel.create(req.body);

    res.send("Success");
})

router.get('/:id', async (req, res) => {
    let result = await DiscordChannel.findByPk(req.params.id);
    res.send(result.dataValues);
});

router.put('/:id', async (req, res) => {
    let result = await DiscordChannel.findByPk(req.params.id);
    result.set(req.body);
    result.save();
    res.send(`The discord bot token is updated to ${req.body}`);
});

export default router;