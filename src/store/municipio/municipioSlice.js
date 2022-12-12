import { createSlice } from '@reduxjs/toolkit';

export const municipioSlice = createSlice({
    
    name: 'municipio',
    initialState:{
        isLoadingMunicipio: false,
        municipios: [
            // temp
        ],
    },
    reducers: {
        onLoadMunicipios: (state, { payload = [] }) => {
            state.isLoadingMunicipio = false;
            state.municipios = payload;
        },
        onAddNewMunicipio: ( state, { payload }) => {
            state.municipios.push( payload );
        },
        isLoadingMunicipios: (state, { payload }) => {
            state.isLoadingMunicipio = payload;
        },
        resetMunicipios: (state) => {
            state.municipios = [];
        },
    }
});

// Action creators are generated for each case reducer function
export const {
    onLoadMunicipios,
    onAddNewMunicipio,
    isLoadingMunicipios,
    resetMunicipios
} = municipioSlice.actions;
