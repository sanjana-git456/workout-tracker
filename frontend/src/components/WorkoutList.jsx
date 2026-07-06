import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function WorkoutList() {
    const [workouts, setWorkouts] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const token = localStorage.getItem('token')
                const res = await axios.get('http://localhost:3000/api/workout',
                    { headers: { Authorization: token }
                })
                setWorkouts(res.data)
            } catch (err) {
                setError(err.response?.data?.error || 'Something went wrong')
            }
        }
        fetchWorkouts()
    }, [])

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token')
            await axios.delete(`http://localhost:3000/api/workouts/${id}`, {
                headers: { Authorization: token }
            })
            setWorkouts(workouts.filter(w => w._id !== id))
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong')
        }
    }
    return (
        <div>
            <h1>Workout List</h1>
            {workouts.map((workout) => (
                <div key={workout._id}>
                    <p>{workout.exercise} - {workout.sets} sets x {workout.reps} reps - {workout.duration} min - {workout.date}</p>
                    <button onClick={() => handleDelete(workout._id)}>Delete</button>
                </div>
            ))}
        </div>
    )
}

export default WorkoutList