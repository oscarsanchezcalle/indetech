import { createSlice } from '@reduxjs/toolkit';

export const documentoSlice = createSlice({
    name: 'documento',
    initialState:{
        isLoadingDocumentosByCarpeta: false,
        isLoadingAddDocumento: false,
        isLoadingDeleteDocumento: false,
        isLoadingEditDocumento: false,
        documentos: [
            // tempCarpeta
        ],
        documentoActivo: {},
        isOpenModalEditarDocumento: false
    },
    reducers: {
        setListaDocumento: (state, { payload = [] }) => {
            state.documentos = payload;
        },
        setIsLoadingDocumentosByCarpeta: ( state, {payload} ) => {
            state.isLoadingDocumentosByCarpeta = payload ;
        },
        setIsLoadingAddDocumento: ( state, {payload} ) => {
            state.isLoadingAddDocumento = payload ;
        },
        setIsLoadingDeleteDocumento: ( state, {payload} ) => {
            state.isLoadingDeleteDocumento = payload ;
        },
        setIsLoadingEditDocumento: ( state, {payload} ) => {
            state.isLoadingEditDocumento = payload ;
        },
        setDocumentoActivo: ( state, {payload} ) => {
            state.documentoActivo = payload ;
        },
        setIsOpenModalEditarDocumento: ( state, {payload} ) => {
            state.isOpenModalEditarDocumento = payload ;
        }
    }
});

// Action creators are generated for each case reducer function
export const {
    setListaDocumento,
    setIsLoadingDocumentosByCarpeta,
    setIsLoadingAddDocumento,
    setIsLoadingDeleteDocumento,
    setIsLoadingEditDocumento,
    setDocumentoActivo,
    setIsOpenModalEditarDocumento
} = documentoSlice.actions;
