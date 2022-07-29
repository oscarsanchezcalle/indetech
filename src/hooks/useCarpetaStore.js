import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import { indetechApi } from '../api';
import { 
     onLoadCarpetas, onLoadCarpetasByCaja, setIsLoadingAddCarpeta,
     setIsDeletingCarpeta } from '../store';

export const useCarpetaStore = () => {
  
    const dispatch = useDispatch();

    const { carpetas, carpetasByCajaId, isLoadingAddCarpeta, isDeletingCarpeta } = useSelector( state => state.carpeta );

    const startLoadingCarpetas = async() => {

        try {

            const { data } = await indetechApi.get('/carpeta');
            
            // es un mapeo para formatear las fechas carpetas = convertEventsToDateEvents( data.eventos ); 
            console.log(data);
            //escribo en el store
            dispatch( onLoadCarpetas( data.carpetas ) );

        } catch (error) {
          console.log('Error cargando carpetas');
          console.log(error)
        }
    }

    const crearCarpeta = async (criteria = {}, proyectoId ) => {
        
        dispatch(setIsLoadingAddCarpeta(true));

        try
        {
            const {
                dependencia, oficina, vigencia, numeroCaja, serie, subserie, tipoDocumento,
                tipoSoporte, frecuenciaUso,  fechaExtremaFinal, fechaExtremaInicial, tomoActual, tomoFinal,
                folioInicial, folioFinal, codigo, notas, cedulaCatastral, duplicidad, autoDeCierre 
            } = criteria;

            const carpetaCajaCriteria = {
                "proyectoId": proyectoId,
                "dependenciaId": dependencia.value,
                "oficinaId": oficina.value,
                "numeroCaja": parseInt(numeroCaja),
                "serieId": serie.value,
                "subserieId": subserie.value,
                "tipoDocumentoId": 1,
                "fechaInicial": fechaExtremaInicial === '' ? '0001-01-01' : fechaExtremaInicial,
                "fechaFinal": fechaExtremaFinal === '' ? '0001-01-01' : fechaExtremaFinal,
                "tomoActual": tomoActual == "" ? 0 : tomoActual,
                "tomoFinal": tomoFinal == "" ? 0 : tomoFinal,
                "folioInicial": folioInicial == "" ? 0 : folioInicial,
                "folioFinal": folioFinal == "" ? 0 : folioFinal,
                "codigo": codigo,
                "tipoSoporteId": tipoSoporte.value === 'undefined' ? 0 : tipoSoporte.value,
                "frecuenciaUsoId": frecuenciaUso.value === 'undefined' ? 0 : frecuenciaUso.value,
                "notas": notas,
                "vigenciaId": vigencia.value,
                "cedulaCatastral": cedulaCatastral,
                "duplicidad": duplicidad == "" ? 0 : duplicidad,
                "autoDeCierre": false//autoDeCierre.value === 1 ? true : false
            }

            //llamar al end point que crea las carpetas y las asigna a la caja
            const {data} = await indetechApi.post('/Carpeta/AgregarCarpetaACaja', carpetaCajaCriteria);
            
            //Actualizar la tabla de las carpetas by Caja.
            getCarpetasByCajaId(data.cajaId);

            dispatch(setIsLoadingAddCarpeta(false));

            Swal.fire({
                //position: 'top-end',
                icon: 'success',
                title: 'Registro corecto',
                text: ``,
                showConfirmButton: true,
                //timer: 1500
            });
        }
        catch(error)
        {
            dispatch(setIsLoadingAddCarpeta(false));

            console.log(error);
            Swal.fire({
                //position: 'top-end',
                icon: 'error',
                title: 'Error de conexión al servidor',
                text: `Por favor intente nuevamente`,
                showConfirmButton: true,
                //timer: 1500
            });
        }
    }
    
    const getCarpetasByCajaId = async (cajaId) => {
        try {

            const { data } = await indetechApi.get('/carpeta/GetCarpetasByCajaID?id='+cajaId);            
            
            dispatch( onLoadCarpetasByCaja( data ) );


        } catch (error) {
          console.log('Error cargando carpetas de la caja'+ cajaId);
          console.log(error)
        }
    }

    const deleteCarpetaById = async (carpetaId) => {

        dispatch( setIsDeletingCarpeta('') );

        try {

            await indetechApi.delete('/carpeta/'+carpetaId); 
            
            dispatch( setIsDeletingCarpeta('deleted') );

        } catch (error) {
          console.log('Error eliminando la carpeta'+ carpetaId);
          console.log(error)
        }
    }

    return {
        //* Propiedades
        carpetas,
        carpetasByCajaId,
        isLoadingAddCarpeta,
        isDeletingCarpeta,
        
        //* Métodos
        crearCarpeta, 
        getCarpetasByCajaId,
        deleteCarpetaById
    }
}
