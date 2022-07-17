import { createSlice } from '@reduxjs/toolkit';

export const subserieSlice = createSlice({
    name: 'subserie',
    initialState:{
        isLoadingSubserie: true,
        isSuccessSubserie: true,
        subseries: [
            // temp
        ],
    },
    reducers: {
        onLoadSubseries: (state, { payload = [] }) => {
            state.isLoadingSubserie = false;
            state.subseries = payload;
        },
        onAddNewSubserie: ( state, { payload }) => {
            state.subseries.push( payload );
        },
        isSuccessSubseries: (state, { payload }) => {
            state.isSuccessSubserie = payload;
        },
        isLoadingSubseries: (state, { payload }) => {
            state.isLoadingSubserie = payload;
        },
        resetSubseries: (state) => {
            state.subseries = [];
        },
    }
});

// Action creators are generated for each case reducer function
export const {
    onLoadSubseries,
    onAddNewSubserie,
    isSuccessSubseries,
    isLoadingSubseries,
    resetSubseries
} = subserieSlice.actions;
