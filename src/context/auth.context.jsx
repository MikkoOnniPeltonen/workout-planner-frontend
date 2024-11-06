

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

    function authenticateUser() {
        setIsLoading(true)
        // 1. get the token from localstorage
    
        const token = localStorage.getItem('token')
            
        // 2. send the token to the verify route
    
        if(token) {
            authService.verify()
            .then((userInformation) => {

                setLoggedInUser(userInformation.data)
                setIsLoggedIn(true)
            })
            .catch((error) => {
                console.error('Verification failed', error)
                handleAuthError(error)
            })
            .finally(() => {
                setIsLoading(false)
            })
        }
        else {
            logOutUser()
        }
    }

    function handleAuthError(error) {
        console.log('Error in auth in context: ', error)
        setLoggedInUser(null)
        setIsLoggedIn(false)
        navigate('/login')
    }


    function logOutUser() {

        localStorage.removeItem('token')
        setLoggedInUser(null)
        setIsLoggedIn(false)
        setIsLoading(false)
    }

    useEffect(()=> {
        authenticateUser()
    }, [])

    return(
        <AuthContext.Provider value={{loggedInUser, isLoggedIn, isLoading, authenticateUser, logOutUser}}>
            {props.children}
        </AuthContext.Provider>
    )
}


export { AuthContextProvider, AuthContext }