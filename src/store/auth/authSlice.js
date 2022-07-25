import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState:{
        persona:'',
        username: '',
        rol: '',
        proyectoId: 0,
        proyecto:'',
        objetoContrato: '',
        authenticated: false
    },
    reducers: {
        onLoadAuth: (state, { payload }) => {
            state.persona = payload.persona;
            state.username = payload.username;
            state.rol = payload.rol;
            state.proyectoId = payload.proyectoId;
            state.proyecto = payload.proyecto;
            state.objetoContrato = payload.objetoContrato;
        },
        setIsAuthenticated: (state, { payload }) => {
            state.authenticated = payload;
        },
    }
});

// Action creators are generated for each case reducer function
export const {
    onLoadAuth,
    setIsAuthenticated
} = authSlice.actions;
