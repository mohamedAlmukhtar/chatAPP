import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    serverModal: false,
    channelModal: false,
    inviteModal: false,
    editServerModal: false,
  },

  reducers: {

    openServerModal: (state, action) => {
        state.serverModal = true
    },
    
    closeServerModal: (state, action) => {
      state.serverModal = false
    },

    openChannelModal: (state, action) => {
        state.channelModal = true
    },

    closeChannelModal: (state, action) => {
      state.channelModal = false
    },

    openInviteModal: (state, action) => {
      state.inviteModal = true
    },

    closeInviteModal: (state, action) => {
      state.inviteModal = false
    },

    openEditServerModal: (state, action) => {
      state.editServerModal = true
    },

    closeEditServerModal: (state, action) => {
      state.editServerModal = false
    },

  },
  
})

export const { 
  openServerModal, 
  closeServerModal,
  openChannelModal, 
  closeChannelModal,
  openInviteModal,
  closeInviteModal,
  openEditServerModal,
  closeEditServerModal,
 } = modalSlice.actions

export const selectServerModal = (state) => state.modal.serverModal
export const selectChannelModal = (state) => state.modal.channelModal
export const selectInviteModal = (state) => state.modal.inviteModal
export const selectEditServerModal = (state) => state.modal.editServerModal


export default modalSlice.reducer
