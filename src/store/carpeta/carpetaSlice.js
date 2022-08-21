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
        isOpenModalMoverCarpeta: false,
        isOpenModalAsignar: false,
        isOpenModalVerPdf: false,
        archivosDropbox : {},
        carpetasConPdf : [],
        carpetasSinPdf : [],
        isLoadingDropbox:false,
        isLoadingAsignarPdf: false,
        isLoadingQuitarPdf: false,
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
        },
        setOpenModalAsignar: ( state, {payload} ) => {
            state.isOpenModalAsignar = payload ;
        },
        setOpenModalVerPdf: ( state, {payload} ) => {
            state.isOpenModalVerPdf = payload ;
        },
        setArchivosDropbox: ( state, {payload} ) => {
            state.archivosDropbox = payload;
        },
        setIsLoadingDropbox: ( state, {payload} ) => {
            state.isLoadingDropbox = payload ;
        },
        setIsLoadingAsignarPdf: ( state, {payload} ) => {
            state.isLoadingAsignarPdf = payload ;
        },
        setIsLoadingQuitarPdf: ( state, {payload} ) => {
            state.isLoadingQuitarPdf = payload ;
        },
        setCarpetasConPdf: ( state, {payload} ) => {
            state.carpetasConPdf = payload ;
        },
        setCarpetasSinPdf: ( state, {payload} ) => {
            state.carpetasSinPdf = payload ;
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
    setOpenModalMoverCarpeta,
    setOpenModalAsignar,
    setArchivosDropbox,
    setIsLoadingDropbox,
    setIsLoadingAsignarPdf,
    setIsLoadingQuitarPdf,
    setOpenModalVerPdf,
    setCarpetasConPdf,
    setCarpetasSinPdf
} = carpetaSlice.actions;
