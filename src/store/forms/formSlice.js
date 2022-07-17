import { createSlice } from '@reduxjs/toolkit';

export const formSlice = createSlice({
    name: 'form',
    initialState:{
        fuidForm: {},
    },
    reducers: {
        setFuidForm: (state, { payload = {} }) => {
            state.fuidForm = payload;
        },
        resetFuidForm: (state) => {
            state.fuidForm = {};
        }
    }
});

// Action creators are generated for each case reducer function
export const {
    setFuidForm,
    resetFuidForm
} = formSlice.actions;
