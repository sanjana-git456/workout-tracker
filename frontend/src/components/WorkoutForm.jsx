import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function WorkoutForm() {
    const [exercise, setExercise] = useState('')
    const [sets, setSets] = useState('')
    const [reps, setReps] = useState('')
    const [duration, setDuration] = useState('')
    const [date, setDate] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('token')
            const res = await axios.post(
                'http://localhost:3000/api/workouts',
                { exercise, sets, reps, duration, date },
                { headers: { Authorization: token } }
            )
            console.log(res.data)
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong')
        }
    }
    return (
        <div>
            <h1>Workout</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Exercise"
                    value={exercise}
                    onChange = {(e) => setExercise(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Sets"
                    value={sets}
                    onChange = {(e) => setSets(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Reps"
                    value={reps}
                    onChange = {(e) => setReps(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Duration"
                    value={duration}
                    onChange = {(e) => setDuration(e.target.value)}
                />
                <input
                    type="date"
                    placeholder="Date"
                    value={date}
                    onChange = {(e) => setDate(e.target.value)}
                />
                <button type="submit">Workout</button>
            </form>
            {error && <p style={{color: 'red'}}>{error}</p>}
        </div>
    )
}

export default WorkoutForm