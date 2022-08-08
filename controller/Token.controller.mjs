import jwt from 'jsonwebtoken';
import { Router } from 'express';
import express from 'express';

const router = Router();

router.use(express.json());

router.post('/token', (req, res) => {

    let token = generateAccessToken({ username: req.body.username }, { expiresIn: '1800s' });
    return res.send(token);
});

function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

export default router;
