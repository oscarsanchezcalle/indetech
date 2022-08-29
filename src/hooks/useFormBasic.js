import { useState } from 'react';

export const useFormBasic = ( initialState = {} ) => {
    
    const [values, setValues] = useState(initialState);

    const reset = (newFormState = initialState) => {
        setValues( newFormState );
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
        reset
         ];

}