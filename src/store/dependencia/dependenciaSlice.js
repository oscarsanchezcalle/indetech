import { createSlice } from '@reduxjs/toolkit';

export const dependenciaSlice = createSlice({
    name: 'dependencia',
    initialState:{
        isLoadingDependencia: false,
        isSuccessDependencia: true,
        dependencias: [
            // temp
        ],
        dependenciaActiva:{

        }
    },
    reducers: {
        onLoadDependiencias: (state, { payload = [] }) => {
            state.isLoadingDependencia = false;
            state.dependencias = payload;
        },
        onAddNewDependiencia: ( state, { payload }) => {
            state.dependencias.push( payload );
        },
        isSuccessDependencias: (state, { payload }) => {
            state.isSuccessDependencia = payload;
        },
        isLoadingDependencias: (state, { payload }) => {
            state.isLoadingDependencia = payload;
        },
        setDependenciaActiva: (state, { payload }) => {
            state.dependenciaActiva = payload;
        },
    }
});

// Action creators are generated for each case reducer function
export const {
    onLoadDependiencias,
    onAddNewDependiencia,
    isSuccessDependencias,
    isLoadingDependencias,
    setDependenciaActiva
} = dependenciaSlice.actions;
