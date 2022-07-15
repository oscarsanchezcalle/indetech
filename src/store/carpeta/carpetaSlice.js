import { createSlice } from '@reduxjs/toolkit';

export const carpetaSlice = createSlice({
    name: 'carpeta',
    initialState:{
        isLoadingCarpetas: true,
        carpetas: [
            // tempCarpeta
        ],
    },
    reducers: {
        onLoadCarpetas: (state, { payload = [] }) => {
            state.isLoadingCarpetas = false;
            state.carpetas = payload;
        },
        onAddNewCarpeta: ( state, { payload }) => {
            state.carpetas.push( payload );
        },
    }
});

// Action creators are generated for each case reducer function
export const {
    onLoadCarpetas,
    onAddNewCarpeta
} = carpetaSlice.actions;
