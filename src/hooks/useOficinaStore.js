import { useDispatch, useSelector } from 'react-redux';
import { indetechApi } from '../api';
import { convertOficinasToSelect } from '../helpers';
import { onLoadOficinas, isLoadingOficinas, isSuccessOficinas, resetOficinas } from '../store';

export const useOficinaStore = () => {
  
    const dispatch = useDispatch();
    const { oficinas, isLoadingOficina, isSuccessOficina } = useSelector( state => state.oficina );
    

    const startLoadingOficinas = async(id) => {
       
        try 
        {
            dispatch( isLoadingOficinas( true ) );
            
            const { data } = await indetechApi.get('/Oficina/GetOficinasProductorasByDependenciaID?id='+id);
             
            const oficinasForSelect = convertOficinasToSelect(data);

            dispatch( onLoadOficinas( oficinasForSelect ) );
            
        } catch (error) 
        {
            console.log(error)
            dispatch( isSuccessOficinas( false ) );
            dispatch( isLoadingOficinas( false ) );
        }
    }

    const resetOficina = async() => {
        dispatch( resetOficinas() );
    }
    
    return {
        //* Propiedades
        oficinas,
        isLoadingOficina,
        isSuccessOficina,

        //* Métodos
        startLoadingOficinas,
        resetOficina
    }
}
