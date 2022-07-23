import { createSlice } from '@reduxjs/toolkit';

export const soporteSlice = createSlice({
    name: 'soporte',
    initialState:{
        isLoadingSoportes: true,
        isSuccessSoportes: true,
        soportes: [
            // temp
        ],
    },
    reducers: {
        onLoadSoportes: (state, { payload = [] }) => {
            state.isLoadingSoportes = false;
            state.soportes = payload;
        },
        onAddNewSoporte: ( state, { payload }) => {
            state.soportes.push( payload );
        },
        isSuccessSoportes: (state, { payload }) => {
            state.isSuccessSoportes = payload;
        },
        isLoadingSoportes: (state, { payload }) => {
            state.s = payload;
        }
    }
});

// Action creators are generated for each case reducer function
export const {
    onLoadSoportes,
    onAddNewSoporte,
    isSuccessSoportes,
    isLoadingSoportes
} = soporteSlice.actions;
