import { createSlice } from '@reduxjs/toolkit';

export const inventarioSlice = createSlice({
    name: 'inventario',
    initialState:{
        isLoadingGet: false,
        isLoadingAdd: false,
        isLoadingDelete: false,
        isLoadingUpdate: false,
        registros: [
            // tempRegistros
        ],
        registroActivo: {},
        isOpenModalEditar: false,
        tipoOrigen: 4
    },
    reducers: {
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
    setOpenModalEditarInventario
} = inventarioSlice.actions;
