import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from '../context/auth.context'
import authService from "../services/auth.service"

import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

function LoginPage() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const { authenticateUser } = useContext(AuthContext)


    function handleSubmit(e) {
        e.preventDefault()

        let logInformation = {email, password}

        authService.login(logInformation)
        .then((token) => {
            console.log(token.data)
            localStorage.setItem('token', token.data.authToken)
            authenticateUser()
            navigate('/user')
        })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center-justify-center p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader>
                    <h2 className="text-2xl font-semibold text-center text-gray-800">Log in for your Workout planner</h2>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Email:
                            </label>
                            <input type='text' onChange={(e) => {setEmail(e.target.value)}} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"/>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Password:
                            </label>
                            <input type='password' onChange={(e) => {setPassword(e.target.value)}} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"/>
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <Button type='submit' onClick={handleSubmit} className="w-full bg-blue-600 hover:bg-blue-700 text white">Log in</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default LoginPage