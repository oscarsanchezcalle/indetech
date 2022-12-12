import { createSlice } from '@reduxjs/toolkit';

export const departamentoSlice = createSlice({
    
    name: 'departamento',
    initialState:{
        isLoadingDepartamento: true,
        departamentos: [
            // temp
        ],
    },
    reducers: {
        onLoadDepartamentos: (state, { payload = [] }) => {
            state.isLoadingSerie = false;
            state.departamentos = payload;
        },
        onAddNewDepartamento: ( state, { payload }) => {
            state.departamentos.push( payload );
        },
        isLoadingDepartamentos: (state, { payload }) => {
            state.isLoadingDepartamento = payload;
        },
        resetDepartamentos: (state) => {
            state.departamentos = [];
        },
    }
});

// Action creators are generated for each case reducer function
export const {
    onLoadDepartamentos,
    onAddNewDepartamento,
    isLoadingDepartamentos,
    resetDepartamentos
} = departamentoSlice.actions;
