import { useState } from "react"
import { useNavigate } from "react-router-dom"
import authService from '../services/auth.service.js'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'


function SignupPage() {


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })
    
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()

        let newUser = formData

        authService.signup(newUser)
        .then((createdUser) => {
            navigate('/login')
        })
        .catch((error) => {
            console.error(error)
        })
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center-justify-center p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader>
                    <h2 className="text-2xl font-semibold text-center text-gray-800">Sign up for your Workout planner</h2>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Name:
                            </label>
                            <input name="name" value={formData.name} onChange={handleChange} type="text"  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition" />
                            
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Email:
                            </label>
                            <input name="email" value={formData.email} onChange={handleChange} type="email" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition"/>
                            
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Password:
                            </label>
                            <input name="password" value={formData.password} onChange={handleChange} type="password" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition"/>
                        </div>
                        <Button type='submit' className='w-full bg-blue-600 hover:bg-blue-700 text white'>Sign up</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default SignupPage