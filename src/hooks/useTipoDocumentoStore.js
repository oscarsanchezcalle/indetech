import { useDispatch, useSelector } from 'react-redux';
import { indetechApi } from '../api';
import { convertTipoDocumentosToSelect } from '../helpers';
import { onLoadTipoDocumentos, isLoadingTipoDocumentos, isSuccessTipoDocumentos, resetTipoDocumentos } from '../store';

export const useTipoDocumentoStore = () => {
  
    const dispatch = useDispatch();
    const { tipoDocumentos, isLoadingTipoDocumento, isSuccessTipoDocumento } = useSelector( state => state.tipoDocumento );
    

    const startLoadingTipoDocumentos = async(id) => {
       
        try 
        {
            dispatch( isLoadingTipoDocumentos( true ) );
            
            const { data } = await indetechApi.get('/TipoDocumento/GetTipoDocumentoBySubserieID?id='+id);
            
            const tipoDocumentosForSelect = convertTipoDocumentosToSelect(data);

            dispatch( onLoadTipoDocumentos( tipoDocumentosForSelect ) );

        } catch (error) 
        {
            dispatch( isSuccessTipoDocumentos( false ) );
            dispatch( isLoadingTipoDocumentos( false ) );

        }
    }

    const resetTipoDocumento = async() => {
        dispatch( resetTipoDocumentos() );
    }
    
    return {
        //* Propiedades
        tipoDocumentos,
        isLoadingTipoDocumento,
        isSuccessTipoDocumento,

        //* Métodos
        startLoadingTipoDocumentos,
        resetTipoDocumento
    }
}
