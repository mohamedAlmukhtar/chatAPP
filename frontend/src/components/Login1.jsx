import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import '../assets/css/UserPortal.css'
import axios from '../axios'
import { login } from '../features/userSlice'

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        const userInfo = {
            email: email,
            password: password
        }
        axios.post('/login', userInfo)
            .then((res) => {
                if(res.status === 201){
                    /* Authentication fail */
                    setError(res.data)
                } else if(res.status === 200){
                    /* Authentication success */
                    dispatch(
                        login({
                            email: res.data.email,
                            username: res.data.username,
                            photo: res.data.photo,
                        })
                    )

                } else {
                    setError("Issues connecting to the server, Try again later")
                }
            })
    }

    return (
        <div className="login-register">
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    className="form-element" 
                    type="email"
                    required
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input 
                    className="form-element" 
                    type="password" 
                    required
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <Button 
                    type="submit" 
                    value="Submit" 
                    className="form-element" 
                    variant="contained" 
                    color="primary">
                        Sign In
                </Button>
            </form>
            <p className="error">{`${error}`}</p>
        </div>
    )
}

export default Login
