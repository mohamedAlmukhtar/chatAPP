import React from 'react'
import Login from './Login'
import '../assets/css/UserPortal.css'

function UserPortal() {

    return (
        <div className="user-portal">
            <div className="portal-left">
                <Login />  
            </div>
            <div className="portal-right">
                {/* Portal Image */}
            </div>
            
                     
        </div>
    )
}

export default UserPortal
