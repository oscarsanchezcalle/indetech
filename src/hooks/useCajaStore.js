import { useDispatch, useSelector } from 'react-redux';
import { indetechApi } from '../api';
import { onLoadCajas } from '../store';

export const useCajaStore = () => {
  
    const dispatch = useDispatch();
    const { cajas } = useSelector( state => state.caja );

    const startLoadingCajas = async() => {
       
        try {

            const { data } = await indetechApi.get('/caja');
            //const { data } = await carpetaApi.post('/caja',{criteria1, criteria2});
            
            console.log(data);
            //escribo en el store
            dispatch( onLoadCajas( data.cajas ) );

        } catch (error) {
          console.log('Error cargando cajas');
          console.log(error)
        }
    }
    
    return {
        //* Propiedades
        cajas,
        // events,
        // hasEventSelected: !!activeEvent,

        //* Métodos
        startLoadingCajas
    }
}
