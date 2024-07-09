import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import healthProfileReducer from './features/healthProfileSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        healthProfile: healthProfileReducer,
    },
});

