import express from 'express';
import { Router } from 'express';
import db from '../db/index.mjs';

const router = Router();
let TelegramChannel = db.TelegramChannel;

router.use(express.json());

router.post('/', async (req, res) => {
    TelegramChannel.create(req.body);

    res.send("Success");
})

router.get('/', async (req, res) => {
    let result = await TelegramChannel.findAll();
    let channels = result.map(it => it.dataValues);
    res.send(channels);
});

export default router;