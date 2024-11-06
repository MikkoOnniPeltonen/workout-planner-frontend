import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from '../context/auth.context'
import authService from "../services/auth.service"

import LoadingSpinner from '../components/LoadingSpinner'
import { Card, CardHeader, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'

function LoginPage() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const { authenticateUser } = useContext(AuthContext)


    async function handleSubmit(e) {
        e.preventDefault()

        setIsLoading(true)

        if(!email) setEmailError('Email required, please enter your email.')
        if(!password) setPasswordError('Password required, please enter a password.')


        if (!email || !password) {
            console.error('Email and password required.')
            return
        }

        let logInformation = {email, password}

        try {
            const token = await authService.login(logInformation)
            localStorage.setItem("token", token.data.authToken)
            authenticateUser()
            navigate('/user')
        
        } catch (error) {
            console.error('Login failed', error)
        } finally {
            setIsLoading(false)
        }
  
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        if(emailError) setEmailError('')
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
        if(passwordError) setPasswordError('')
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center-justify-center p-4">
            {isLoading ? (<LoadingSpinner />) : (
                <Card className="w-full max-w-md shadow-lg">
                    <CardHeader>
                        <h2 className="text-2xl font-semibold text-center text-gray-800">Log in for your Workout planner</h2>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                        
                            <div className="space-y-2">
                                <label htmlFor='email' className="block text-sm font-medium text-gray-700">
                                    Email:
                                </label>
                                <input type='text' id='email' name='email' onChange={handleEmailChange} value={email} autoComplete='email' placeholder={emailError || 'Enter your email'} className={`w-full p-2 border rounded-md focus:ring-2 ${emailError ? 'placeholder-red-500 border-red-500' : 'focus:ring-blue-500'} outline-none transition`} />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor='password' className="block text-sm font-medium text-gray-700">
                                    Password:
                                </label>
                                <input type='password' id='password' name='password' onChange={handlePasswordChange} value={password} autoComplete='current-password' placeholder={passwordError || 'Enter your password'} className={`w-full p-2 border rounded-md focus:ring-2 ${passwordError ? 'placeholder-red-500 border-red-500' : 'focus:ring-blue-500'} outline-none transition`} />
                            </div>
                            <Button type='submit' className="w-full bg-blue-600 hover:bg-blue-700 text white">Log in</Button>
                        </form>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

export default LoginPage