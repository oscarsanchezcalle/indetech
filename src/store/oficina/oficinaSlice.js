import { createSlice } from '@reduxjs/toolkit';

export const oficinaSlice = createSlice({
    name: 'oficina',
    initialState:{
        isLoadingOficina: true,
        isSuccessOficina: true,
        oficinas: [
            // temp
        ],
        oficinaActiva:{
            
        }
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
        setOficinaActiva: (state, { payload }) => {
            state.oficinaActiva = payload;
        },
    }
});

// Action creators are generated for each case reducer function
export const {
    onLoadOficinas,
    onAddNewOficina,
    isSuccessOficinas,
    isLoadingOficinas,
    resetOficinas,
    setOficinaActiva
} = oficinaSlice.actions;

