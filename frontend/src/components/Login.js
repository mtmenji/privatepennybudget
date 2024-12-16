import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import { Link } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email, password)
    }

    return (
        <div className="flex flex-col items-center space-y-4">
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="Email"
                    className="bg-light1 px-2 text-bodytext rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-48"
                />

                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="Password"
                    className="bg-light1 px-2 text-bodytext rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-48"
                />

                <button
                    disabled={isLoading}
                    className={`bg-button px-2 text-light1 rounded-md font-semibold transition-colors duration-200 hover:bg-buttonhover focus:outline-none ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Log In
                </button>

                {error && <div className="text-red-500">{error}</div>}

                <Link to="/forgot-password" className="text-light1">
                    Forgot Password?
                </Link>
            </form>
        </div>
    )
}

export default Login