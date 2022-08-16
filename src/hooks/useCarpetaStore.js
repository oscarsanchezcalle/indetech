import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import { indetechApi } from '../api';
import { 
     onLoadCarpetasByCaja, setIsLoadingAddCarpeta,
     setIsDeletingCarpeta, setCarpetaActiva, setOpenModalMoverCarpeta,
     setOpenModalAsignar, setArchivosDropbox, setIsLoadingDropbox } from '../store';

export const useCarpetaStore = () => {
  
    const dispatch = useDispatch();

    const {
         carpetas, carpetasByCajaId, isLoadingAddCarpeta, 
         isDeletingCarpeta, carpetaActiva, isOpenModalMoverCarpeta, 
         isOpenModalAsignar, archivosDropbox, isLoadingDropbox } = useSelector( state => state.carpeta );

    const crearCarpeta = async (criteria = {}, proyectoId, username ) => {
        
        dispatch(setIsLoadingAddCarpeta(true));

        try
        {
            const {
                dependencia, oficina, vigencia, numeroCaja, serie, subserie, tipoDocumento,
                tipoSoporte, frecuenciaUso,  fechaExtremaFinal, fechaExtremaInicial, tomoActual, tomoFinal,
                folioInicial, folioFinal, codigo, notas, cedulaCatastral, duplicidad, autoDeCierre 
            } = criteria;

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
                "autoDeCierre": false,//autoDeCierre.value === 1 ? true : false,
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
                title: 'Registro corecto',
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

    const editarCarpeta = async (criteria = {}, cajaId, username) => {
        
        dispatch(setIsLoadingAddCarpeta(true));

        try
        {
            const {
                id, serie, subserie, tipoDocumento,
                tipoSoporte, frecuenciaUso,  fechaExtremaFinal, fechaExtremaInicial, tomoActual, tomoFinal,
                folioInicial, folioFinal, codigo, notas, cedulaCatastral, duplicidad, autoDeCierre, numeroCaja
            } = criteria;

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
                "tipoDocumentoId": tipoDocumento.value,
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
                title: 'Registro corecto',
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

    const buscarArchivosDropbox = async (proyectoId) => {

        try 
        {
            //Si tengo datos de archivos en el store, no voy a dropbox.
            if('id' in archivosDropbox){
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

    return {
        //* Propiedades
        carpetas,
        carpetasByCajaId,
        isLoadingAddCarpeta,
        isDeletingCarpeta,
        carpetaActiva,
        isOpenModalMoverCarpeta,
        isOpenModalAsignar,
        isLoadingDropbox,
        archivosDropbox,

        //* Métodos
        crearCarpeta, 
        getCarpetasByCajaId,
        deleteCarpetaById,
        editarCarpeta,
        openModalMoverCarpeta,
        closeModalMoverCarpeta,
        moverCarpeta,
        setCarpetasByCajaId,
        openModalAsignar,
        closeModalAsignar,
        buscarArchivosDropbox
    }
}
