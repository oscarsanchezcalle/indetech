import { createSlice } from '@reduxjs/toolkit';

export const oficinaSlice = createSlice({
    name: 'oficina',
    initialState:{
        isLoadingOficinas: true,
        Oficinas: [
            // temp
        ],
    },
    reducers: {
        onLoadOficinas: (state, { payload = [] }) => {
            state.isLoadingOficinas = false;
            state.Oficinas = payload;
        },
        onAddNewOficina: ( state, { payload }) => {
            state.Oficinas.push( payload );
        },
    }
});

// Action creators are generated for each case reducer function
export const {
    onLoadOficinas,
    onAddNewOficina
} = oficinaSlice.actions;
