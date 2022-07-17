import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

export const useCarpetaService = () => {
  
    const dispatch = useDispatch();
    
    const crearCarpeta = (fuidForm = {}, addForm = {} ) => {
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


        //buscar la caja por numero
        console.log('grabo');

        // Grabo en las tablas
        // Reseteo el formulario
        // Actualizo el storage de carpetas filtradas        
    }

    const isValidFormForSave = (fuidForm = {}, addForm = {}) => {

        const {dependecia, subDependencia, numeroCaja } = fuidForm;        
        const {serie, subserie, tipoDocumento } = addForm;
        const validationConditions = [];
        let isValid = true;

        if (    typeof dependecia === 'undefined' || typeof subDependencia === 'undefined'
             || typeof numeroCaja === 'undefined' || typeof serie === 'undefined'
             || typeof subserie   === 'undefined' || typeof tipoDocumento === 'undefined')
        {            
            if(typeof dependecia === 'undefined'){
                validationConditions.push(' Dependencia');
            }
            if(typeof subDependencia === 'undefined'){
                validationConditions.push(' Sub Dependencia');
            }
            if(typeof numeroCaja === 'undefined'){
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

    return {
        //* Propiedades
        //carpetas,
        // events,
        // hasEventSelected: !!activeEvent,

        //* Métodos
        crearCarpeta
    }
}
