import { configureStore } from "@reduxjs/toolkit";
import { carpetaSlice } from "./";

export const store = configureStore({
    reducer: {
        carpeta: carpetaSlice.reducer 
    }
})