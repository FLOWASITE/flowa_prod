import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Topic } from '@/types';

interface TopicsState {
    topics: Topic[];
}

const initialState: TopicsState = {
    topics: []
};

const topicsSlice = createSlice({
    name: 'topics',
    initialState,
    reducers: {
        addTopics: (state, action: PayloadAction<Topic[]>) => {
            state.topics = [...state.topics, ...action.payload];
        }
    }
});

export const { addTopics } = topicsSlice.actions;
export default topicsSlice.reducer; 