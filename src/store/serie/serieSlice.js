import { createSlice } from '@reduxjs/toolkit';

export const serieSlice = createSlice({
    name: 'series',
    initialState:{
        isLoadingSeries: true,
        series: [
            // temp
        ],
    },
    reducers: {
        onLoadSeries: (state, { payload = [] }) => {
            state.isLoadingSeries = false;
            state.series = payload;
        },
        onAddNewserie: ( state, { payload }) => {
            state.series.push( payload );
        },
    }
});

// Action creators are generated for each case reducer function
export const {
    onLoadSeries,
    onAddNewserie
} = serieSlice.actions;
