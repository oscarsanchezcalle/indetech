import { createSlice } from '@reduxjs/toolkit';

export const formularioSlice = createSlice({
    name: 'formulario',
    initialState:{
        fuid: {
            proyectoId: 0,
            dependenciaId: 0,
            oficinaId: 0,
            cajaId:0,
            serieId:0,
            subserieId:0,
            tipoDocumentoId:0,
            fechaInicial: '',
            fechaFinal: '',
            tomoInicial: 0,
            tomoFinal: 0,
            folios:0,
            soporteId:0,
            frecuenciaId:0,
            notas:''
        },
    },
    reducers: {
        setProyectoId: (state, { payload }) => {
            state.fuid.proyectoId = payload;
        },
        setDependenciaId: (state, { payload }) => {
            state.fuid.dependenciaId = payload;
        },
        setOficnaId: (state, { payload }) => {
            state.fuid.oficinaId = payload;
        },
        setCajaId: (state, { payload }) => {
            state.fuid.cajaId = payload;
        },
        setSerieId: (state, { payload }) => {
            state.fuid.serieId = payload;
        },
        setSubserieId: (state, { payload }) => {
            state.fuid.subserieId = payload;
        },
        setTipoDocumentoId: (state, { payload }) => {
            state.fuid.tipoDocumentoId = payload;
        },
        setFechaInicial: (state, { payload }) => {
            state.fuid.fechaInicial = payload;
        },
        setFechaFinal: (state, { payload }) => {
            state.fuid.fechaFinal = payload;
        },
        setFolios: (state, { payload }) => {
            state.fuid.cajaId = payload;
        },
        setSoporteId: (state, { payload }) => {
            state.fuid.soporteId = payload;
        },
        resetForm: (state) => {
            state.fuid = {
                proyectoId: 0,
                dependenciaId: 0,
                oficinaId: 0,
                cajaId:0,
                serieId:0,
                subserieId:0,
                tipoDocumentoId:0,
                fechaInicial: '',
                fechaFinal: '',
                tomoInicial: 0,
                tomoFinal: 0,
                folios:0,
                soporteId:0,
                frecuenciaId:0,
                notas:''
            };
        }
    }
});

// Action creators are generated for each case reducer function
export const {
    setProyectoId,
    setDependenciaId,
    setOficinaId,
    setCajaId,
    setSerieId,
    setSubserieId,
    setTipoDocumentoId,
    setFechaInicial,
    setFechaFinal,
    setTomoInicial,
    setTomoFinal,
    setFolios,
    setSoporteId,
    setFrecuenciaId,
    setNotas,
    resetForm
} = formularioSlice.actions;
