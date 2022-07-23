import { useDispatch, useSelector } from 'react-redux';
import { indetechApi } from '../api';
import { convertFrecuenciasToSelect } from '../helpers';
import { onLoadFrecuencias, isLoadingFrecuencias, isSuccessFrecuencias } from '../store';

export const useFrecuenciaStore = () => {
  
    const dispatch = useDispatch();
    const { frecuencias, isLoadingFrecuencia, isSuccessFrecuencia } = useSelector( state => state.frecuencia );
    
    const startLoadingFrecuencias = async() => {
       
        try 
        {
            dispatch( isLoadingFrecuencias( true ) );
            
            const { data } = await indetechApi.get('/FrecuenciaUso');
            
            const dataForSelect = convertFrecuenciasToSelect(data.frecuenciaUso);

            dispatch( onLoadFrecuencias( dataForSelect ) );

        } catch (error) 
        {
            dispatch( isSuccessFrecuencias( false ) );
            dispatch( isLoadingFrecuencias( false ) );
            console.log(error);
        }
    }
    
    return {
        //* Propiedades
        frecuencias,
        isLoadingFrecuencia,
        isSuccessFrecuencia,

        //* Métodos
        startLoadingFrecuencias
    }
}
