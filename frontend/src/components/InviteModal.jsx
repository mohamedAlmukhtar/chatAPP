import React from 'react'
import '../assets/css/Modal.css'
import { useDispatch, useSelector } from 'react-redux'
import { closeChannelModal, closeInviteModal } from '../features/modalSlice'
import { Button, IconButton, TextField, Tooltip } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import { useState } from 'react'
import axios from '../axios'
import { selectServerId } from '../features/appSlice'


function InviteModal() {
    const dispatch = useDispatch()
    const serverId = useSelector(selectServerId)
    const [username, setUserName] = useState("")
    const [id, setId] = useState("")

    const sendInvite = () => {
        alert('Invite Sent')
    }

    const closeModal = () => {
        dispatch(closeInviteModal())
    }

    return (
        <div className="modal-wrapper">
             <div className="modal-background" onClick={closeModal}>

            </div>
            <div className="modal-container">
                <div className="modal-header">
                    <h3>Invite Member</h3>
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
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                            type="text" 
                            variant="outlined" 
                            label="Username" 
                            required
                        />
                        <TextField 
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            type="text" 
                            variant="outlined" 
                            label="# ID" 
                            required
                        />
                        <div className="invite-link">Invite link : {serverId}</div>
                    </div>
                </div>
                <div className="modal-footer">
                    <div className="modal-control">
                        <Button variant="outlined" onClick={closeModal}>Cancel</Button>
                        <Button variant="contained" color="primary" onClick={sendInvite}>Send Invite</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InviteModal
