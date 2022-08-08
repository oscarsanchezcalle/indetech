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
        isDeletingCarpeta: '',
        carpetaActiva: {},
        isOpenModalMoverCarpeta: false
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
        },
        setCarpetaActiva: ( state, {payload} ) => {
            state.carpetaActiva = payload ;
        },
        setOpenModalMoverCarpeta: ( state, {payload} ) => {
            state.isOpenModalMoverCarpeta = payload ;
        }
    }
});

// Action creators are generated for each case reducer function
export const {
    onLoadCarpetas,
    onAddNewCarpeta,
    onLoadCarpetasByCaja,
    setIsLoadingAddCarpeta,
    setIsDeletingCarpeta,
    setCarpetaActiva,
    setOpenModalMoverCarpeta
} = carpetaSlice.actions;
