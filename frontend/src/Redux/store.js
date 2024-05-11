import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../Redux/user/userSlice'


export const store = configureStore({
    reducer: {
        user: userReducer,
    },
})