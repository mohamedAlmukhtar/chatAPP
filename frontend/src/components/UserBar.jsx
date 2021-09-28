import { Avatar } from '@material-ui/core'
import axios from '../axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import '../assets/css/UserBar.css'
import { selectServerId, selectServerOwner } from '../features/appSlice'

function UserBar() {
    const serverId = useSelector(selectServerId)
    const serverOwner = useSelector(selectServerOwner)
    const [userList, setUserList] = useState([])
    const [admin, setAdmin] = useState({})

    useEffect(() => {
        if(serverId){
            axios.get('/get/userList', {
                params: {   
                    serverId: serverId,
                }
            })
            .then((res) => {
                setUserList(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
        }
        if(serverId && serverOwner){
            axios.get('/get/serverOwner', {
                params: {
                    userId: serverOwner,
                }
            })
            .then((res) => {
                setAdmin(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }, [serverId])

    return (
        <>
        {serverId ? (
            <div className="user-bar">
                <div className="user-header">
                    <h5>Admin :</h5>
                </div>
                <div className="user">
                    <Avatar src={admin.photo ? admin.photo : admin.displayPhoto}/>
                    <h5>{admin.username ? admin.username : admin.displayName}</h5>
                </div>
                <div className="user-header">
                    <h5>Members :</h5>
                </div>
                {
                    userList.map(user => {
                        return(
                            <div className="user">
                                <Avatar />
                                <h5>{user.username ? user.username : user.displayName}</h5>
                            </div>
                        )
                    })
                }
            </div>
        ): null}
        </>
        
    )
}

export default UserBar
