import express from 'express'

import mongoose from 'mongoose'
import dotenv from 'dotenv'

import checkAuth from './utils/checkAuth.js'
import * as Validation from './validations.js'
import * as UserController from './controllers/UserController.js'
import * as PostController from './controllers/PostController.js'

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

app.get('/posts', PostController.getAll)

app.get('/posts/:id', PostController.getOne)

app.post(
    '/posts',
    checkAuth,
    Validation.postCreateValidation,
    PostController.create
)

app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, PostController.update)

app.listen(4444, (err) => {
    if (err) {
        console.log(err)
    }

    console.log('Server OK')
})
