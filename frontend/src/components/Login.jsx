import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:3000/api/auth/login', {
                email,
                password
            })
            localStorage.setItem('token', res.data.token)
            navigate('/dashboard')
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong')
        }
    }
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit = {handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type = "submit">Login</button>
            </form>
            {error && <p style={{color:'red'}}>{error}</p>}
        </div>
    )
}

export default Login