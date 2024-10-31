
import React, { useContext } from 'react'
import { AuthContext } from '../context/auth.context'
import { Navigate } from 'react-router-dom'

function IsAnon(props) {

    const {isLoggedIn} = useContext(AuthContext)

    if (isLoggedIn) {

        return <Navigate to='/exercises' />
    }
    else {
        return (
            props.children
        )
    }
}

export default IsAnon