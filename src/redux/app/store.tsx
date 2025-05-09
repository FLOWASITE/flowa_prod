// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import selectedBrandReducer from '../features/brands/selectedBrandSlice';
import topicsReducer from '../features/topics/topicsSlice';

export const store = configureStore({
    reducer: {
        selectedBrand: selectedBrandReducer,
        topics: topicsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
