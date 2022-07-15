import { createSlice } from '@reduxjs/toolkit';

export const tipoDocumentalSlice = createSlice({
    name: 'tipoDocumental',
    initialState:{
        isLoadingTiposDocumentales: true,
        tiposDocuemntales: [
            // temp
        ],
    },
    reducers: {
        onLoadTiposDocumentales: (state, { payload = [] }) => {
            state.isLoadingTiposDocumentales = false;
            state.tiposDocuemntales = payload;
        },
        onAddNewTipoDocumental: ( state, { payload }) => {
            state.tiposDocuemntales.push( payload );
        },
    }
});

// Action creators are generated for each case reducer function
export const {
    onLoadTiposDocumentales,
    onAddNewTipoDocumental
} = tipoDocumentalSlice.actions;
