import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import '../assets/css/UserPortal.css'
import { auth, provider } from '../firebase'

function Login() {
    const [error, setError] = useState("")

    const signIn = () => {
        auth.signInWithPopup(provider)
        .catch((error) => setError(error.message))
    }

    return (
        <div className="login">
            <h2>Log In</h2>
            <Button 
                variant="contained" 
                color="primary" 
                className="form-element" 
                onClick={signIn}>
                    Log In with google
            </Button>
            <p className="error">{`${error}`}</p>
        </div>
    )
}

export default Login
