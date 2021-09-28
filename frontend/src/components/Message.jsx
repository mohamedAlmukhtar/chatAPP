import React from 'react'
import { Avatar } from '@material-ui/core'
import '../assets/css/Message.css'

function Message({ id, message, timestamp, username, photo }) {
    return (
        <div className="message">
            <Avatar src={photo}/>
            <div className="message-info">
                <h4>
                    {username}
                    <span className="message-timestamp">
                        {timestamp}
                    </span>
                </h4>
                <p>{message}</p>
            </div>      
        </div>
    )
}

export default Message
