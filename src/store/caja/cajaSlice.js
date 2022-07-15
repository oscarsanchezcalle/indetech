import { createSlice } from '@reduxjs/toolkit';

export const cajaSlice = createSlice({
    name: 'caja',
    initialState:{
        isLoadingCajas: true,
        cajas: [
            // temp
        ],
    },
    reducers: {
        onLoadCajas: (state, { payload = [] }) => {
            state.isLoadingCajas = false;
            state.cajas = payload;
        },
        onAddNewCaja: ( state, { payload }) => {
            state.cajas.push( payload );
        },
    }
});

// Action creators are generated for each case reducer function
export const {
    onLoadCajas,
    onAddNewCaja
} = cajaSlice.actions;
