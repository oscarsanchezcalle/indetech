import { createSlice } from '@reduxjs/toolkit';

export const cajaSlice = createSlice({
    name: 'caja',
    initialState:{
        isLoadingCajas: false,
        isLoadingRotuloCaja: false,
        cajas: [
            // temp
        ],
        rotuloCaja: {
            series:'',
            subseries:'',
            expedientes:'',
            numeroExpedientes:'',
            fechasExtremas:'',
            cajaId:0
        },
    },
    reducers: {
        onLoadCajas: (state, { payload = [] }) => {
            state.isLoadingCajas = false;
            state.cajas = payload;
        },
        onAddNewCaja: ( state, { payload }) => {
            state.cajas.push( payload );
        },
        setIsLoadingRotuloCaja: (state, { payload  }) => {
            state.isLoadingRotuloCaja = payload;
        },
        onLoadRotuloCaja: (state, { payload  }) => {
            state.rotuloCaja = payload;
        },
    }
});

// Action creators are generated for each case reducer function
export const {
    onLoadCajas,
    onAddNewCaja,
    setIsLoadingRotuloCaja,
    onLoadRotuloCaja
} = cajaSlice.actions;
