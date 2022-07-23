import { useDispatch, useSelector } from 'react-redux';
import { indetechApi } from '../api';
import { convertVigenciasToSelect } from '../helpers';
import { onLoadVigencias, isLoadingVigencias, isSuccessVigencias } from '../store';

export const useVigenciaStore = () => {
  
    const dispatch = useDispatch();
    const { vigencias, isLoadingVigencia, isSuccessVigencia } = useSelector( state => state.vigencia );
    

    const startLoadingVigencias = async() => {
       
        try 
        {
            dispatch( isLoadingVigencias( true ) );
            
            const { data } = await indetechApi.get('/Vigencia');
            
            const dataForSelect = convertVigenciasToSelect(data);

            dispatch( onLoadVigencias( dataForSelect ) );

        } catch (error) 
        {
            dispatch( isSuccessVigencias( false ) );
            dispatch( isLoadingVigencias( false ) );
        }
    }
    
    return {
        //* Propiedades
        vigencias,
        isLoadingVigencia,
        isSuccessVigencia,

        //* Métodos
        startLoadingVigencias
    }
}
