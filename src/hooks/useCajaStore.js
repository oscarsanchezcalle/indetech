import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { indetechApi } from '../api';
import { convertCajasToSelect } from '../helpers';

import { onLoadCajas, onLoadRotuloCaja, setIsLoadingRotuloCaja, onLoadCarpetasByCaja } from '../store';

export const useCajaStore = () => {
  
    const dispatch = useDispatch();
    const { cajas, rotuloCaja, isLoadingRotuloCaja } = useSelector( state => state.caja );

    const startLoadingCajas = async(criteria) => {
       
        try {
           
            const { data } = await indetechApi.post('/caja/BuscarCajas', criteria);
            
            const cajasForSelect = convertCajasToSelect(data); 
            
            dispatch( onLoadCajas( cajasForSelect ) );

        } catch (error) {
          console.log('Error cargando cajas');
          console.log(error)
        }
    }

    const startLoadingCajasByProyecto = async(proyectoId) => {
       
        try {
           
            const { data } = await indetechApi.get('/caja/BuscarCajasPorProyecto?proyectoId='+proyectoId);
            
            const cajasForSelect = convertCajasToSelect(data); 
            
            dispatch( onLoadCajas( cajasForSelect ) );

        } catch (error) {
          console.log('Error cargando cajas');
          console.log(error)
        }
    }

    const buscarRotuloCaja = async(criteria = {}) => {
       
        try {
            setIsLoadingRotuloCaja(true);

            const { data } = await indetechApi.post('/Caja/BuscarRotuloCaja', criteria);
            
            dispatch( onLoadRotuloCaja( data ) );
            
            setIsLoadingRotuloCaja(false);

            if(data.cajaId === 0 ){
                Swal.fire({
                    //position: 'top-end',
                    icon: 'warning',
                    title: 'La caja no existe',
                    text: 'Por favor crear la caja para esta vigencia',
                    showConfirmButton: true,
                    //timer: 1500
                });
            }
            
        } catch (error) {
          setIsLoadingRotuloCaja(false);
          console.log('Error cargando rotulo de caja y carpetas');
          console.log(error)
        }
    }

    const buscarRotuloCajaById = async(cajaId) => {
       
        try {
            setIsLoadingRotuloCaja(true);

            const { data } = await indetechApi.get('/Caja/BuscarRotuloCaja/'+cajaId);
            
            dispatch( onLoadRotuloCaja( data ) );
            
            setIsLoadingRotuloCaja(false);

            if(data.cajaId === 0 ){
                Swal.fire({
                    //position: 'top-end',
                    icon: 'warning',
                    title: 'La caja no existe',
                    text: 'Por favor crear la caja para esta vigencia',
                    showConfirmButton: true,
                    //timer: 1500
                });
            }
            
        } catch (error) {

          setIsLoadingRotuloCaja(false);
          console.log('Error cargando rotulo de caja y carpetas');
          console.log(error)
        }
    }

    return {
        //* Propiedades
        cajas,
        rotuloCaja,
        isLoadingRotuloCaja,
        // events,
        // hasEventSelected: !!activeEvent,

        //* Métodos
        startLoadingCajas,
        buscarRotuloCaja,
        buscarRotuloCajaById,
        startLoadingCajasByProyecto
    }
}
