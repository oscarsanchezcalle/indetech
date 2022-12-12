import { useDispatch, useSelector } from 'react-redux';
import { indetechApi } from '../api';
import { convertDependenciasToSelect } from '../helpers';
import { 
            onLoadDependiencias, isLoadingDependencias, isSuccessDependencias,
            setDependenciaActiva
       } from '../store';

export const useDependieciaStore = () => {
  
    const dispatch = useDispatch();
    const { dependencias, isLoadingDependencia, isSuccessDependencia, dependenciaActiva } = useSelector( state => state.dependencia );
    

    const startLoadingDependencias = async(id) => {
        try 
        {
            dispatch( isSuccessDependencias( true ) );
            dispatch( isLoadingDependencias( true ) );
            
            const { data } = await indetechApi.get('/Dependencia/GetDependenciasByProyectoID?id='+id);
            
            const dependeciasForSelect = convertDependenciasToSelect(data);
            
            dispatch( onLoadDependiencias( dependeciasForSelect ) ); // cierra el loader tambien

        } catch (error) 
        {
            dispatch( isSuccessDependencias( false ) );
            console.log(error);
        }
    }

    const setDependenciaSelected = (dependencia) => {
        dispatch( setDependenciaActiva( dependencia ) );
    }
    
    return {
        //* Propiedades
        dependencias,
        isLoadingDependencia,
        isSuccessDependencia,
        dependenciaActiva,

        //* Métodos
        startLoadingDependencias,
        setDependenciaSelected
    }
}
