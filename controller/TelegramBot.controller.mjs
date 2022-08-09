import express from 'express';
import { Router } from 'express';
import db from '../db/index.mjs';
import jwt from 'jsonwebtoken';

const router = Router();
let TelegramBot = db.TelegramBot;
let TelegramChannel = db.TelegramChannel;

router.use(express.json());

router.post('/', async (req, res) => {
    let userId = jwt.decode(req.headers.authorization.split(' ')[1]).userId;
    TelegramBot.create({ ...req.body, UserId: userId });
    res.send("Success");
})

router.get('/:id', async (req, res) => {
    let result = await TelegramBot.findByPk(req.params.id, {
        include: TelegramChannel
    });
    res.send(result.dataValues);
});

router.put('/:id', async (req, res) => {
    let result = await TelegramBot.findByPk(req.params.id);
    result.set(req.body);
    result.save();
    res.send(`The discord bot token is updated to ${req.body}`);
});

export default router;