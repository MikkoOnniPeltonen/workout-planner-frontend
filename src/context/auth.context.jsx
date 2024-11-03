

// creating the context

import { createContext, useState, useEffect } from "react";
import authService from '../services/auth.service'

const AuthContext = createContext()



// context provider

function AuthContextProvider(props) {

    const [loggedInUser, setLoggedInUser] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    function authenticateUser() {

        // 1. get the token from localstorage
    
        const token = localStorage.getItem('token')
            
        // 2. send the token to the verify route
    
        if(token) {
            authService.verify()
            .then((userInformation) => {

                setLoggedInUser(userInformation.data)
                setIsLoading(false)
                setIsLoggedIn(true)
            })
            .catch((error) => {
                console.error('Verification failed', error)
                setLoggedInUser(null)
                setIsLoggedIn(false)
            })
            .finally(() => {
                setIsLoading(false)
            })
        }
        else {
            setIsLoggedIn(false)
            setLoggedInUser(null)
            setIsLoading(false)
        }
    }


    function logOutUser() {

        localStorage.removeItem('token')
            authenticateUser()
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