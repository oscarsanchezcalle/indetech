import { useDispatch, useSelector } from 'react-redux';
import { indetechApi } from '../api';
import { convertDependenciasToSelect } from '../helpers';
import { onLoadDependiencias, isLoadingDependencias, isSuccessDependencias } from '../store';

export const useDependieciaStore = () => {
  
    const dispatch = useDispatch();
    const { dependencias, isLoadingDependencia, isSuccessDependencia } = useSelector( state => state.dependencia );
    

    const startLoadingDependencias = async(id) => {
       
        try 
        {
            dispatch( isLoadingDependencias( true ) );
            
            const { data } = await indetechApi.get('/Dependencia/GetDependenciasByProyectoID?id='+id);
            
            const dependeciasForSelect = convertDependenciasToSelect(data);

            dispatch( onLoadDependiencias( dependeciasForSelect ) );

        } catch (error) 
        {
            dispatch( isSuccessDependencias( false ) );
            dispatch( isLoadingDependencias( false ) );

        }
    }
    
    return {
        //* Propiedades
        dependencias,
        isLoadingDependencia,
        isSuccessDependencia,

        //* Métodos
        startLoadingDependencias
    }
}
