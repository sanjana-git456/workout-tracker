const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Workout = require('../models/Workout')
const protect = require('../middleware/auth')

router.get('/', protect, async(req,res,next) => {
    try {
        const workouts = await Workout.find({ userId: req.user.id})
        res.status(200).json(workouts)
    } catch(err) {
        next(err)
    }
})

router.post('/', protect, async(req,res,next) => {
    try {
        const { exercise, sets, reps, duration, date } = req.body
        const workout = new Workout({ exercise, sets, reps, duration, date, userId: req.user.id })
        await workout.save()
        res.status(201).json(workout)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', protect, async(req,res) => {
    try {
        const deleted = await Workout.findOneAndDelete({ _id: req.params.id, userId: req.user.id })
        if (!deleted) {
            return res.status(404).json({ error: 'Workout not found or not yours' })
        }
        res.status(200).json(deleted)
    } catch (err) {
        next(err)
    }
})

module.exports = router