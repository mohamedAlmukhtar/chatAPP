import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice'
import appReducer from '../features/appSlice'
import modalReducer from '../features/modalSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
    modal: modalReducer,
  },
});
