import { useDispatch, useSelector } from 'react-redux';
import { indetechApi } from '../api';
import { convertVigenciasToSelect } from '../helpers';
import { onLoadVigencias, isLoadingVigencias, isSuccessVigencias, setVigenciaActiva } from '../store';

export const useVigenciaStore = () => {
  
    const dispatch = useDispatch();
    const { vigencias, isLoadingVigencia, isSuccessVigencia, vigenciaActiva } = useSelector( state => state.vigencia );
    

    const startLoadingVigencias = async() => {
       
        try 
        {
            dispatch( isLoadingVigencias( true ) );
            
            const { data } = await indetechApi.get('/Vigencia');
            
            const dataForSelect = convertVigenciasToSelect(data.vigencias);

            dispatch( onLoadVigencias( dataForSelect ) );

        } catch (error) 
        {
            console.log(error)
            dispatch( isSuccessVigencias( false ) );
            dispatch( isLoadingVigencias( false ) );
        }
    }
    
    const setVigenciaSelected = (vigencia) => {
        dispatch( setVigenciaActiva( vigencia ) );
    }

    return {
        //* Propiedades
        vigencias,
        isLoadingVigencia,
        isSuccessVigencia,
        vigenciaActiva,

        //* Métodos
        startLoadingVigencias,
        setVigenciaSelected
    }
}
