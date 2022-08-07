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
        isAuthenticated: false,
        identityId: '',
        isLoading: false
    },
    reducers: {
        onLoadAuth: (state, { payload }) => {
            state.persona = payload.persona;
            state.username = payload.username;
            state.rol = payload.rol;
            state.proyectoId = payload.proyectoId;
            state.proyecto = payload.proyecto;
            state.objetoContrato = payload.objetoContrato;
            state.identityId = payload.identityId;
            state.isLoading = false;
        },
        setIsAuthenticated: (state, { payload }) => {
            state.isAuthenticated = payload;
        },
        setIsLoading: (state, { payload }) => {
            state.isLoading = payload;
        }

    }
});

// Action creators are generated for each case reducer function
export const {
    onLoadAuth,
    setIsAuthenticated,
    setIsLoading
} = authSlice.actions;
