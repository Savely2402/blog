import express from 'express'

import mongoose from 'mongoose'
import dotenv from 'dotenv'

import * as Validation from './validations.js'
import * as UserController from './controllers/UserController.js'
import checkAuth from './utils/checkAuth.js'

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

app.post('/auth/login', Validation.loginValidation, UserController.login)

app.post(
    '/auth/register',
    Validation.registerValidation,
    UserController.register
)

app.get('/auth/me', checkAuth, UserController.getMe)

app.listen(4444, (err) => {
    if (err) {
        console.log(err)
    }

    console.log('Server OK')
})
