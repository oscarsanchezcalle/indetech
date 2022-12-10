import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { indetechApi } from '../api';

import { setIsLoadingAddInventario, 
         setIsLoadingUpdateInventario, 
         setIsLoadingDeleteInventario,
         setIsLoadingGetInventario,
         onGetInventario,
         setRegistroActivoInventario,
         setTipoOrigenInventario,
         setOpenModalEditarInventario } from '../store';

export const useInventarioStore = () => {
  
    const dispatch = useDispatch();
    const { isLoadingGet, isLoadingAdd, isLoadingDelete, isLoadingUpdate,
            registros, registroActivo, isOpenModalEditar, tipoOrigen 
          } = useSelector( state => state.inventario );

    const addRegistro = async (formData = {}, proyectoId, username ) => {

        dispatch(setIsLoadingAddInventario(true));

        try
        {
            const {
                dependencia, oficina, numeroCaja, numeroCarpeta, serie,
                subserie, departamento, municipio, numeroConsecutivo,
                nombre, nombrePredio, nombrePersona, documentoIdentificacion,
                numeroMatricula, numeroExpediente, fechaExpediente, numeroPlano,
                fechaInicial, fechaFinal, tipoDocumento, folios, notas, fechaRegistro 
            } = formData;

            const criteria = {
                "proyectoId": proyectoId,
                "dependenciaId": 0,
                "oficinaId": 0,
                "numeroCaja": 0,
                "numeroCarpeta": 0,
                "serieId": 0,
                "subserieId": 0,
                "departamentoId": 0,
                "municipioId": 0,
                "numeroConsecutivo": 0,
                "nombre": "string",
                "nombrePredio": "string",
                "nombrePersona": "string",
                "documentoIdentificacion": "string",
                "numeroMatricula": "string",
                "numeroExpediente": 0,
                "fechaExpediente": "2022-12-10T19:52:59.207Z",
                "numeroPlano": "string",
                "fechaInicial": "2022-12-10T19:52:59.207Z",
                "fechaFinal": "2022-12-10T19:52:59.207Z",
                "tipoDocumentoId": 0,
                "folios": 0,
                "notas": "string",
                "fechaRegistro": "2022-12-10T19:52:59.207Z",
                "usuarioId": username
            }

            //llamar al end point que crea el registro de inventario documental
            const {data} = await indetechApi.post('/InventarioDocumental', criteria);
            
            //Actualizar la tabla
            GetInventarioByCajaCarpeta(data.numeroCaja, data.numeroCarpeta);

            dispatch(setIsLoadingAddInventario(false));

            Swal.fire({
                icon: 'success',
                title: 'Registro correcto',
                text: '',
                showConfirmButton: true,
                timer: 1500
            });
        }
        catch(error)
        {
            dispatch(setIsLoadingAddInventario(false));

            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error de conexión al servidor',
                text: `Por favor intente nuevamente`,
                showConfirmButton: true
            });
        }
    }

    const GetInventarioByCajaCarpeta = async (numeroCaja, numeroCarpeta) => {
        
        try {
            dispatch(setIsLoadingGetInventario(true));

            const { data } = await indetechApi.get('/carpeta/GetInventarioByCajaCarpeta?numeroCaja='+numeroCaja+'&numeroCarpeta='+numeroCarpeta);            
            
            dispatch( onGetInventario( data ) );

            dispatch(setIsLoadingGetInventario(false));

        } catch (error) {
          
          dispatch(setIsLoadingAddInventario(false));

          console.log('Error cargando carpetas de la caja id'+ cajaId);
          console.log(error)
        }
    }

    const deleteRegistroById = async (registroId, numeroCaja, numeroCarpeta)  => {

        dispatch( setIsLoadingDeleteInventario(true) );

        try {
            
            await indetechApi.delete('/InventarioDocumental/'+registroId); 
            
            //Actualizar la tabla
            GetInventarioByCajaCarpeta(numeroCaja, numeroCarpeta);

            Swal.fire({
                //position: 'top-end',
                icon: 'success',
                title: 'Operación exitosa!',
                text: `El registro fue eliminado`,
                showConfirmButton: true,
                timer: 1000
            });

            dispatch( setIsLoadingDeleteInventario(false) );

        } catch (error) {

          dispatch( setIsLoadingDeleteInventario(false) );
          console.log('Error eliminando el registro id:'+ registroId);
          console.log(error)
        }
    }

    return {
        //* Propiedades
        registros,
       
        isLoadingAdd,
        isLoadingGet,
        isLoadingDelete,
        isLoadingUpdate,
        registroActivo,
        isOpenModalEditar,
        tipoOrigen,
       
        //* Métodos
        addRegistro,
        GetInventarioByCajaCarpeta,
        deleteRegistroById
    }
}
