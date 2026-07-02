const express = require('express')
const router = express.Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

router.post('/register', async(req,res,next) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email and password are required' })
        }
        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be atleast 6 characters" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({ name, email, password: hashedPassword })
        await user.save()
        res.status(201).json({
            message: "User created",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (err) {
        next(err)
    }
})

router.post('/login', async(req,res,next) => {
    try{
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ error: 'Wrong password' })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.status(200).json({ message: 'User logged in', token })
    
    } catch(err) {
        next(err)
    }
})

module.exports = router