import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { isAfter, isBefore, getYear, parseISO, format } from 'date-fns'

import { indetechApi } from '../api';

import { 
    setListaDocumento,
    setIsLoadingDocumentosByCarpeta,
    setIsLoadingAddDocumento,
    setIsLoadingDeleteDocumento,
    setIsLoadingEditDocumento,
    setDocumentoActivo,
    setOpenModalEditarDocumento } from '../store';

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

    const crearDocumento = async (criteria = {}, proyectoId, username, carpetaFechaIni, carpetaFechaFin, carpetaId ) => {
        
        dispatch(setIsLoadingAddDocumento(true));

        try
        {
        const {
            tipoDocumento,
            folioInicial,
            folioFinal,
            folios,
            notas,
            fecha
        } = criteria;

        const {isValid, validationConditions} = isValidForm(criteria, carpetaFechaIni, carpetaFechaFin);
    
        if (!isValid){

            Swal.fire({
                icon: 'warning',
                title: 'Campos incompletos',
                text: `Verifica los campos y/o errores: ${String(validationConditions)}`,
                showConfirmButton: true
            });
            dispatch(setIsLoadingAddDocumento(false));
            return false;
        }

        const documentoCriteria = {
            "tipoDocumentoId": tipoDocumento.value,
            "folioInicial": folioInicial === "" ? 0 : folioInicial,
            "foliofinal": folioFinal === "" ? 0: folioFinal,
            "folios": folios,
            "fecha": fecha,
            "observaciones": notas,
            "username": username,
            "carpetaId": carpetaId,
            "proyectoId": proyectoId
            }
        
            const {data} = await indetechApi.post('/documento', documentoCriteria);
        
            // Acualizar la tabla de las documentos by carpeta ir.
            await getDocumentosByCarpetaId(data.carpetaId);

            dispatch(setIsLoadingAddDocumento(false));

            Swal.fire({
                //position: 'top-end',
                icon: 'success',
                title: 'Registro correcto',
                text: ``,
                showConfirmButton: true,
                timer: 1500
            });
            return true;
        }
        catch(error)
        {
            dispatch(setIsLoadingAddDocumento(false));

            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error de conexión al servidor',
                text: `Por favor intente nuevamente`,
                showConfirmButton: true
            });
            return false;
        }
    }

    const getDocumentosByCarpetaId = async (carpetaId) => {
        
        try {

            dispatch( setIsLoadingDocumentosByCarpeta(true) );

            const { data } = await indetechApi.get('Documento/GetByCarpetaIdAsync?carpetaId='+carpetaId);            
            
            dispatch( setListaDocumento( data ) );

            dispatch( setIsLoadingDocumentosByCarpeta(false) );

        } catch (error) {

           dispatch( setIsLoadingDocumentosByCarpeta(true) );
           console.log(error)
        }
    }

    const clearDocumentosByCarpetaId = () => {
        dispatch( setListaDocumento( [] ) );
    }

    const deleteDocumentoById = async (documentoId, carpetaId, username) => {

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

            await getDocumentosByCarpetaId(carpetaId);

            dispatch( setIsLoadingDeleteDocumento(false) );

        } catch (error) {
          console.log(error)
          dispatch( setIsLoadingDeleteDocumento(false) );
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

    const isValidForm = (criteria = {}, carpFechaIni = "", carpFechaFin = "") => {
        
        const {
            tipoDocumento,
            folioInicial,
            folioFinal,
            folios,
            fecha,
            switchFolios } = criteria;

        const validationConditions = [];
        let isValid = true;

        if ( typeof tipoDocumento.value === 'undefined' || fecha === '') 
        {            
            if(typeof tipoDocumento.value === 'undefined' ){
                validationConditions.push(' Tipo Documental');
            }
            if(fecha === ''){
                validationConditions.push(' Fecha');
            }
            isValid = false;

            return {
                isValid,
                validationConditions
            }; 
        }

        const carpetaFechaIni = new Date(parseISO(carpFechaIni));
        const carpetaFechaFin = new Date(parseISO(carpFechaFin));
        const documentoFecha = new Date(parseISO(fecha));

        const anioCarpetaFechaIni = getYear(carpetaFechaIni);
        const anioCarpetaFechaFin = getYear(carpetaFechaFin);

        if((anioCarpetaFechaIni !== 1 && anioCarpetaFechaFin !== 1) ){
            if(isBefore(documentoFecha, carpetaFechaIni) || isAfter(documentoFecha, carpetaFechaFin) ){
                isValid = false;
                validationConditions.push(`La fecha del documento debe estar entre las fechas de la carpeta ${format(parseISO(carpFechaIni), 'dd/MM/yyyy')} - ${format(parseISO(carpFechaFin), 'dd/MM/yyyy')}`);
            }
        }

        if(switchFolios === false){
            if(folioInicial == '' || folioInicial == '0' || folioFinal == '' || folioFinal == '0'){
                validationConditions.push(' Rango de folios');
                isValid = false;
            }
        }

        if(switchFolios === true){
            if(folios == '' || folios == '0'){
                validationConditions.push(' total de folios');
                isValid = false;
            }
        }
       
        return {
            isValid,
            validationConditions
        };            
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
