
import React, { useContext } from 'react'
import { AuthContext} from '../context/auth.context'
import { Navigate } from 'react-router-dom'

function IsPrivate(props) {

    const {isLoggedIn} = useContext(AuthContext)

    if(!isLoggedIn){
        return <Navigate to='/login' />
    }
    else {
        return (
            props.children
        )
    }
}

export default IsPrivate