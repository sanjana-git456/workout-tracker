require('dotenv').config({
    path: "./backend/.env"
})
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

app.use(express.json())
app.use((req,res,next) => {
    console.log(`${req.method} ${req.url}`)
    next()
})

const authRoutes = require('./routes/auth')
app.use('/api',authRoutes)

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.log('MongoDB connection error: ',err))
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

app.use((err, req, res, next) => {
    res.status(500).json({ error: 'Something went wrong' })
})