import WorkoutForm from '../components/WorkoutForm'
import WorkoutList from '../components/WorkoutList'

function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <WorkoutForm />
            <WorkoutList />
        </div>
    )
}
export default Dashboard