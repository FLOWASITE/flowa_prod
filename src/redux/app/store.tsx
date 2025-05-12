// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import selectedBrandReducer from '../features/brands/selectedBrandSlice';
import topicsReducer from '../features/topics/topicsSlice';
import authReducer from '../features/authSlice';
import socialAccountReducer from '../features/social_account/socialAccountSlice';

export const store = configureStore({
    reducer: {
        selectedBrand: selectedBrandReducer,
        topics: topicsReducer,
        auth: authReducer,
        socialAccount: socialAccountReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
