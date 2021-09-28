import React, { useEffect, useState } from 'react'
import '../assets/css/ServerBar.css'
import Server from './Server'
import AddIcon from '@material-ui/icons/Add';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import axios from '../axios';
import { IconButton, Tooltip } from '@material-ui/core';
import { useDispatch } from 'react-redux'
import { openServerModal } from '../features/modalSlice';
import { selectNewServer } from '../features/appSlice';
import Pusher from 'pusher-js'


function ServerBar() {
    const user = useSelector(selectUser)
    const [servers, setServers] = useState([])
    const newServer = useSelector(selectNewServer)
    const dispatch = useDispatch()


    const pusher = new Pusher('6aeab925eafbdf4b5848', {
        cluster: 'us3'
    });

    const getServers = () => {
        if(user){
            axios.get('/get/serverList', {
                params: {
                    userId: user.userId,
                }
            })
            .then((res) => {
                setServers(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }

    useEffect(() => {
        getServers()

        const channel = pusher.subscribe('servers');
        channel.bind('newServer', function(data) {
            getServers()
        });
    }, [])

    const openModal = () => {
        dispatch(openServerModal())
    }

    return (
        <div className="server-bar">
            <div className="server">
                <Tooltip title="Create/Join Server" arrow placement="right">
                    <div className="server-button" onClick={openModal}>
                        <AddIcon className=""/>
                    </div>
                </Tooltip>
            </div>
            {
                servers.map(server => {
                    return(
                        <Server 
                            key={server._id} 
                            id={server._id}
                            serverName={server.serverName} 
                            serverImage={server.serverImage}
                            serverOwner={server.serverOwner}
                        />
                    )
                })
            }
            
        </div>
    )
}

export default ServerBar
