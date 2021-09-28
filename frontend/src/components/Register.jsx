import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import '../assets/css/UserPortal.css'

function Register() {
    const [account, setAccount] = useState(true)

    const getAccount = () => {
        
    }

    return (
        <div className="login-register">
            <h2>Register</h2>
            {account ? (
                <form action="">
                    <input className="form-element" type="text" placeholder="Username"/>
                    <Button className="form-element" variant="contained" color="secondary">Sign Up</Button>
                </form>
            ): (
                <Button 
                    variant="contained" 
                    color="primary" 
                    className="form-element" 
                    onClick={getAccount()}>
                        Log In with google
                </Button>
            )}
            
        </div>
    )
}

export default Register
