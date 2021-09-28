import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    serverId: null,
    serverName: null,
    serverOwner: null,

    channelId: null,
    channelName: null,

    newChannel: 0,
    newMessage: 0,
    newServer: false,
  },

  reducers: {

    setServerInfo: (state, action) => {
        state.serverId = action.payload.serverId
        state.serverName = action.payload.serverName
        state.serverOwner = action.payload.serverOwner
    },

    setChannelInfo: (state, action) => {
        state.channelId = action.payload.channelId
        state.channelName = action.payload.channelName
    },

    setNewServer:  (state, action) => {
      state.newServer = !state.newServer
    },

    setNewChannel: (state, action) => {
      state.newChannel = state.newChannel + 1
    },

    setNewMessage: (state, action) => {
      state.newMessage = state.newMessage + 1
    },

    reset: (state, action) => {
      state.serverId = null
      state.serverName = null
      state.channelId = null
      state.channelName = null
      state.newChannel = 0
      state.newMessage = 0
    }

  },
  
})

export const { setServerInfo, setChannelInfo, setNewServer, setNewChannel, setNewMessage, reset } = appSlice.actions

export const selectServerId = (state) => state.app.serverId
export const selectServerName = (state) => state.app.serverName
export const selectServerOwner = (state) => state.app.serverOwner
export const selectChannelId = (state) => state.app.channelId
export const selectChannelName = (state) => state.app.channelName
export const selectNewServer = (state) => state.app.newServer
export const selectNewChannel = (state) => state.app.newChannel
export const selectNewMessage = (state) => state.app.newMessage

export default appSlice.reducer
