import React from 'react'
import '../assets/css/Modal.css'
import { ReactReduxContext, useDispatch, useSelector } from 'react-redux'
import { closeChannelModal, closeEditServerModal, closeInviteModal } from '../features/modalSlice'
import { Button, IconButton, TextField, Tooltip } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import { useState } from 'react'
import axios from '../axios'
import { selectServerId, selectServerName, setServerInfo } from '../features/appSlice'


function EditServerModal() {
    const dispatch = useDispatch()
    const serverId = useSelector(selectServerId)
    const serverName = useSelector(selectServerName)
    const [name, setName] = useState(serverName)


    const updateServer = () => {
        if(!name){
            return
        }

        axios.put('update/server', {
            serverId,
            server: {
                serverName: name,
            }
        })
        .then((res) => {
            console.log(res.data)
        })
        .catch((error) => {
            console.log(error)
        })

        closeModal()
    }

    const leaveServer = () => {
        if(window.confirm("Are you sure you want to leave this server")){
            alert('Left')
        } else {
            alert('No leave')
        }
    }

    const closeModal = () => {
        dispatch(closeEditServerModal())
    }

    return (
        <div className="modal-wrapper">
             <div className="modal-background" onClick={closeModal}>

            </div>
            <div className="modal-container">
                <div className="modal-header">
                    <h3>Server Settings</h3>
                    <div className="modal-close">
                        <Tooltip title="Close" arrow placement="bottom">
                            <IconButton aria-label="closemodal" onClick={closeModal}>
                                <CloseIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
                <div className="modal-content">
                    <div className="add-server">
                        <TextField 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text" 
                            fullWidth
                            variant="outlined" 
                            label="Server Name" 
                            required
                        />
                        <Button variant="contained" color="secondary" onClick={leaveServer}>Leave Server</Button>
                    </div>
                </div>
                <div className="modal-footer">
                    <div className="modal-control">
                        <Button variant="outlined" onClick={closeModal}>Cancel</Button>
                        <Button variant="contained" color="primary" onClick={updateServer}>Update Server</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditServerModal
