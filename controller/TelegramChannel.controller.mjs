import express from 'express';
import { Router } from 'express';
import db from '../db/index.mjs';
import jwt from 'jsonwebtoken';

const router = Router();
let TelegramChannel = db.TelegramChannel;

router.use(express.json());

router.post('/', async (req, res) => {
    TelegramChannel.create(req.body);

    res.send("Success");
})

router.get('/', async (req, res) => {
    let userId = jwt.decode(req.headers.authorization.split(' ')[1]).userId;
    let result = await TelegramChannel.findAll({
        where: {
            id: req.params.id,
        }
    });
    let channels = result.map(it => it.dataValues);
    res.send(channels);
});

router.put('/:id', async (req, res) => {
    let userId = jwt.decode(req.headers.authorization.split(' ')[1]).userId;
    let result = await TelegramChannel.findOne({
        where: {
            id: req.params.id,
        }
    });
    result.set(req.body);
    result.save();
    res.send(`The discord bot token is updated to ${req.body}`);
});

export default router;