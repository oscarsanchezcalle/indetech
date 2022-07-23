import { useDispatch, useSelector } from 'react-redux';
import { indetechApi } from '../api';
import { convertSoportesToSelect } from '../helpers';
import { onLoadSoportes, isLoadingSoportes, isSuccessSoportes } from '../store';

export const useSoporteStore = () => {
  
    const dispatch = useDispatch();
    const { soportes, isLoadingSoporte, isSuccessSoporte } = useSelector( state => state.soporte );
    
    const startLoadingSoportes = async() => {
       
        try 
        {
            dispatch( isLoadingSoportes( true ) );
            
            const { data } = await indetechApi.get('/TipoSoporte');
            
            const dataForSelect = convertSoportesToSelect(data.tipoSoporte);

            dispatch( onLoadSoportes( dataForSelect ) );

        } catch (error) 
        {
            dispatch( isSuccessSoportes( false ) );
            dispatch( isLoadingSoportes( false ) );
        }
    }
    
    return {
        //* Propiedades
        soportes,
        isLoadingSoporte,
        isSuccessSoporte,

        //* Métodos
        startLoadingSoportes
    }
}
