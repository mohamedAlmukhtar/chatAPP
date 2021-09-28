import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import '../assets/css/ChannelBar.css'
import SettingsIcon from '@material-ui/icons/Settings'
import Channel from './Channel'
import AddIcon from '@material-ui/icons/Add';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Avatar, Button, IconButton, Tooltip } from '@material-ui/core';
import { selectUser } from '../features/userSlice'
import { auth } from '../firebase'
import { selectServerId, selectServerName, selectNewChannel, reset, setNewChannel } from '../features/appSlice'
import axios from '../axios'
import { openChannelModal, openEditServerModal, openInviteModal } from '../features/modalSlice'
import { useDispatch } from 'react-redux'
import Pusher from 'pusher-js'

function ChannelBar() {
    const user = useSelector(selectUser)
    const serverId = useSelector(selectServerId)
    const serverName = useSelector(selectServerName)
    const newChannel = useSelector(selectNewChannel)
    const [channels, setChannels] = useState([])
    const dispatch = useDispatch()

    const pusher = new Pusher('6aeab925eafbdf4b5848', {
        cluster: 'us3'
    });

    const getChannels = () => {
        axios.get('/get/channelList', {
            params: {
                serverId: serverId,
            }
        })
        .then((res) => {
            setChannels(res.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        const channel = pusher.subscribe('channels');
        channel.bind('newChannel', function(data) {
            console.log('stay', serverId)
            dispatch(setNewChannel())
        });

    }, [])

    useEffect(() => {
        getChannels()
        
    }, [serverId, newChannel])

    const signout = () => {
        auth.signOut()
        dispatch(reset())
    }

    const editServerModal = () => {
        dispatch(openEditServerModal())
    }

    const channelModal = () => {
        dispatch(openChannelModal())
    }

    const inviteModal = () => {
        dispatch(openInviteModal())
    }


    return (
        <div className="channel-bar">
            <div className="channel-bar-top">
                <h5>
                    <span className="server-symbol">
                        &#183;
                    </span>
                    {serverName ? serverName : (<div className="placeholder placeholder-dark"></div>)}
                </h5>
                {serverId ? (
                    <Tooltip title="Server Settings" arrow placement="right">
                        <IconButton aria-label="addchannel" onClick={editServerModal}>
                            <SettingsIcon fontSize="small" className="icon-dark"/> 
                        </IconButton>
                    </Tooltip>
                ): null }
            </div>
            <div className="channel-list">
                {serverId ? (
                    <div className="server-invite">
                        <Button onClick={inviteModal}>Invite Members</Button>
                    </div>
                ) : null}
                
                <div className="channel-header">
                    {(serverId) ? (
                        <>
                            <h5>Channels :</h5>
                            <Tooltip title="Add Channel" arrow placement="right">
                                <IconButton aria-label="addchannel" onClick={channelModal}>
                                    <AddIcon fontSize="small" className="icon-dark"/>
                                </IconButton>
                            </Tooltip>
                        </>
                    ): (
                        null
                    )}
                    
                </div>
                {(channels.length > 0) ? (
                    channels.map(channel => {
                        return(
                            <Channel 
                                key={channel._id}
                                id={channel._id}
                                channelName={channel.channelName}
                            />
                        )
                    })
                ): (
                    <div className="empty-list empty-channel-list">
                    </div>
                )}
            </div>
            <div className="user-section">
                <Avatar src={user.photo}/>
                <div className="user-info">
                    <h4>@{user.username}</h4>
                    <p>#{user.userId.substring(0, 5)}</p>
                </div>
                <div className="user-section-buttons">
                    <Tooltip title="Sign Out" arrow placement="right">
                        <IconButton className="icon-button-dark" aria-label="signout" onClick={signout}>
                            <ExitToAppIcon fontSize="small" className="icon-dark"/>
                        </IconButton>
                    </Tooltip>
                    {/*<Tooltip title="User Settings" arrow placement="right">
                        <IconButton aria-label="settings">
                            <PersonIcon fontSize="small" color="action"/>
                        </IconButton>
                    </Tooltip>*/}
                </div>
            </div>
        </div>
    )
}

export default ChannelBar
