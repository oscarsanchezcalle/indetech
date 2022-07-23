import { createSlice } from '@reduxjs/toolkit';

export const frecuenciaSlice = createSlice({
    name: 'frecuencia',
    initialState:{
        isLoadingFrecuencias: true,
        isSuccessFrecuencias: true,
        frecuencias: [
            // temp
        ],
    },
    reducers: {
        onLoadFrecuencias: (state, { payload = [] }) => {
            state.isLoadingFrecuencias = false;
            state.frecuencias = payload;
        },
        onAddNewFrecuencia: ( state, { payload }) => {
            state.frecuencias.push( payload );
        },
        isSuccessFrecuencias: (state, { payload }) => {
            state.isSuccessFrecuencias = payload;
        },
        isLoadingFrecuencias: (state, { payload }) => {
            state.s = payload;
        }
    }
});

// Action creators are generated for each case reducer function
export const {
    onLoadFrecuencias,
    onAddNewFrecuencia,
    isSuccessFrecuencias,
    isLoadingFrecuencias
} = frecuenciaSlice.actions;
