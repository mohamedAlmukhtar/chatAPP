import React from 'react'
import '../assets/css/Modal.css'
import { useDispatch, useSelector } from 'react-redux'
import { closeChannelModal } from '../features/modalSlice'
import { Button, IconButton, TextField, Tooltip } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import { useState } from 'react'
import axios from '../axios'
import { selectServerId, setNewChannel } from '../features/appSlice'


function AddChannelModal() {
    const dispatch = useDispatch()
    const serverId = useSelector(selectServerId)
    const [name, setName] = useState("")

    const createChannel = () => {

        if(!name){
            return
        }

        const data = {
            serverId: serverId,
            channel: {
                channelName: name,
                conversation: [
                    {
                        message: "This is the start of the conversation",
                        user: {
                            username: "ChatApp Mod",
                        }
                    }
                ]
            }
        }

        axios.post('/new/channel', data)
            .then((res) => {
                console.log(res.data)
                dispatch(setNewChannel())
            })
            .catch((error) => {
                console.log(error)
            })

        closeModal()
    }

    const closeModal = () => {
        dispatch(closeChannelModal())
    }

    return (
        <div className="modal-wrapper">
             <div className="modal-background" onClick={closeModal}>

            </div>
            <div className="modal-container">
                <div className="modal-header">
                    <h3>Create Channel</h3>
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
                            fullWidth 
                            type="text" 
                            variant="filled" 
                            label="Channel Name" 
                            required
                        />
                    </div>
                </div>
                <div className="modal-footer">
                    <div className="modal-control">
                        <Button variant="outlined" onClick={closeModal}>Cancel</Button>
                        <Button variant="contained" color="primary" onClick={createChannel}>Create</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddChannelModal
