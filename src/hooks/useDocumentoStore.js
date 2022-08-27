import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { isAfter, getYear, parseISO } from 'date-fns'

import { indetechApi } from '../api';

import { 
    setListaDocumento,
    setIsLoadingDocumentosByCarpeta,
    setIsLoadingAddDocumento,
    setIsLoadingDeleteDocumento,
    setIsLoadingEditDocumento,
    setDocumentoActivo,
    setIsOpenModalEditarDocumento } from '../store';

export const useDocumentoStore = () => {
  
    const dispatch = useDispatch();

    const {
        isLoadingDocumentosByCarpeta,
        isLoadingAddDocumento,
        isLoadingDeleteDocumento,
        isLoadingEditDocumento,
        documentos,
        documentoActivo,
        isOpenModalEditarDocumento
     } = useSelector( state => state.documento );

    const crearDocumento = async (criteria = {}, proyectoId, username ) => {
        
        dispatch(isLoadingAddDocumento(true));

        try
        {
            const {
                dependencia, oficina, vigencia, numeroCaja, serie, subserie, tipoDocumento,
                tipoSoporte, frecuenciaUso,  fechaExtremaFinal, fechaExtremaInicial, tomoActual, tomoFinal,
                folioInicial, folioFinal, codigo, notas, cedulaCatastral, duplicidad, autoDeCierre 
            } = criteria;

            const fechaIni = new Date(parseISO(fechaExtremaInicial));

            const fechaFin = new Date(parseISO(fechaExtremaFinal));
            
            const anioFechaIni = getYear(fechaIni);

            if((fechaExtremaInicial != '' && fechaExtremaFinal != '') ){
                if(isAfter(fechaIni, fechaFin) || anioFechaIni != parseInt(vigencia.label) ){

                    Swal.fire({
                        //position: 'top-end',
                        icon: 'error',
                        title: 'Rango de fechas incorrecto',
                        text: `Por favor verifica las fechas extremas`,
                        showConfirmButton: true,
                        //timer: 1500
                    });
    
                    dispatch(setIsLoadingAddCarpeta(false));
                    return;
                }
            }
            
            const carpetaCajaCriteria = {
                "proyectoId": proyectoId,
                "dependenciaId": dependencia.value,
                "oficinaId": oficina.value,
                "numeroCaja": parseInt(numeroCaja),
                "serieId": serie.value,
                "subserieId": subserie.value,
                "tipoDocumentoId": 1,
                "fechaInicial": fechaExtremaInicial === '' ? '0001-01-01' : fechaExtremaInicial,
                "fechaFinal": fechaExtremaFinal === '' ? '0001-01-01' : fechaExtremaFinal,
                "tomoActual": tomoActual == "" ? 0 : tomoActual,
                "tomoFinal": tomoFinal == "" ? 0 : tomoFinal,
                "folioInicial": folioInicial == "" ? 0 : folioInicial,
                "folioFinal": folioFinal == "" ? 0 : folioFinal,
                "codigo": codigo,
                "tipoSoporteId": tipoSoporte.value === 'undefined' ? 0 : tipoSoporte.value,
                "frecuenciaUsoId": frecuenciaUso.value === 'undefined' ? 0 : frecuenciaUso.value,
                "notas": notas,
                "vigenciaId": vigencia.value,
                "cedulaCatastral": cedulaCatastral,
                "duplicidad": duplicidad == "" ? 0 : duplicidad,
                "autoDeCierre": autoDeCierre.value === 1 ? true : false,
                "Username": username
            }

            //llamar al end point que crea las carpetas y las asigna a la caja
            const {data} = await indetechApi.post('/Carpeta/AgregarCarpetaACaja', carpetaCajaCriteria);
            
            //Actualizar la tabla de las carpetas by Caja.
            getCarpetasByCajaId(data.cajaId);

            dispatch(isLoadingAddDocumento(false));

            Swal.fire({
                //position: 'top-end',
                icon: 'success',
                title: 'Registro correcto',
                text: ``,
                showConfirmButton: true,
                timer: 1500
            });
        }
        catch(error)
        {
            dispatch(isLoadingAddDocumento(false));

            console.log(error);
            Swal.fire({
                //position: 'top-end',
                icon: 'error',
                title: 'Error de conexión al servidor',
                text: `Por favor intente nuevamente`,
                showConfirmButton: true,
                //timer: 1500
            });
        }
    }
  
    const getDocumentosByCarpetaId = async (carpetaId) => {
        
        try {

            dispatch( isLoadingDocumentosByCarpeta(true) );
            const { data } = await indetechApi.get('/documento/GetdocumentosByCarpetaID?id='+carpetaId);            
            
            dispatch( setListaDocumento( data ) );

            dispatch( isLoadingDocumentosByCarpeta(false) );

        } catch (error) {

           dispatch( isLoadingDocumentosByCarpeta(true) );
           console.log(error)
        }
    }

    const clearDocumentosByCarpetaId = () => {
        dispatch( setListaDocumento( [] ) );
    }

    const deleteDocumentoById = async (documentoId, username) => {

        dispatch( setIsLoadingDeleteDocumento(true) );

        try {
            
            await indetechApi.delete('/Documento?id='+documentoId+'&username='+username); 
            
            Swal.fire({
                //position: 'top-end',
                icon: 'success',
                title: 'Operación exitosa!',
                text: `El Documento fue eliminado`,
                showConfirmButton: true,
                timer: 1000
            });

            dispatch( setIsLoadingDeleteDocumento('deleted') );

        } catch (error) {
          console.log('Error eliminando la carpeta'+ carpetaId);
          console.log(error)
        }
    }

    const openModalEditarDocumento = (documento) => {

        dispatch( setDocumentoActivo(documento) );
        dispatch( setOpenModalEditarDocumento(true) );
    }

    const closeModalEditarDocumento = () => {

        dispatch( setDocumentoActivo({}) );
        dispatch( setOpenModalEditarDocumento(false) );
    }

    return {
        //* Propiedades
        isLoadingDocumentosByCarpeta,
        isLoadingAddDocumento,
        isLoadingDeleteDocumento,
        isLoadingEditDocumento,
        documentos,
        documentoActivo,
        isOpenModalEditarDocumento,

        //* Métodos
        crearDocumento, 
        getDocumentosByCarpetaId,
        deleteDocumentoById,
        clearDocumentosByCarpetaId,
        openModalEditarDocumento,
        closeModalEditarDocumento,
        
    }
}
