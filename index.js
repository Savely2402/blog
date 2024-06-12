import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

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
    console.log(req.body)

    const token = jwt.sign(
        {
            email: req.body.email,
            fullName: 'Вася пупкин',
        },
        process.env.JWT_SECRET
    )

    res.json({
        success: true,
        token,
    })
})

app.listen(4444, (err) => {
    if (err) {
        console.log(err)
    }

    console.log('Server OK')
})
