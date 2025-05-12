// src/redux/slices/socialAccountSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    accounts: [], // { username, profilePicture, platform }
};

const socialAccountSlice = createSlice({
    name: 'socialAccount',
    initialState,
    reducers: {
        addSocialAccount: (state, action) => {
            state.accounts.push(action.payload);
        },
        removeSocialAccount: (state, action) => {
            state.accounts = state.accounts.filter(acc => acc.platform !== action.payload);
        },
        clearAllAccounts: (state) => {
            state.accounts = [];
        },
    },
});

export const { addSocialAccount, removeSocialAccount, clearAllAccounts } = socialAccountSlice.actions;
export default socialAccountSlice.reducer;
