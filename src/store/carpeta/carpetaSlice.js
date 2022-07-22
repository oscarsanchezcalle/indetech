import { createSlice } from '@reduxjs/toolkit';

export const carpetaSlice = createSlice({
    name: 'carpeta',
    initialState:{
        isLoadingCarpetas: true,
        carpetas: [
            // tempCarpeta
        ],
        carpetasByCajaId : [
            
        ]
    },
    reducers: {
        onLoadCarpetas: (state, { payload = [] }) => {
            state.isLoadingCarpetas = false;
            state.carpetas = payload;
        },
        onAddNewCarpeta: ( state, { payload }) => {
            state.carpetas.push( payload );
        },
        onLoadCarpetasByCaja: ( state, { payload }) => {
            state.carpetasByCajaId = payload ;
        },
    }
});

// Action creators are generated for each case reducer function
export const {
    onLoadCarpetas,
    onAddNewCarpeta,
    onLoadCarpetasByCaja
} = carpetaSlice.actions;
