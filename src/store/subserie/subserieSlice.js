import { createSlice } from '@reduxjs/toolkit';

export const subserieSlice = createSlice({
    name: 'subseries',
    initialState:{
        isLoadingSubseries: true,
        subseries: [
            // temp
        ],
    },
    reducers: {
        onLoadSubseries: (state, { payload = [] }) => {
            state.isLoadingSubseries = false;
            state.subseries = payload;
        },
        onAddNewSubserie: ( state, { payload }) => {
            state.subseries.push( payload );
        },
    }
});

// Action creators are generated for each case reducer function
export const {
    onLoadSubseries,
    onAddNewsubSerie
} = subserieSlice.actions;
