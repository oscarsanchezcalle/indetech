import { createSlice } from '@reduxjs/toolkit';

export const carpetaSlice = createSlice({
    name: 'carpeta',
    initialState:{
        isLoadingCarpetas: true,
        isLoadingAddCarpeta: false,
        carpetas: [
            // tempCarpeta
        ],
        carpetasByCajaId : [
            
        ],
        isDeletingCarpeta: ''
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
        setIsLoadingAddCarpeta: ( state, {payload} ) => {
            state.isLoadingAddCarpeta = payload ;
        },
        setIsDeletingCarpeta: ( state, {payload} ) => {
            state.isDeletingCarpeta = payload ;
        }
    }
});

// Action creators are generated for each case reducer function
export const {
    onLoadCarpetas,
    onAddNewCarpeta,
    onLoadCarpetasByCaja,
    setIsLoadingAddCarpeta,
    setIsDeletingCarpeta
} = carpetaSlice.actions;
