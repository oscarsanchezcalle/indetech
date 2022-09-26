import { useState } from 'react';

export const useFormSelects = ( initialState = {} ) => {
    
    const [values, setValues] = useState(initialState);

    const reset = (newFormState = initialState) => {
        setValues( newFormState );
    }

    const handleSelectChange = ( selectedOption, fieldName ) => {   
        setValues({
            ...values,
            [ fieldName ]: selectedOption
        });
    }

    const setFormValues = ( {newValues} ) => {   
        setValues({
            ...newValues
        });
    }

    return [ values, 
        handleSelectChange, 
        reset,
        setFormValues
    ];

}