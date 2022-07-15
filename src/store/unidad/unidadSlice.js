import { createSlice } from '@reduxjs/toolkit';

export const unidadSlice = createSlice({
    name: 'unidad',
    initialState:{
        isLoadingUnidades: true,
        unidades: [
            // temp
        ],
    },
    reducers: {
        onLoadUnidades: (state, { payload = [] }) => {
            state.isLoadingUnidades = false;
            state.unidades = payload;
        },
        onAddNewUnidad: ( state, { payload }) => {
            state.unidades.push( payload );
        },
    }
});

// Action creators are generated for each case reducer function
export const {
    onLoadUnidades,
    onAddNewUnidad
} = unidadSlice.actions;
