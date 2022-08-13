import jwt from 'jsonwebtoken';
import { Router } from 'express';
import express from 'express';
import db from '../db/index.mjs';


const router = Router();
const User = db.User;

router.use(express.json());

router.post('/token', async (req, res) => {

    let user = await User.findOne({ where: { name: req.body.name, password: req.body.password } });
    if (!user) {
        res.statusCode = 401;
        return res.send({ error: "Invalid credentials" });
    }
    let token = generateAccessToken({ userId: user.id, username: req.body.name }, { expiresIn: '1800s' });
    return res.send({ token });
});

function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

export default router;
