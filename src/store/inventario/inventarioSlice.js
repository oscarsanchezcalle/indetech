import { createSlice } from '@reduxjs/toolkit';

export const inventarioSlice = createSlice({
    name: 'inventario',
    initialState:{
        isLoadingGet: false,
        isLoadingAdd: false,
        isLoadingDelete: false,
        isLoadingUpdate: false,
        isLoadingDepartamentosFilter: false,       
        isLoadingNumeroResolucionFilter: false,
        isLoadingFechaResolucionFilter: false,
        isLoadingNumeroCajaFilter: false,
        isLoadingSerieSubserieFilter: false,
        isLoadingNombrePredioFilter: false,
        isLoadingNombrePersonaFilter: false,
        isLoadingDocumentoIdentificacionFilter: false,
        isLoadingNumeroMatriculaFilter: false,
        registros: [
            // tempRegistros
        ],
        registroActivo: {},
        isOpenModalEditar: false,
        tipoOrigen: 4,
        departamentosFilter: [],
        numeroResolucionFilter: [],
        fechaResolucionFilter: [],
        numeroCajaFilter: [],
        serieSubserieFilter: [],
        nombrePredioFilter: [],
        nombrePersonaFilter: [],
        documentoIdentificacionFilter: [],
        numeroMatriculaFilter: []
    },
    reducers: {
        setGetDepartamentosFilter: ( state, {payload} ) => {
            state.departamentosFilter = payload ;
        },
        setGetNumeroResolucionFilter: ( state, {payload} ) => {
            state.numeroResolucionFilter = payload ;
        },
        setGetFechaResolucionFilter: ( state, {payload} ) => {
            state.fechaResolucionFilter = payload ;
        },
        setGetNumeroCajaFilter: ( state, {payload} ) => {
            state.numeroCajaFilter = payload ;
        },
        setGetSerieSubserieFilter: ( state, {payload} ) => {
            state.serieSubserieFilter = payload ;
        },
        setGetNombrePredioFilter: ( state, {payload} ) => {
            state.nombrePredioFilter = payload ;
        },
        setGetNombrePersonaFilter: ( state, {payload} ) => {
            state.nombrePersonaFilter = payload ;
        },
        setGetDocumentoIdentificacionFilter: ( state, {payload} ) => {
            state.documentoIdentificacionFilter = payload ;
        },
        setGetNumeroMatriculaFilter: ( state, {payload} ) => {
            state.numeroMatriculaFilter = payload ;
        },
        setIsLoadingDepartamentosFilter: ( state, {payload} ) => {
            state.isLoadingDepartamentosFilter = payload ;
        },
        setIsLoadingNumeroResolucionFilter: ( state, {payload} ) => {
            state.isLoadingNumeroResolucionFilter = payload ;
        },
        setIsLoadingFechaResolucionFilter: ( state, {payload} ) => {
            state.isLoadingFechaResolucionFilter = payload ;
        },
        setIsLoadingNumeroCajaFilter: ( state, {payload} ) => {
            state.isLoadingNumeroCajaFilter = payload ;
        },
        setIsLoadingSerieSubserieFilter: ( state, {payload} ) => {
            state.isLoadingSerieSubserieFilter = payload ;
        },
        setIsLoadingNombrePredioFilter: ( state, {payload} ) => {
            state.isLoadingNombrePredioFilter = payload ;
        },
        setIsLoadingNombrePersonaFilter: ( state, {payload} ) => {
            state.isLoadingNombrePersonaFilter = payload ;
        },
        setIsLoadingDocumentoIdentificacionFilter: ( state, {payload} ) => {
            state.isLoadingDocumentoIdentificacionFilter = payload ;
        },
        setIsLoadingNumeroMatriculaFilter: ( state, {payload} ) => {
            state.isLoadingNumeroMatriculaFilter = payload ;
        },
        onGetInventario: (state, { payload = [] }) => {
            state.isLoadingGet = false;
            state.registros = payload;
        },
        setIsLoadingGetInventario: ( state, {payload} ) => {
            state.isLoadingGet = payload ;
        },
        setIsLoadingAddInventario: ( state, {payload} ) => {
            state.isLoadingAdd = payload ;
        },
        setIsLoadingDeleteInventario: ( state, {payload} ) => {
            state.isLoadingDelete = payload ;
        },
        setIsLoadingUpdateInventario: ( state, {payload} ) => {
            state.isLoadingUpdate = payload ;
        },
        setRegistroActivoInventario: ( state, {payload} ) => {
            state.registroActivo = payload ;
        },
        setTipoOrigenInventario: ( state, {payload} ) => {
            state.tipoOrigen = payload ;
        },
        setOpenModalEditarInventario: ( state, {payload} ) => {
            state.isOpenModalEditar = payload ;
        }
    }
});

// Action creators are generated for each case reducer function
export const {
    onGetInventario,
    setIsLoadingGetInventario,
    setIsLoadingAddInventario,
    setIsLoadingDeleteInventario,
    setIsLoadingUpdateInventario,
    registroActivoInventario,
    setTipoOrigenInventario,
    setOpenModalEditarInventario,
    setGetDepartamentosFilter,
    setGetNumeroResolucionFilter,
    setGetFechaResolucionFilter,
    setGetNumeroCajaFilter,
    setGetSerieSubserieFilter,
    setGetNombrePredioFilter,
    setGetNombrePersonaFilter,
    setGetDocumentoIdentificacionFilter,
    setGetNumeroMatriculaFilter,
    setIsLoadingDepartamentosFilter,
    setIsLoadingNumeroResolucionFilter,
    setIsLoadingFechaResolucionFilter,
    setIsLoadingNumeroCajaFilter,
    setIsLoadingSerieSubserieFilter,
    setIsLoadingNombrePredioFilter,
    setIsLoadingNombrePersonaFilter,
    setIsLoadingDocumentoIdentificacionFilter,
    setIsLoadingNumeroMatriculaFilter
} = inventarioSlice.actions;
