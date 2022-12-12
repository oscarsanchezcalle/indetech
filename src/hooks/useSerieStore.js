import { useDispatch, useSelector } from 'react-redux';
import { indetechApi } from '../api';
import { convertSeriesToSelect } from '../helpers';
import { onLoadSeries, isLoadingSeries, isSuccessSeries, resetSeries } from '../store';

export const useSerieStore = () => {
  
    const dispatch = useDispatch();
    const { series, isLoadingSerie, isSuccessSerie } = useSelector( state => state.serie );
    

    const startLoadingSeries = async(id) => {
       
        try 
        {
            dispatch( isLoadingSeries( true ) );
            
            const { data } = await indetechApi.get('/Serie/GetSeriesByOficinaProductoraID?id='+id);
                        
            const seriesForSelect = convertSeriesToSelect(data);

            dispatch( onLoadSeries( seriesForSelect ) );  // cierra el loader tambien

        } catch (error) 
        {
            dispatch( isSuccessSeries( false ) );
            dispatch( isLoadingSeries( false ) );

        }
    }

    const resetSerie = async() => {
        dispatch( resetSeries() );
    }
    
    return {
        //* Propiedades
        series,
        isLoadingSerie,
        isSuccessSerie,

        //* Métodos
        startLoadingSeries,
        resetSerie
    }
}
