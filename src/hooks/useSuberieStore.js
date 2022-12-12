import { useDispatch, useSelector } from 'react-redux';
import { indetechApi } from '../api';
import { convertSubseriesToSelect } from '../helpers';
import { onLoadSubseries, isLoadingSubseries, isSuccessSubseries, resetSubseries, onLoadSubseriesEdit } from '../store';

export const useSubserieStore = () => {
  
    const dispatch = useDispatch();
    const { subseries, isLoadingSubserie, isSuccessSubserie, subseriesEdit } = useSelector( state => state.subserie );
    

    const startLoadingSubseries = async(id) => {
       
        try 
        {
            dispatch( isLoadingSubseries( true ) );
            
            const { data } = await indetechApi.get('/Subserie/GetSubseriesBySerieID?id='+id);
            
            const subseriesForSelect = convertSubseriesToSelect(data);

            dispatch( onLoadSubseries( subseriesForSelect ) );  // cierra el loader tambien

        } catch (error) 
        {
            dispatch( isSuccessSubseries( false ) );
            dispatch( isLoadingSubseries( false ) );

        }
    }

    const startLoadingSubseriesEdit = async(id) => {
       
        try 
        {
            dispatch( isLoadingSubseries( true ) );
            
            const { data } = await indetechApi.get('/Subserie/GetSubseriesBySerieID?id='+id);
            
            const subseriesForSelect = convertSubseriesToSelect(data);

            dispatch( onLoadSubseriesEdit( subseriesForSelect ) );

        } catch (error) 
        {
            dispatch( isSuccessSubseries( false ) );
            dispatch( isLoadingSubseries( false ) );

        }
    }

    const resetSubserie = async() => {
        dispatch( resetSubseries() );
    }
    
    return {
        //* Propiedades
        subseries,
        subseriesEdit,
        isLoadingSubserie,
        isSuccessSubserie,

        //* Métodos
        startLoadingSubseries,
        resetSubserie,
        startLoadingSubseriesEdit
    }
}
