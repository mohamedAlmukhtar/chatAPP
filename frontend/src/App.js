import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import ServerBar from './components/ServerBar';
import ChannelBar from './components/ChannelBar';
import MainPane from './components/MainPane';
import UserBar from './components/UserBar';
import UserPortal from './components/UserPortal';
import { selectUser, logout, login } from './features/userSlice'
import { auth } from './firebase'
import axios from './axios';
import { selectChannelId, selectServerId, setChannelInfo, setServerInfo } from './features/appSlice';
import { selectChannelModal, selectEditServerModal, selectInviteModal, selectServerModal } from './features/modalSlice';
import AddServerModal from './components/AddServerModal';
import AddChannelModal from './components/AddChannelModal'
import InviteModal from './components/InviteModal';
import EditServerModal from './components/EditServerModal';


function App() {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const serverId = useSelector(selectServerId)
  const channelId = useSelector(selectChannelId)
  const serverModal = useSelector(selectServerModal)
  const channelModal = useSelector(selectChannelModal)
  const inviteModal = useSelector(selectInviteModal)
  const editServerModal = useSelector(selectEditServerModal)

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      dispatch(setChannelInfo({
        channelId: null,
        channelName: null,
        serverId: null,
        serverName: null,
      }))
      if(authUser){
        let userInfo = {
          email: authUser.email,
          username: authUser.displayName,
          photo: authUser.photoURL,
        }
        axios.post('/login', userInfo)
        .then((res) => {
            console.log(res.data)
            dispatch(
                login({
                    userId: res.data._id,
                    email: res.data.email,
                    username: res.data.username,
                    photo: res.data.photo,
                })
            )
 
        })
      } else {
        dispatch(logout())
      }
    })
  }, [dispatch])

  useEffect(() => {
    dispatch(setChannelInfo({
      channelId: null,
      channelName: null,
    }))
  }, [serverId])

  return (
    <div className="app">
      {user ? (
      
        <>
          {serverModal ? (
            <AddServerModal />
          ): null}

          {channelModal ? (
            <AddChannelModal />
          ): null}

          {inviteModal ? (
            <InviteModal />
          ): null}

          {editServerModal ? (
            <EditServerModal />
          ): null}

          {/* ServerBar */}
          <ServerBar />

          {/* channelBar */}
          <ChannelBar />

          {/* MainPane */}
          <MainPane />

          <UserBar />
        </>
        
      ): (
        <UserPortal />
      )}
    </div>
  );
}

export default App;
