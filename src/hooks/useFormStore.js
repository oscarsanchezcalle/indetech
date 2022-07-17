import { useDispatch, useSelector } from 'react-redux';
import { setFuidForm, resetFuidForm } from '../store';

export const useFormStore = () => {
  
    const dispatch = useDispatch();
    const { fuidForm } = useSelector( state => state.form );
    
    const setFuidFormValues = async(payload = {}) => {
        dispatch( setFuidForm(payload) );
    }

    const resetFuidFormValues = async(payload = {}) => {
        dispatch( resetFuidForm(payload) );
    }

    return {
        //* Propiedades
        fuidForm,

        //* Métodos
        setFuidFormValues,
        resetFuidFormValues      
    }
}