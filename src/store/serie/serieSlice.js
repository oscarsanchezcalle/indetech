import { createSlice } from '@reduxjs/toolkit';

export const serieSlice = createSlice({
    name: 'serie',
    initialState:{
        isLoadingSerie: true,
        isSuccessSerie: true,
        series: [
            // temp
        ],
    },
    reducers: {
        onLoadSeries: (state, { payload = [] }) => {
            state.isLoadingSerie = false;
            state.series = payload;
        },
        onAddNewDependiencia: ( state, { payload }) => {
            state.series.push( payload );
        },
        isSuccessSeries: (state, { payload }) => {
            state.isSuccessSerie = payload;
        },
        isLoadingSeries: (state, { payload }) => {
            state.isLoadingSerie = payload;
        },
        resetSeries: (state) => {
            state.series = [];
        },
    }
});

// Action creators are generated for each case reducer function
export const {
    onLoadSeries,
    onAddNewSerie,
    isSuccessSeries,
    isLoadingSeries,
    resetSeries
} = serieSlice.actions;
