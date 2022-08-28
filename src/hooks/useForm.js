import { useState } from 'react';

export const useForm = ( initialState = {} ) => {
    
    const [values, setValues] = useState(initialState);

    const reset = (newFormState = initialState) => {
        setValues( newFormState );
    }

    const resetFuidForm = (frecuenciaUsoDefault, tipoSoporteDefualt) => {
     
        setValues({
            ...values, 
            fechaExtremaInicial: '', 
            fechaExtremaFinal: '',
            tomoActual: '',
            tomoFinal: '',
            folioInicial: '',
            folioFinal: '',
            codigo: '',
            notas: '',
            cedulaCatastral: '',
            duplicidad:'',
            autoDeCierre: {},
            tipoDocumento: {},
            frecuenciaUso: frecuenciaUsoDefault,
            tipoSoporte: tipoSoporteDefualt
        });
    }

    const setEditFuidForm = () => {
     //no eliminar este metodo, es utilizado en el editar.
    }

    const handleInputChange = ({ target }) => {

        setValues({
            ...values,
            [ target.name ]: target.value
        });
    }

    const handleSelectChange = ( selectedOption, fieldName ) => {   
        setValues({
            ...values,
            [ fieldName ]: selectedOption
        });
    }

    return [ values, 
        handleInputChange, 
        handleSelectChange, 
        resetFuidForm, 
        reset, 
        setEditFuidForm
         ];

}