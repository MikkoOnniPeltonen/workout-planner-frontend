
import React, { useContext } from 'react'
import { AuthContext } from '../context/auth.context'
import { Navigate } from 'react-router-dom'

function IsAnon(props) {

    const { isLoggedIn, isLoading } = useContext(AuthContext)

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isLoggedIn) {
        return <Navigate to='/user' />
    }
    else {
        return (
            props.children
        )
    }
}

export default IsAnon