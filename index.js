import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { validationResult } from 'express-validator'

import { registerValidation } from './validations/auth.js'
import UserModel from './models/User.js'

dotenv.config()

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log('DB is Okay'))
    .catch((err) => console.log('DB error ', err))

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send(' 111 Hello world')
})

app.post('/auth/login', (req, res) => {
    try {
    } catch (err) {}
})

app.post('/auth/register', registerValidation, async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const doc = new UserModel({
            email: req.body.email,
            passwordHash: hash,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
        })

        const user = await doc.save()

        const token = jwt.sign(
            {
                _id: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '30d',
            }
        )

        const { passwordHash, ...userData } = user._doc

        res.json({
            ...userData,
            token,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось зарегестрироваться',
        })
    }
})

app.listen(4444, (err) => {
    if (err) {
        console.log(err)
    }

    console.log('Server OK')
})
