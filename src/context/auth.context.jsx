

// creating the context

import { createContext, useState, useEffect } from "react";
import authService from '../services/auth.service'
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()



// context provider

function AuthContextProvider(props) {

    const [loggedInUser, setLoggedInUser] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate()

    const authenticateUser = async () => {
        setIsLoading(true)
        // 1. get the token from localstorage
    
        const token = localStorage.getItem('token')
        console.log('token in context: ', token)
        // 2. send the token to the verify route
    
        try {

            const response = await authService.verify()
            if (response.data) {
                setLoggedInUser(response.data)
                setIsLoggedIn(true)
            } else {
                await handleAuthError('Invalid token')
            }
        } catch (error) {
            console.error('Verification failed', error)
            await handleAuthError(error)
        } finally {
            setIsLoading(false)
        
        }
    }

    const handleAuthError = async (error) => {
        console.log('Error in auth in context: ', error)
        setLoggedInUser(null)
        setIsLoggedIn(false)
        navigate('/login')
    }

    useEffect(()=> {
        authenticateUser()
    }, [])

    return(
        <AuthContext.Provider value={{ loggedInUser, isLoggedIn, isLoading, authenticateUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}


export { AuthContextProvider, AuthContext }