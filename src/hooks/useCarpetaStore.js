import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { isAfter, getYear, parseISO } from 'date-fns'

import { indetechApi } from '../api';
import { 
     onLoadCarpetasByCaja, setIsLoadingAddCarpeta, setIsLoadingAsignarPdf, setIsLoadingQuitarPdf,
     setIsDeletingCarpeta, setCarpetaActiva, setOpenModalMoverCarpeta,
     setOpenModalAsignar, setArchivosDropbox, setIsLoadingDropbox, setOpenModalVerPdf,
     setCarpetasConPdf, setCarpetasSinPdf, setIsLoadingBuscarEstadoAsignacionImagenes, setTipoOrigen } from '../store';

export const useCarpetaStore = () => {
  
    const dispatch = useDispatch();

    const {
         carpetas, carpetasByCajaId, isLoadingAddCarpeta, 
         isDeletingCarpeta, carpetaActiva, isOpenModalMoverCarpeta, 
         isOpenModalAsignar, isOpenModalVerPdf, archivosDropbox, isLoadingDropbox, 
         isLoadingAsignarPdf, isLoadingQuitarPdf, carpetasConPdf, carpetasSinPdf,
         isLoadingBuscarEstadoAsignacionImagenes,tipoOrigen
     } = useSelector( state => state.carpeta );


    const crearCarpeta = async (criteria = {}, proyectoId, username ) => {
        
        dispatch(setIsLoadingAddCarpeta(true));

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

            dispatch(setIsLoadingAddCarpeta(false));

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
            dispatch(setIsLoadingAddCarpeta(false));

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

    const crearCarpetaGobernacion = async (formValues = {}, proyectoId, username ) => {
        
        dispatch(setIsLoadingAddCarpeta(true));

        try
        {
            const {
                dependencia, oficina, numeroCaja, serie, subserie, fechaExtremaInicial, 
                fechaExtremaFinal,tomoActual,tomoFinal,folioInicial, folioFinal,codigo,notas,
                cedulaCatastral, duplicidad,cargo,fechaPosesion
            } = formValues;
             
            const createCriteria = 
            {
                "proyectoId": proyectoId,
                "numero": parseInt(numeroCaja),
                "dependenciaId": dependencia.value,
                "oficinaId": oficina.value,
                "serieId": serie.value,
                "subserieId": subserie.value,
                "codigo": codigo,
                "cedulaCatastral": cedulaCatastral,
                "cargo": cargo,
                "fechaPosesion": fechaPosesion,
                "fechaInicial": fechaExtremaInicial === '' ? '0001-01-01' : fechaExtremaInicial,
                "fechaFinal": fechaExtremaFinal === '' ? '0001-01-01' : fechaExtremaFinal,
                "folioInicial": folioInicial == "" ? 0 : folioInicial,
                "folioFinal": folioFinal == "" ? 0 : folioFinal,
                "duplicidad": duplicidad == "" ? 0 : duplicidad,
                "tomoActual": tomoActual == "" ? 0 : tomoActual,
                "tomoFinal": tomoFinal == "" ? 0 : tomoFinal,
                "fechaIndexacion": "2022-09-04T14:54:58.943Z",
                "fechaRegistro": "2022-09-04T14:54:58.943Z",
                "notas": notas,
                "Username": username
            }

            //llamar al end point que crea las carpetas y las asigna a la caja
            const {data} = await indetechApi.post('/Carpeta/gobernacion', createCriteria);
            
            //Actualizar la tabla de las carpetas by Caja.
            getCarpetasByCajaId(data.cajaId);

            dispatch(setIsLoadingAddCarpeta(false));

            Swal.fire({
                icon: 'success',
                title: 'Registro correcto',
                text: ``,
                showConfirmButton: true,
                timer: 1500
            });
        }
        catch(error)
        {
            dispatch(setIsLoadingAddCarpeta(false));

            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error de conexión al servidor',
                text: `Por favor intente nuevamente`,
                showConfirmButton: true,
            });
        }
    }

    const editarCarpeta = async (criteria = {}, cajaId, username) => {
        
        dispatch(setIsLoadingAddCarpeta(true));

        try
        {
            const {
                id, serie, subserie, tipoDocumento,
                tipoSoporte, frecuenciaUso,  fechaExtremaFinal, fechaExtremaInicial, tomoActual, tomoFinal,
                folioInicial, folioFinal, codigo, notas, cedulaCatastral, duplicidad, autoDeCierre, numeroCaja
            } = criteria;

            const fechaIni = new Date(parseISO(fechaExtremaInicial));

            const fechaFin = new Date(parseISO(fechaExtremaFinal));
            
            if(isAfter(fechaIni, fechaFin)){

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

            const updateCriteria = {
                "id": 0,
                "codigo": codigo,
                "folioInicial": folioInicial == "" ? 0 : folioInicial,
                "folioFinal": folioFinal == "" ? 0 : folioFinal,
                "descripcion": notas,
                "fechaInicial": fechaExtremaInicial === '' ? '0001-01-01' : fechaExtremaInicial,
                "fechaFinal": fechaExtremaFinal === '' ? '0001-01-01' : fechaExtremaFinal,
                "serieId": serie.value,
                "subserieId": subserie.value,
                "tipoDocumentoId": 1,
                "tipoSoporteId":  tipoSoporte.value === 'undefined' ? 0 : tipoSoporte.value,
                "frecuenciaUsoId":  frecuenciaUso.value === 'undefined' ? 0 : frecuenciaUso.value,
                "tomoInicial": tomoActual == "" ? 0 : tomoActual,
                "tomoFinal": tomoFinal == "" ? 0 : tomoFinal,
                "cedulaCatastral": cedulaCatastral,
                "duplicidad": duplicidad == "" ? 0 : duplicidad,
                "autoDeCierre": autoDeCierre.value === 1 ? true : false,
                "Username": username
            }

            await indetechApi.put('/Carpeta/'+id, updateCriteria);
            
            //Actualizar la tabla de las carpetas by Caja.
            getCarpetasByCajaId(cajaId);
            
            dispatch(setIsLoadingAddCarpeta(false));

            Swal.fire({
                //position: 'top-end',
                icon: 'success',
                title: 'Registro correcto',
                text: ``,
                showConfirmButton: true,
                timer: 1000
            });
        }
        catch(error)
        {
            dispatch(setIsLoadingAddCarpeta(false));

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
    
    const getCarpetasByCajaId = async (cajaId) => {
        
        try {

            const { data } = await indetechApi.get('/carpeta/GetCarpetasByCajaID?id='+cajaId);            
            
            dispatch( onLoadCarpetasByCaja( data ) );


        } catch (error) {
          console.log('Error cargando carpetas de la caja id'+ cajaId);
          console.log(error)
        }
    }

    const setCarpetasByCajaId = () => {
        dispatch( onLoadCarpetasByCaja( [] ) );
    }

    const deleteCarpetaById = async (carpetaId, username) => {

        dispatch( setIsDeletingCarpeta('') );

        try {
            
            await indetechApi.delete('/Carpeta?id='+carpetaId+'&username='+username); 
            
            Swal.fire({
                //position: 'top-end',
                icon: 'success',
                title: 'Operación exitosa!',
                text: `La carpeta fue eliminada`,
                showConfirmButton: true,
                timer: 1000
            });

            dispatch( setIsDeletingCarpeta('deleted') );

        } catch (error) {
          console.log('Error eliminando la carpeta'+ carpetaId);
          console.log(error)
        }
    }

    const moverCarpeta = async(moverCriteria) => {
       
        try {
            dispatch( setIsLoadingAddCarpeta(true) );
            await indetechApi.put('/Carpeta/MoverCarpeta', moverCriteria);
            
            getCarpetasByCajaId(moverCriteria.cajaIdActual);

            Swal.fire({
                //position: 'top-end',
                icon: 'success',
                title: 'Carpeta movida con éxito',
                text: 'La carpeta reposa en la caja indicada',
                showConfirmButton: true,
                //timer: 1500
            });
            
            dispatch( setIsLoadingAddCarpeta(false));

            return true;
            
        } catch (error) {
            Swal.fire({
                //position: 'top-end',
                icon: 'error',
                title: 'No se pudo mover la carpeta',
                text: 'Por favor intenta nuevamente',
                showConfirmButton: true,
                timer: 1500
            });

            dispatch( setIsLoadingAddCarpeta(false));
            console.log(error)
            return false;
        }
    }

    const openModalMoverCarpeta = (carpeta) => {

        dispatch( setCarpetaActiva(carpeta) );
        dispatch( setOpenModalMoverCarpeta(true) );
    }

    const closeModalMoverCarpeta = () => {

        dispatch( setCarpetaActiva({}) );
        dispatch( setOpenModalMoverCarpeta(false) );
    }

    const openModalAsignar = (carpeta) => {

        dispatch( setCarpetaActiva(carpeta) );
        dispatch( setOpenModalAsignar(true) );
    }

    const closeModalAsignar = () => {

        dispatch( setCarpetaActiva({}) );
        dispatch( setOpenModalAsignar(false) );
    }

    const openModalVerPdf = (carpeta) => {

        dispatch( setCarpetaActiva(carpeta) );
        dispatch( setOpenModalVerPdf(true) );
    }

    const closeModalVerPdf = () => {

        dispatch( setCarpetaActiva({}) );
        dispatch( setOpenModalVerPdf(false) );
    }

    const buscarArchivosDropbox = async (proyectoId, byPassSearchValidation) => {

        try 
        {
            //Si tengo datos de archivos en el store, no voy a dropbox.
            if('id' in archivosDropbox && !byPassSearchValidation){
                return;
            }

            dispatch( setIsLoadingDropbox(true) );
            
            const { data } = await indetechApi.get('/dropbox/'+proyectoId);            
            
            dispatch( setArchivosDropbox(data) );
            
            dispatch( setIsLoadingDropbox(false) );
            
        }
        catch(error)
        {
            dispatch( setIsLoadingDropbox(false) );
            console.log(error);
        }
    }

    const asignarArchivoACarpeta = async (criteria = {}, cajaId) => {

        try 
        {
            dispatch( setIsLoadingAsignarPdf(true) );

            const { data } = await indetechApi.put('/Carpeta/PutAsignarArchivo', criteria); 

            await getCarpetasByCajaId(cajaId);

            Swal.fire({
                //position: 'top-end',
                icon: 'success',
                title: 'Operacón exitosa!',
                text: `El archivo fue asignado a la carpeta`,
                showConfirmButton: true,
                timer: 1500
            });
            
            dispatch( setIsLoadingAsignarPdf(false) );
            
            return true;

        }
        catch(error)
        {
            dispatch( setIsLoadingAsignarPdf(false) );

            Swal.fire({
                //position: 'top-end',
                icon: 'error',
                title: 'Error de conexión con Dropbox!',
                text: `Por favor intenta nuevamente`,
                showConfirmButton: true,
                //timer: 1500
            });
            
            console.log(error);

            return false;
        }
    }

    const quitarArchivoACarpeta = async (criteria = {}, cajaId) => {

        try 
        {
            dispatch( setIsLoadingQuitarPdf(true) );

            const { data } = await indetechApi.put('/Carpeta/PutQuitarArchivoAsync', criteria); 

            await getCarpetasByCajaId(cajaId);

            Swal.fire({
                //position: 'top-end',
                icon: 'success',
                title: 'Operacón exitosa!',
                text: `El archivo fue quitado de la carpeta`,
                showConfirmButton: true,
                timer: 1500
            });

            dispatch( setIsLoadingQuitarPdf(false) );

        }
        catch(error)
        {
            dispatch( setIsLoadingQuitarPdf(false) );

            Swal.fire({
                //position: 'top-end',
                icon: 'error',
                title: 'Error de conexión con Dropbox!',
                text: `Por favor intenta nuevamente`,
                showConfirmButton: true,
                //timer: 1500
            });

            console.log(error);
        }
    }

    const putAsociarPdfACarpetas = async (proyectoId) => {
        
        try {

            dispatch( setIsLoadingAsignarPdf(true) );

            const { data } = await indetechApi.put('/carpeta/AsignarImagenesCarpeta/'+proyectoId);            
            
            dispatch(setCarpetasConPdf(data));

            Swal.fire({
                //position: 'top-end',
                icon: 'success',
                title: 'Operacón exitosa!',
                text: `Fueron asignados archivos masivamente a las carpetas...`,
                showConfirmButton: true,
                timer: 1500
            });

            dispatch( setIsLoadingAsignarPdf( false ) );

        } catch (error) {
          
            Swal.fire({
                //position: 'top-end',
                icon: 'error',
                title: 'Error de conexión con Dropbox!',
                text: `Por favor intenta nuevamente`,
                showConfirmButton: true,
                //timer: 1500
            });

          dispatch( setIsLoadingAsignarPdf( false ) );
          console.log(error)
        }
    }

    const buscarEstadoAsignacionArchivos = async (criteria = {}) => {

        try 
        {
            dispatch( setIsLoadingBuscarEstadoAsignacionImagenes(true) );
            
            const { data } = await indetechApi.post('Carpeta/SearchEstadoAsignacionImagenes', criteria);            
            
            dispatch( setCarpetasConPdf(data.carpetasConArchivo) );

            dispatch( setCarpetasSinPdf(data.carpetasSinArchivo) );
            
            dispatch( setIsLoadingBuscarEstadoAsignacionImagenes(false) );
            
        }
        catch(error)
        {
            dispatch( setIsLoadingBuscarEstadoAsignacionImagenes(false) );
            console.log(error);
        }
    }

    const setCarpetaActivaActual = (carpeta) => {
        dispatch( setCarpetaActiva(carpeta) );
    }

    const setTipoOrigenNumero = async (tipoOrigeNumero) => { 
        dispatch( setTipoOrigen(tipoOrigeNumero) );
    }

    return {
        //* Propiedades
        carpetas,
        carpetasByCajaId,
        isLoadingAddCarpeta,
        isDeletingCarpeta,
        carpetaActiva,
        isOpenModalMoverCarpeta,
        isOpenModalAsignar,
        isOpenModalVerPdf,
        isLoadingDropbox,
        archivosDropbox,
        isLoadingAsignarPdf,
        isLoadingQuitarPdf,
        carpetasConPdf,
        carpetasSinPdf,
        isLoadingBuscarEstadoAsignacionImagenes,
        tipoOrigen,

        //* Métodos
        crearCarpeta, 
        crearCarpetaGobernacion,
        getCarpetasByCajaId,
        deleteCarpetaById,
        editarCarpeta,
        openModalMoverCarpeta,
        closeModalMoverCarpeta,
        moverCarpeta,
        setCarpetasByCajaId,
        openModalAsignar,
        closeModalAsignar,
        buscarArchivosDropbox,
        asignarArchivoACarpeta,
        asignarArchivoACarpeta,
        quitarArchivoACarpeta,
        openModalVerPdf,
        closeModalVerPdf,
        putAsociarPdfACarpetas,
        buscarEstadoAsignacionArchivos,
        setCarpetaActivaActual,
        setTipoOrigenNumero
    }
}
