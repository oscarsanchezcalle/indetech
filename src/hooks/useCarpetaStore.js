import { useDispatch, useSelector } from 'react-redux';
import { indetechApi } from '../api';
import { onLoadCarpetas } from '../store';

export const useCarpetaStore = () => {
  
    const dispatch = useDispatch();
    const { carpetas } = useSelector( state => state.carpeta );

    const startLoadingCarpetas = async() => {
        try {

            const { data } = await indetechApi.get('/carpeta');
            //const { data } = await carpetaApi.post('/caja',{criteria1, criteria2});
            
            // es un mapeo para formatear las fechas carpetas = convertEventsToDateEvents( data.eventos ); 
            console.log(data);
            //escribo en el store
            dispatch( onLoadCarpetas( data.carpetas ) );

        } catch (error) {
          console.log('Error cargando carpetas');
          console.log(error)
        }
    }
    
    return {
        //* Propiedades
        carpetas,
        // events,
        // hasEventSelected: !!activeEvent,

        //* Métodos
        startLoadingCarpetas
    }
}
