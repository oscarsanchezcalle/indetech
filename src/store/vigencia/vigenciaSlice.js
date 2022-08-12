import { createSlice } from '@reduxjs/toolkit';

export const vigenciaSlice = createSlice({
    name: 'vigencia',
    initialState:{
        isLoadingVigencias: true,
        isSuccessVigencias: true,
        vigencias: [
            // temp
        ],
        vigenciaActiva:{

        }
    },
    reducers: {
        onLoadVigencias: (state, { payload = [] }) => {
            state.isLoadingVigencias = false;
            state.vigencias = payload;
        },
        onAddNewVigencia: ( state, { payload }) => {
            state.vigencias.push( payload );
        },
        isSuccessVigencias: (state, { payload }) => {
            state.isSuccessVigencias = payload;
        },
        isLoadingVigencias: (state, { payload }) => {
            state.isLoadingVigencias = payload;
        },
        setVigenciaActiva: (state, { payload }) => {
            state.vigenciaActiva = payload;
        },
    }
});

// Action creators are generated for each case reducer function
export const {
    onLoadVigencias,
    onAddNewVigencia,
    isSuccessVigencias,
    isLoadingVigencias,
    setVigenciaActiva
} = vigenciaSlice.actions;
