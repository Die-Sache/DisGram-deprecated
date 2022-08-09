import { Router } from 'express';
import express from 'express';
import db from '../db/index.mjs';


const router = Router();
let User = db.User;

router.use(express.json());

router.post('/register', (req, res) => {
    User.create(req.body);
    return res.send("User created");
});

export default router;
