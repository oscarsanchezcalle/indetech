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

    const crearCarpeta = async (fuidForm = {}, addForm = {} ) => {

        //Todo: Implementar Loading

        const {isValid, validationConditions} = isValidFormForSave(fuidForm, addForm);
        
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
        
        const {dependecia, subDependencia, numeroCaja } = fuidForm;  

        const {serie, subserie, tipoDocumento, fechaExtremaFinal,  fechaExtremaInicial, 
            frecuencia, notas, soporte, tomoActual, tomoFinal, folioInicial, folioFinal, codigo } = addForm;

            
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

    const isValidFormForSave = (fuidForm = {}, addForm = {}) => {

        const {dependecia, subDependencia, numeroCaja } = fuidForm;        
        const {serie, subserie, tipoDocumento } = addForm;
        const validationConditions = [];
        let isValid = true;

        if (    typeof dependecia === 'undefined' || typeof subDependencia === 'undefined'
             || (typeof numeroCaja === 'undefined' || numeroCaja == "" ) || typeof serie === 'undefined'
             || typeof subserie   === 'undefined' || typeof tipoDocumento === 'undefined')
        {            
            if(typeof dependecia === 'undefined'){
                validationConditions.push(' Dependencia');
            }
            if(typeof subDependencia === 'undefined'){
                validationConditions.push(' Sub Dependencia');
            }
            if(typeof numeroCaja === 'undefined' || numeroCaja == ""){
                validationConditions.push(' Número de Caja');
            }
            if(typeof serie === 'undefined'){
                validationConditions.push(' Serie');
            }
            if(typeof subserie === 'undefined'){
                validationConditions.push(' Subserie');
            }
            if(typeof tipoDocumento === 'undefined'){
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
