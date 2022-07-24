import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import { indetechApi } from '../api';
import { onLoadCarpetas, onLoadCarpetasByCaja } from '../store';

export const useCarpetaStore = () => {
  
    const dispatch = useDispatch();

    const { carpetas, carpetasByCajaId} = useSelector( state => state.carpeta );

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

        //Todo: Implementar Loading
        
        console.log(criteria);
        
        const {isValid, validationConditions} = isValidFormForSave(criteria);
        
        if (!isValid){

            Swal.fire({
                //position: 'top-end',
                icon: 'warning',
                title: 'Campos incompletos',
                text: `Los siguientes campos son obligatorios: ${String(validationConditions)}`,
                showConfirmButton: true,
                //timer: 1500
            });

            return;
        }

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
                "tipoDocumentoId": tipoDocumento.value,
                "fechaInicial": fechaExtremaInicial == '' ? '0001-01-01' : fechaExtremaInicial,
                "fechaFinal": fechaExtremaFinal == '' ? '0001-01-01' : fechaExtremaFinal,
                "tomoActual": tomoActual,
                "tomoFinal": tomoFinal,
                "folioInicial": folioInicial,
                "folioFinal": folioFinal,
                "codigo": codigo,
                "tipoSoporteId": tipoSoporte.value == 'undefined' ? 0 : tipoSoporte.value,
                "frecuenciaUsoId": frecuenciaUso.value == 'undefined' ? 0 : frecuenciaUso.value,
                "notas": notas,
                "vigenciaId": vigencia.value,
                "cedulaCatastral": cedulaCatastral,
                "duplicidad": duplicidad,
                "autoDeCierre": autoDeCierre.value == 1 ? true : false
            }

            console.log(carpetaCajaCriteria);
            

            //llamar al end point que crea las carpetas y las asigna a la caja
            const {data} = await indetechApi.post('/Carpeta/AgregarCarpetaACaja', carpetaCajaCriteria);
            
            //Actualizar la tabla de las carpetas by Caja.
            getCarpetasByCajaId(data.cajaId);

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

    const isValidFormForSave = (criteria = {}) => {

        const {
             dependencia, oficina, numeroCaja,
             serie, subserie, tipoDocumento, 
             autoDeCierre, vigencia } = criteria;

        const validationConditions = [];
        let isValid = true;

        if (     typeof dependencia.value == 'undefined' || typeof oficina.value == 'undefined'
             || (typeof numeroCaja == 'undefined' || numeroCaja == 0 ) || typeof serie.value == 'undefined'
             || typeof  subserie.value   == 'undefined' || typeof tipoDocumento.value == 'undefined'
             || typeof  autoDeCierre.value   == 'undefined' || typeof vigencia.value == 'undefined')
        {            
            if(typeof dependencia.value == 'undefined'){
                validationConditions.push(' Dependencia');
            }
            if(typeof oficina.value == 'undefined'){
                validationConditions.push(' Sub Dependencia');
            }
            if(typeof vigencia.value == 'undefined'){
                validationConditions.push(' Vigencia');
            }
            if(typeof numeroCaja == 'undefined' || numeroCaja == ""){
                validationConditions.push(' Número de Caja');
            }
            if(typeof serie.value == 'undefined'){
                validationConditions.push(' Serie');
            }
            if(typeof subserie.value == 'undefined'){
                validationConditions.push(' Subserie');
            }
            if(typeof tipoDocumento.value == 'undefined'){
                validationConditions.push(' Tipo Documental');
            }
            if(typeof autoDeCierre.value == 'undefined'){
                validationConditions.push(' Auto de cierre');
            }
            isValid = false;
        }
       
        return {
            isValid,
            validationConditions
        };            
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

    return {
        //* Propiedades
        carpetas,
        carpetasByCajaId,
        
        //* Métodos
        startLoadingCarpetas,
        crearCarpeta, 
        getCarpetasByCajaId
    }
}
