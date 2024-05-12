import {configureStore, combineReducers} from '@reduxjs/toolkit';
import userReducer from '../Redux/user/userSlice';
import {persistReducer} from 'redux-persist';


const rootReducer = combineReducers({
    reducer: {
        user: userReducer,
    }
})

const persistedReducer = persistReducer({

})



export const store = configureStore({
    reducer: {
        user: userReducer,
    },
})