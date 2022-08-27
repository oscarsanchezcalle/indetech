import { configureStore } from "@reduxjs/toolkit";
import { 
          carpetaSlice, cajaSlice, oficinaSlice, serieSlice,
          subserieSlice, tipoDocumentoSlice, dependenciaSlice, authSlice, 
          vigenciaSlice, soporteSlice, frecuenciaSlice, documentoSlice
       } 
from "./";

export const store = configureStore({
    reducer: {
        oficina: oficinaSlice.reducer,
        serie: serieSlice.reducer,
        subserie: subserieSlice.reducer,
        tipoDocumento: tipoDocumentoSlice.reducer,
        dependencia: dependenciaSlice.reducer,
        caja: cajaSlice.reducer,
        carpeta: carpetaSlice.reducer,
        auth: authSlice.reducer,
        soporte: soporteSlice.reducer,
        frecuencia: frecuenciaSlice.reducer,
        vigencia: vigenciaSlice.reducer,
        documentoSlice: documentoSlice.reducer
    }
});