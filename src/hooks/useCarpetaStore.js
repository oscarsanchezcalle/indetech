import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { format } from 'date-fns'

import { indetechApi } from '../api';
import { onLoadCarpetas, onLoadCarpetasByCaja } from '../store';
import { useAuthStore } from './';

export const useCarpetaStore = () => {
  
    const dispatch = useDispatch();

    const { proyectoId } = useAuthStore();    

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

    const crearCarpeta = async (criteria = {} ) => {

        //Todo: Implementar Loading
        console.log(criteria);
        return;
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

        const {dependecia, subDependencia, numeroCaja, serie, subserie, tipoDocumento, fechaExtremaFinal,  fechaExtremaInicial, 
            frecuencia, notas, soporte, tomoActual, tomoFinal, folioInicial, folioFinal, codigo } = criteria;


            
        //llamar al end point que crea las carpetas y las asigna a la caja
        // const {data} = await indetechApi.post('/Carpeta/AgregarCarpetaACaja', {            
        //     "numeroCaja": numeroCaja,
        //     "proyectoId": proyectoId,
        //     "dependenciaId": dependecia,
        //     "oficinaId": subDependencia              
        // }).catch(function (error) {

        //     Swal.fire({
        //         //position: 'top-end',
        //         icon: 'error',
        //         title: 'Error de conexión al servidor',
        //         text: `Por favor intente nuevamente`,
        //         showConfirmButton: true,
        //         //timer: 1500
        //     });

        //     console.log(error.response);
        //     return;
        // });    
        
        // const cajas = data.cajas;
        
        // Actualizar la tabla de las carpetas by Caja.
        //getCarpetasByCajaId(data.cajaId);

    }

    const isValidFormForSave = (criteria = {}) => {

        const {dependeciaId, subDependenciaId, numeroCaja, serieId, subserieId, tipoDocumentoId } = criteria;

        const validationConditions = [];
        let isValid = true;

        if (    typeof dependeciaId === 'undefined' || typeof subDependenciaId === 'undefined'
             || (typeof numeroCaja === 'undefined' || numeroCaja == "" ) || typeof serieId === 'undefined'
             || typeof subserieId   === 'undefined' || typeof tipoDocumentoId === 'undefined')
        {            
            if(typeof dependeciaId === 'undefined'){
                validationConditions.push(' Dependencia');
            }
            if(typeof subDependenciaId === 'undefined'){
                validationConditions.push(' Sub Dependencia');
            }
            if(typeof numeroCaja === 'undefined' || numeroCaja == ""){
                validationConditions.push(' Número de Caja');
            }
            if(typeof serieId === 'undefined'){
                validationConditions.push(' Serie');
            }
            if(typeof subserieId === 'undefined'){
                validationConditions.push(' Subserie');
            }
            if(typeof tipoDocumentoId === 'undefined'){
                validationConditions.push(' Tipo Documental');
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
