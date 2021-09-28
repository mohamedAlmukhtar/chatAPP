import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectChannelId, setChannelInfo } from '../features/appSlice'
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';

function Channel({ id, channelName }) {
    const dispatch = useDispatch()
    const channelId = useSelector(selectChannelId)

    let style = "not-selected"

    if(id === channelId){
        style = 'selected-channel'
    }

    const handleClick = () => {
        console.log('NO prob')
        dispatch(
            setChannelInfo({
                channelId: id,
                channelName: channelName,
        }))
    }

    return (
        <div className="channel" id={style} onClick={() => handleClick()}>
            <ChatOutlinedIcon fontSize="small"/>
            <h5 className="channel-name">
                {channelName}
            </h5>
        </div>
    )
}

export default Channel
