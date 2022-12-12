import { useDispatch, useSelector } from 'react-redux';
import { indetechApi } from '../api';
import { convertDepartamentosToSelect } from '../helpers';
import { onLoadDepartamentos, isLoadingDepartamentos, isSuccessDepartamentos, resetDepartamentos } from '../store';

export const useDepartamentoStore = () => {
  
    const dispatch = useDispatch();
    const { departamentos, isLoadingDepartamento } = useSelector( state => state.departamento );
    

    const startLoadingDepartamentos = async() => {
       
        try 
        {
            dispatch( isLoadingDepartamentos( true ) );
            
            const { data } = await indetechApi.get('/Departamentos');
                        
            const departamentosForSelect = convertDepartamentosToSelect(data);

            dispatch( onLoadDepartamentos( departamentosForSelect ) );

            dispatch( isLoadingDepartamentos( false ) );

        } catch (error) 
        {
            dispatch( isLoadingDepartamentos( false ) );

        }
    }

    const resetDepartamentos = async() => {
        dispatch( resetDepartamentos() );
    }
    
    return {
        //* Propiedades
        departamentos,
        isLoadingDepartamento,

        //* Métodos
        startLoadingDepartamentos,
        resetDepartamentos
    }
}
