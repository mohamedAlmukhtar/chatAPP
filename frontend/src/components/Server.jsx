import React from 'react'
import '../assets/css/ServerBar.css'
import { useDispatch, useSelector } from 'react-redux'
import { selectServerId, setServerInfo } from '../features/appSlice'
import { Tooltip } from '@material-ui/core'
 
function Server({ id, serverName, serverImage, serverOwner }) {
    const dispatch = useDispatch()
    const serverId = useSelector(selectServerId)

    let sname = "SVR"
    let style = 'not-selected'
    
    if(serverName){
        let words = serverName.split(" ")
        if(words.length >= 3){
            sname = words[0].substring(0, 1) + words[1].substring(0, 1) + words[2].substring(0, 1)
        }
        else if(words.length > 1){
            sname = words[0].substring(0, 1) + words[1].substring(0, 2)
        } else {
            sname = words[0].substring(0, 3)
        }
    } else {
        serverName = "Server"
    }
    
    if(id === serverId){
        style = 'selected-server'
    }

    const handleClick = () => {
        dispatch(
            setServerInfo({
                serverId: id,
                serverName: serverName,
                serverOwner: serverOwner,
        }))
    }

    return (
        <Tooltip title={serverName} arrow placement="right">
            <div className="server" >
                <div className="server-button" id={style} onClick={() => handleClick()}>
                    {serverImage ? (
                        <img src={window.location.origin + '/src/assets/img/Chat-pattern.jpg'}></img>
                    ): (
                        <h4>{sname}</h4>
                    )}
                    
                </div>
            </div>
        </Tooltip>
    )
}

export default Server
