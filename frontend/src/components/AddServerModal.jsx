import React from 'react'
import '../assets/css/Modal.css'
import { useDispatch, useSelector } from 'react-redux'
import { closeServerModal } from '../features/modalSlice'
import { Button, IconButton, TextField, Tooltip } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import { useState } from 'react'
import { selectUser } from '../features/userSlice'
import axios from '../axios'
import { setNewServer } from '../features/appSlice'


function AddServerModal() {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const [step, setStep] = useState(0)
    const [name, setName] = useState("")
    const [invite, setInvite] = useState("")

    const createServer = () => {

        if(!name){
            return
        }

        const data = {
            userId: user.userId,
            server: {
                serverName: name,
                serverOwner: user.userId,
                users: [
                    user.userId
                ]
            }
        }

        axios.post('/new/server', data)
            .then((res) => {
                console.log(res.data)
            })
            .catch((error) => {
                console.log(error)
            })

        dispatch(setNewServer())
        closeModal()
    }

    const joinServer = () => {
        
        if(!invite){
            return
        }
        
        axios.post('/join/server', {
            userId: user.userId,
            serverId: invite,
        })
        .then((res) => {
            console.log(res.data)
        })
        .catch((error) => {
            console.log(error)
        })

        dispatch(setNewServer())
        closeModal()
        
    }

    const getHeader = () => {
        switch (step) {
            case 0:
                return "Add Server"
                break;
            case 1:
                return "Create Server"
                break;
            case 2:
                return "Join Server"
                break;
            default:
                break;
        }
    }

    const getContent = () => {
        switch (step) {
            case 0:
                return (
                    <div className="add-server">
                        <Button 
                            color="primary" 
                            variant="outlined" 
                            onClick={() => setStep(1)}>
                                Create New Server
                        </Button>
                        <Button 
                            color="secondary" 
                            variant="outlined" 
                            onClick={() => setStep(2)}>
                                Join Existing Server
                        </Button>
                    </div>
                )
                break;
            case 1:
                return (
                    <div className="add-server">
                        <TextField 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth 
                            type="text" 
                            variant="filled" 
                            label="Server Name" 
                            required
                        />
                    </div>
                )
                break;
            case 2:
                return (
                    <div className="add-server">
                        <TextField 
                            value={invite}
                            onChange={(e) => setInvite(e.target.value)}
                            fullWidth 
                            type="text" 
                            variant="filled" 
                            label="Paste Invitation Link" 
                            required
                        />
                    </div>
                )
                break;
            default:
                break;
        }
    }

    const getFooter = () => {
        switch (step) {
            case 0:
                return <Button variant="outlined" onClick={closeModal}>Cancel</Button>
                break;
            case 1:
                return (
                    <div className="modal-control">
                        <Button variant="outlined" onClick={() => setStep(0)}>Back</Button>
                        <Button variant="contained" color="primary" onClick={createServer}>Create</Button>
                    </div>
                )
                break;
            case 2:
                return (
                    <div className="modal-control">
                        <Button variant="outlined" onClick={() => setStep(0)}>Back</Button>
                        <Button variant="contained" color="secondary" onClick={joinServer}>Join</Button>
                    </div>
                )
                break;
            default:
                break;
        }
    }

    const closeModal = () => {
        dispatch(closeServerModal())
    }


    return (
        <div className="modal-wrapper">
             <div className="modal-background" onClick={closeModal}>

            </div>
            <div className="modal-container">
                <div className="modal-header">
                    <h3>{getHeader()}</h3>
                    <div className="modal-close">
                        <Tooltip title="Close" arrow placement="bottom">
                            <IconButton aria-label="closemodal" onClick={closeModal}>
                                <CloseIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
                <div className="modal-content">
                    {getContent()}
                </div>
                <div className="modal-footer">
                    {getFooter()}
                </div>
            </div>
        </div>
    )
}

export default AddServerModal
