import React, { useEffect, useState } from 'react'
import SearchRoundedIcon from '@material-ui/icons/SearchRounded'
import '../assets/css/MainPane.css'
import '../assets/css/ChatBox.css'
import Message from './Message'
import { useDispatch, useSelector } from 'react-redux'
import { selectChannelId, selectChannelName, selectNewMessage, selectServerId, setChannelInfo, setNewMessage } from '../features/appSlice'
import axios from '../axios'
import { selectUser } from '../features/userSlice'
import Pusher from 'pusher-js'

function MainPane() {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const channelId = useSelector(selectChannelId)
    const channelName = useSelector(selectChannelName)
    const serverId = useSelector(selectServerId)
    const newMessage = useSelector(selectNewMessage)
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState("")

    const pusher = new Pusher('6aeab925eafbdf4b5848', {
        cluster: 'us3'
    });

    useEffect(() => {
        const channel = pusher.subscribe('channels');
        channel.bind('newChannel', function(data) {
            console.log('stay', serverId)
            dispatch(setNewMessage())
        });

    }, [])

    useEffect(() => {
        if(channelId && serverId){
            axios.get('/get/conversation', {
                params: {
                    serverId: serverId,
                    channelId: channelId,
                }
            })
            .then((res) => {
                setMessages(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }, [channelId, newMessage])

    useEffect(() => {
        setMessages([])
    }, [serverId])


    const sendMessage = (e) => {
        e.preventDefault()
        setInput(input.trim())
        if(!/\S/.test(input) || !input){
            return
        }

        axios.post('/new/message', {
            serverId: serverId,
            channelId: channelId,
            message: {
                message: input,
                user: {
                    username: user.username,
                    photo: user.photo,
                }
            }
        })
        .then((res) => {
            if(res.status == 200){
                setInput("")
                dispatch(setNewMessage())
            } else {
                console.log(res.data)
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }


    return (
        <div className="main-pane">
            <div className="main-header">
                <div className="main-header-left">
                    <h4>
                        <span className="channel-symbol">
                            #
                        </span>
                        {channelName ? channelName : (<div className="placeholder placeholder-light"></div>)}
                    </h4>
                </div>
                <div className="main-header-right">
                    <div className="main-header-search">
                        <input placeholder="search" />
                        <SearchRoundedIcon />
                    </div>
                </div>
            </div>
            <div className="chat-box">
                {messages.length > 0 ? (
                    messages.map(message => {
                        return(
                            <Message
                                key={message._id}
                                id={message._id}
                                message={message.message}
                                timestamp={message.timestamp}
                                username={message.user.username}
                                photo={message.user.photo}
                            />
                        )
                    })
                ): (
                    <div className="empty-list empty-server-list">
                    </div>
                )}
            </div>
            <div className="chat-input">
                <form action="">
                    <input 
                        value={input}
                        disabled={!channelId || !serverId}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={channelId && serverId ? `Message #${channelName}` : "Select Channel"}
                    />
                    <button className="chat-input-button"
                        disabled={!channelId || !serverId}
                        type="submit"
                        onClick={sendMessage}
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    )
}

export default MainPane
