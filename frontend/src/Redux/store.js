import {configureStore, combineReducers} from '@reduxjs/toolkit';
import userReducer from '../Redux/user/userSlice';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const rootReducer = combineReducers({

        user: userReducer,

});


const persistConfig = {
    key: 'root',
    storage,
    version: 1,
};



const persistedReducer = persistReducer(persistConfig, rootReducer )



export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});

//passing in the middleware and setting the serializableCheck to false to prevent errors

export const persistor = persistStore(store);