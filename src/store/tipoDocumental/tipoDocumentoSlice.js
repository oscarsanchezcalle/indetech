import { createSlice } from '@reduxjs/toolkit';

export const tipoDocumentoSlice = createSlice({
    name: 'tipoDocumento',
    initialState:{
        isLoadingTipoDocumento: true,
        isSuccessTipoDocumento: true,
        tipoDocumentos: [
            // temp
        ],
    },
    reducers: {
        onLoadTipoDocumentos: (state, { payload = [] }) => {
            state.isLoadingTipoDocumentos = false;
            state.tipoDocumentos = payload;
        },
        onAddNewTipoDocumento: ( state, { payload }) => {
            state.tipoDocumentos.push( payload );
        },
        isSuccessTipoDocumentos: (state, { payload }) => {
            state.isSuccessTipoDocumento = payload;
        },
        isLoadingTipoDocumentos: (state, { payload }) => {
            state.isLoadingTipoDocumento = payload;
        },
        resetTipoDocumentos: (state) => {
            state.tipoDocumentos = [];
        },
    }
});

// Action creators are generated for each case reducer function
export const {
    onLoadTipoDocumentos,
    onAddNewTipoDocumento,
    isSuccessTipoDocumentos,
    isLoadingTipoDocumentos,
    resetTipoDocumentos
} = tipoDocumentoSlice.actions;
