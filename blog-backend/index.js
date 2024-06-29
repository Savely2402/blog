import express from 'express'
import multer from 'multer'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

import { handleValidationErrors, checkAuth } from './utils/index.js'
import * as Validation from './validations.js'
import {
    PostController,
    UserController,
    CommentController,
} from './controllers/index.js'

dotenv.config()

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log('DB is Okay'))
    .catch((err) => console.log('DB error ', err))

const app = express()

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage })

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    })
})

app.get('/', (req, res) => {
    res.send(' 111 Hello world')
})

app.post(
    '/auth/login',
    Validation.loginValidation,
    handleValidationErrors,
    UserController.login
)
app.post(
    '/auth/register',
    Validation.registerValidation,
    handleValidationErrors,
    UserController.register
)
app.get('/auth/me', checkAuth, UserController.getMe)

app.get('/tags', PostController.getLastTags)
app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.post(
    '/posts',
    checkAuth,
    Validation.postCreateValidation,
    handleValidationErrors,
    PostController.create
)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch(
    '/posts/:id',
    checkAuth,
    Validation.postCreateValidation,
    handleValidationErrors,
    PostController.update
)
app.post('/posts/:id/comments', checkAuth, CommentController.create)
app.get('/posts/:id/comments', checkAuth, CommentController.getCommentsByPostId)
app.get('/comments', CommentController.getAll)

app.listen(4444, (err) => {
    if (err) {
        console.log(err)
    }

    console.log('Server OK')
})
