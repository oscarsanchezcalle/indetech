import { useDispatch, useSelector } from 'react-redux';
import { carpetaApi } from '../api';
import { onLoadCarpetas } from '../store';

export const useCarpetaStore = () => {
  
    const dispatch = useDispatch();
    const { carpetas } = useSelector( state => state.carpeta );

    const startLoadingCarpetas = async() => {
        try {

            const { data } = await carpetaApi.get('/caja');
            //const { data } = await carpetaApi.post('/caja',{criteria1, criteria2});
            
            // es un mapeo para formatear las fechas carpetas = convertEventsToDateEvents( data.eventos ); 
            console.log(data);
            //escribo en el store
            dispatch( onLoadCarpetas( data.cajas ) );

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
