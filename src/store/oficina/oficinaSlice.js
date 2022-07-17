import { createSlice } from '@reduxjs/toolkit';

export const oficinaSlice = createSlice({
    name: 'oficina',
    initialState:{
        isLoadingOficina: true,
        isSuccessOficina: true,
        oficinas: [
            // temp
        ],
    },
    reducers: {
        onLoadOficinas: (state, { payload = [] }) => {
            state.isLoadingOficina = false;
            state.isSuccessOficina = true;
            state.oficinas = payload;
        },
        onAddNewOficina: ( state, { payload }) => {
            state.oficinas.push( payload );
        },
        isSuccessOficinas: (state, { payload }) => {
            state.isSuccessOficina = payload;
        },
        isLoadingOficinas: (state, { payload }) => {
            state.isLoadingOficina = payload;
        },
        resetOficinas: (state) => {
            state.oficinas = [];
        },
    }
});

// Action creators are generated for each case reducer function
export const {
    onLoadOficinas,
    onAddNewOficina,
    isSuccessOficinas,
    isLoadingOficinas,
    resetOficinas
} = oficinaSlice.actions;

