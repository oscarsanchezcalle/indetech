import { configureStore } from "@reduxjs/toolkit";
import { carpetaSlice, cajaSlice, oficinaSlice, serieSlice, subserieSlice, tipoDocumentalSlice, unidadSlice} from "./";

export const store = configureStore({
    reducer: {
        oficina: oficinaSlice.reducer,
        serie: serieSlice.reducer,
        subserie: subserieSlice.reducer,
        tipoDoumental: tipoDocumentalSlice.reducer,
        unidad: unidadSlice.reducer,
        caja: cajaSlice.reducer,
        carpeta: carpetaSlice.reducer,
    }
});