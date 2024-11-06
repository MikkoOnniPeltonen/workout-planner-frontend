
import React, { useContext } from 'react'
import { AuthContext} from '../context/auth.context'
import { Navigate, useLocation } from 'react-router-dom'

function IsPrivate(props) {

    const { isLoggedIn, isLoading } = useContext(AuthContext)
    const location = useLocation()

    if (isLoading) {
        return <div>Loading...</div>
    }

    if(!isLoggedIn){
        return <Navigate to='/login' state={{ from: location }}/>
    }
    else {
        return (
            props.children
        )
    }
}

export default IsPrivate