import { useDispatch, useSelector } from 'react-redux';
import { isAfter, parseISO } from 'date-fns';
import Swal from 'sweetalert2';
import { indetechApi } from '../api';

import { setIsLoadingAddInventario, 
         setIsLoadingUpdateInventario, 
         setIsLoadingDeleteInventario,
         setIsLoadingGetInventario,
         onGetInventario,
         setRegistroActivoInventario,
         setTipoOrigenInventario,
         setOpenModalEditarInventario,
         setGetDepartamentosFilter,
         setGetNumeroResolucionFilter,
         setGetFechaResolucionFilter,
         setGetNumeroCajaFilter,
         setGetSerieSubserieFilter,
         setIsLoadingDepartamentosFilter,
         setIsLoadingNumeroCajaFilter,
         setIsLoadingSerieSubserieFilter,
         setIsLoadingFechaResolucionFilter,
         setIsLoadingNumeroResolucionFilter, } from '../store';

import { convertDepartamentosFilterToSelect, convertNumeroResolucionFilterToSelect,
         convertFechaResolucionFilterToSelect, convertNumeroCajaFilterToSelect,
         convertSerieSubserieFilterToSelect } from '../helpers';

export const useInventarioStore = () => {
  
    const dispatch = useDispatch();
    const { isLoadingGet, isLoadingAdd, isLoadingDelete, isLoadingUpdate,
            registros, registroActivo, isOpenModalEditar, tipoOrigen,
            isLoadingDepartamentosFilter, isLoadingNumeroResolucionFilter,
            isLoadingFechaResolucionFilter, isLoadingNumeroCajaFilter,
            isLoadingSerieSubserieFilter, departamentosFilter,
            numeroResolucionFilter, fechaResolucionFilter, numeroCajaFilter,
            serieSubserieFilter           
          } = useSelector( state => state.inventario );

    const addRegistro = async (formData = {}, proyectoId, username ) => {
       
        dispatch(setIsLoadingAddInventario(true));

        try
        {
            const {isValid, validationConditions} = isValidFormForSave(formData);
        
            if (!isValid){

                Swal.fire({
                    icon: 'warning',
                    title: 'Campos incompletos',
                    text: `Los siguientes campos son obligatorios: ${String(validationConditions)}`,
                    showConfirmButton: true,
                });

                dispatch(setIsLoadingAddInventario(false));

                return false;
            }

            const {
                dependencia, oficina, numeroCaja, numeroCarpeta, serie,
                subserie, departamento, municipio,
                nombre, nombrePredio, nombrePersona, documentoIdentificacion,
                numeroMatricula, numeroExpediente, fechaExpediente, numeroPlano,
                fechaInicial, fechaFinal, notas,  expedientePreexistente, estante, modulo,
                entrepano
            } = formData;

            const criteria = {
                "proyectoId": parseInt(proyectoId),
                "dependenciaId":  dependencia.value === 'undefined' ? 0 : dependencia.value,
                "oficinaId": oficina.value === 'undefined' ? 0 : oficina.value,
                "numeroCaja": parseInt(numeroCaja),
                "numeroCarpeta": parseInt(numeroCarpeta),
                "serieId": serie.value === 'undefined' ? 0 : serie.value,
                "subserieId": 0,
                "departamentoId": departamento.value === 'undefined' ? 0 : departamento.value,
                "municipioId": municipio.value === 'undefined' ? 0 : municipio.value,
                "numeroConsecutivo": 0,
                "nombre": nombre,
                "nombrePredio": nombrePredio,
                "nombrePersona": nombrePersona,
                "documentoIdentificacion": documentoIdentificacion,
                "numeroMatricula": numeroMatricula,
                "numeroExpediente": numeroExpediente, // numero resolucion y auto
                "fechaExpediente": fechaExpediente === '' ? '0001-01-01' : fechaExpediente, // fecha resolucion y auto
                "numeroPlano": numeroPlano,
                "fechaInicial": fechaInicial === '' ? '0001-01-01' : fechaInicial,
                "fechaFinal": fechaFinal === '' ? '0001-01-01' : fechaFinal,
                "tipoDocumentoId": 0,
                "folios": 0,
                "notas": notas,
                "fechaRegistro": new Date(),
                "usuarioId": username,
                "expedientePreexistente": expedientePreexistente,
                "estante": estante,
                "modulo": modulo,
                "entrepano": entrepano,
                "estado": 0
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

            return true;
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

    const addRegistroExpediente = async (formData = {}, proyectoId, username ) => {
       
        dispatch(setIsLoadingAddInventario(true));

        try
        {
            const {isValid, validationConditions} = isValidFormForSaveExpediente(formData);
        
            if (!isValid){

                Swal.fire({
                    icon: 'warning',
                    title: 'Campos incompletos',
                    text: `Los siguientes campos son obligatorios: ${String(validationConditions)}`,
                    showConfirmButton: true,
                });

                dispatch(setIsLoadingAddInventario(false));

                return false;
            }

            const {
                dependencia, oficina, numeroCaja, serie,
                departamento, municipio,
                nombre, nombrePredio, nombrePersona, documentoIdentificacion,
                numeroMatricula, numeroExpediente, fechaExpediente, numeroPlano,
                fechaInicial, fechaFinal, notas,  expedientePreexistente, estante, modulo,
                entrepano
            } = formData;

            const criteria = {
                "proyectoId": parseInt(proyectoId),
                "dependenciaId":  dependencia.value === 'undefined' ? 0 : dependencia.value,
                "oficinaId": oficina.value === 'undefined' ? 0 : oficina.value,
                "numeroCaja": parseInt(numeroCaja),
                "numeroCarpeta": 0,
                "serieId": serie.value === 'undefined' ? 0 : serie.value,
                "subserieId": 0,
                "departamentoId": departamento.value === 'undefined' ? 0 : departamento.value,
                "municipioId": municipio.value === 'undefined' ? 0 : municipio.value,
                "numeroConsecutivo": 0,
                "nombre": nombre,
                "nombrePredio": nombrePredio,
                "nombrePersona": nombrePersona,
                "documentoIdentificacion": documentoIdentificacion,
                "numeroMatricula": numeroMatricula,
                "numeroExpediente": numeroExpediente, // numero resolucion y auto
                "fechaExpediente": fechaExpediente === '' ? '0001-01-01' : fechaExpediente, // fecha resolucion y auto
                "numeroPlano": numeroPlano,
                "fechaInicial": fechaInicial === '' ? '0001-01-01' : fechaInicial,
                "fechaFinal": fechaFinal === '' ? '0001-01-01' : fechaFinal,
                "tipoDocumentoId": 0,
                "folios": 0,
                "notas": notas,
                "fechaRegistro": new Date(),
                "usuarioId": username,
                "expedientePreexistente": expedientePreexistente,
                "estante": estante,
                "modulo": modulo,
                "entrepano": entrepano,
                "estado": 0
            }

            //llamar al end point que crea el registro de inventario documental
            const {data} = await indetechApi.post('/InventarioDocumental', criteria);
            
            //Actualizar la tabla
            GetInventarioByCaja(data.numeroCaja);

            dispatch(setIsLoadingAddInventario(false));

            Swal.fire({
                icon: 'success',
                title: 'Registro correcto',
                text: '',
                showConfirmButton: true,
                timer: 1500
            });

            return true;
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

            const { data } = await indetechApi.get('/InventarioDocumental/GetInventarioByCajaCarpeta?numeroCaja='+numeroCaja+'&numeroCarpeta='+numeroCarpeta);            
            
            dispatch( onGetInventario( data ) );

            dispatch(setIsLoadingGetInventario(false));

        } catch (error) {
          
          dispatch(setIsLoadingAddInventario(false));

          dispatch(setIsLoadingGetInventario(false));

          console.log('Error cargando carpetas de la caja: '+ numeroCaja + ' y carpeta: ' + numeroCarpeta);
          console.log(error)
        }
    }

    const GetInventarioByCaja = async (numeroCaja) => {
        
        try {
            dispatch(setIsLoadingGetInventario(true));

            const { data } = await indetechApi.get('/InventarioDocumental/GetInventarioByCaja?numeroCaja='+numeroCaja);            
            
            dispatch( onGetInventario( data ) );

            dispatch(setIsLoadingGetInventario(false));

        } catch (error) {
          
          dispatch(setIsLoadingAddInventario(false));

          dispatch(setIsLoadingGetInventario(false));

          console.log('Error cargando carpetas de la caja '+ numeroCaja);
          console.log(error)
        }
    }

    const deleteRegistroById = async (registroId, numeroCaja, numeroCarpeta)  => {

        dispatch( setIsLoadingDeleteInventario(true) );

        try {
            
            await indetechApi.delete('/InventarioDocumental/'+registroId); 
            
            if(numeroCarpeta > parseInt(0)){
                 //Actualizar la tabla caja y carpeta
                 GetInventarioByCajaCarpeta(numeroCaja, numeroCarpeta);
            }else{
                //Actualizar la tabla caja
                GetInventarioByCaja(numeroCaja);
            }
            

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

    const isValidFormForSave = (criteria = {}) => {

        const {
                numeroCaja, numeroCarpeta, dependencia, oficina,
                serie, fechaInicial, fechaFinal 
              } = criteria;

        const validationConditions = [];
        let isValid = true;
        let isValidFechas = true; 
       
        if(fechaInicial != '' && fechaFinal != ''){
            
            const fechaIni = new Date(parseISO(fechaInicial));
            const fechaFin = new Date(parseISO(fechaFinal));

            if(isAfter(fechaIni, fechaFin)){
                isValidFechas = false; 
            }else{
                isValidFechas = true; 
            }
        }  

        if (     typeof dependencia.value === 'undefined' || typeof oficina.value === 'undefined'
             ||  typeof serie.value === 'undefined'
             || (typeof numeroCaja === 'undefined' || numeroCaja === 0 || numeroCaja === "" )
             || (typeof numeroCarpeta === 'undefined' || numeroCarpeta === 0 || numeroCarpeta === "" )
             || !isValidFechas
            )
        {            
            
            if(typeof numeroCaja === 'undefined' || numeroCaja === 0 || numeroCaja === ""){
                validationConditions.push(' Número de Caja');
            }
            if(typeof numeroCarpeta === 'undefined' || numeroCarpeta === 0 || numeroCarpeta === ""){
                validationConditions.push(' Número de Carpeta');
            }
            if(typeof dependencia.value === 'undefined'){
                validationConditions.push(' Dependencia');
            }
            if(typeof oficina.value === 'undefined'){
                validationConditions.push(' Sub Dependencia');
            }
            if(typeof serie.value === 'undefined'){
                validationConditions.push(' Serie');
            }
            if(!isValidFechas){
                validationConditions.push(' Rango de fechas extremas');
            }
            isValid = false;
        }
       
        return {
            isValid,
            validationConditions
        };            
    } 

    const isValidFormForSaveExpediente = (criteria = {}) => {

        const {
                numeroCaja, dependencia, oficina,
                serie, fechaInicial, fechaFinal 
              } = criteria;

        const validationConditions = [];
        let isValid = true;
        let isValidFechas = true; 
       
        if(fechaInicial != '' && fechaFinal != ''){
            
            const fechaIni = new Date(parseISO(fechaInicial));
            const fechaFin = new Date(parseISO(fechaFinal));

            if(isAfter(fechaIni, fechaFin)){
                isValidFechas = false; 
            }else{
                isValidFechas = true; 
            }
        }  

        if (     typeof dependencia.value === 'undefined' || typeof oficina.value === 'undefined'
             ||  typeof serie.value === 'undefined'
             || (typeof numeroCaja === 'undefined' || numeroCaja === 0 || numeroCaja === "" )
             || !isValidFechas
            )
        {            
            
            if(typeof numeroCaja === 'undefined' || numeroCaja === 0 || numeroCaja === ""){
                validationConditions.push(' Número de Caja');
            }
            if(typeof dependencia.value === 'undefined'){
                validationConditions.push(' Dependencia');
            }
            if(typeof oficina.value === 'undefined'){
                validationConditions.push(' Sub Dependencia');
            }
            if(typeof serie.value === 'undefined'){
                validationConditions.push(' Serie');
            }
            if(!isValidFechas){
                validationConditions.push(' Rango de fechas extremas');
            }
            isValid = false;
        }
       
        return {
            isValid,
            validationConditions
        };            
    } 

    const getDepartamentosFilter = async() => {
       
        try 
        {
            dispatch( setIsLoadingDepartamentosFilter( true ) );
            
            const { data } = await indetechApi.get('/InventarioDocumental/departamentosFilter');
                        
            const resultForSelect = convertDepartamentosFilterToSelect(data);

            dispatch( setGetDepartamentosFilter( resultForSelect ) );  

            dispatch( setIsLoadingDepartamentosFilter( false ) );

        } catch (error) 
        {            
            dispatch( setIsLoadingDepartamentosFilter( false ) );

        }
    }

    const getNumeroResolucionFilter = async() => {
       
        try 
        {
            dispatch( setIsLoadingNumeroResolucionFilter( true ) );
            
            const { data } = await indetechApi.get('InventarioDocumental/numeroResolucionFilter');
                        
            const resultForSelect = convertNumeroResolucionFilterToSelect(data);

            dispatch( setGetNumeroResolucionFilter( resultForSelect ) );  

            dispatch( setIsLoadingNumeroResolucionFilter( false ) );

        } catch (error) 
        {            
            dispatch( setIsLoadingNumeroResolucionFilter( false ) );

        }
    }

    const getFechaResolucionFilter = async() => {
       
        try 
        {
            dispatch( setIsLoadingFechaResolucionFilter( true ) );
            
            const { data } = await indetechApi.get('InventarioDocumental/fechaResolucionFilter');
                        
            const resultForSelect = convertFechaResolucionFilterToSelect(data);

            dispatch( setGetFechaResolucionFilter( resultForSelect ) );  

            dispatch( setIsLoadingFechaResolucionFilter( false ) );

        } catch (error) 
        {            
            dispatch( setIsLoadingFechaResolucionFilter( false ) );

        }
    }

    const getNumeroCajaFilter = async() => {
       
        try 
        {
            dispatch( setIsLoadingNumeroCajaFilter( true ) );
            
            const { data } = await indetechApi.get('InventarioDocumental/numeroCajaFilter');
                        
            const resultForSelect = convertNumeroCajaFilterToSelect(data);

            dispatch( setGetNumeroCajaFilter( resultForSelect ) );  

            dispatch( setIsLoadingNumeroCajaFilter( false ) );

        } catch (error) 
        {            
            dispatch( setIsLoadingNumeroCajaFilter( false ) );

        }
    }

    const getSerieSubserieFilter = async() => {
       
        try 
        {
            dispatch( setIsLoadingSerieSubserieFilter( true ) );
            
            const { data } = await indetechApi.get('InventarioDocumental/serieSubserieFilter');
                        
            const resultForSelect = convertSerieSubserieFilterToSelect(data);

            dispatch( setGetSerieSubserieFilter( resultForSelect ) );  

            dispatch( setIsLoadingSerieSubserieFilter( false ) );

        } catch (error) 
        {            
            dispatch( setIsLoadingSerieSubserieFilter( false ) );
        }
    }

    const getBusquedaBasica = async( criteria ) => {
      
        try {            
            const departamentos = [];
            const numeroResoluciones = [];
            const fechaResoluciones = [];
            const numeroCajas = [];
            const seriesSubseries = [];

            dispatch(setIsLoadingGetInventario(true));
            
            if(criteria.departamento.constructor.name == "Array"){
                criteria.departamento.map( item => {                   
                    departamentos.push(item.value)   
                });
            }
            
            if(criteria.numeroResolucion.constructor.name == "Array"){
                criteria.numeroResolucion.map( item => {                   
                    numeroResoluciones.push(item.value)   
                });
            }

            if(criteria.numeroResolucion.constructor.name == "Array"){
                criteria.numeroResolucion.map( item => {                   
                    fechaResoluciones.push(item.value)   
                });
            }

            if(criteria.numeroCaja.constructor.name == "Array"){
                criteria.numeroCaja.map( item => {                   
                    numeroCajas.push(item.value)   
                });
            }

            if(criteria.serieSubserie.constructor.name == "Array"){
                criteria.serieSubserie.map( item => {                   
                    seriesSubseries.push(item.value)   
                });
            }

            const searchCriteria = {
                "departamentos"      :departamentos,
                "numeroResoluciones" :numeroResoluciones,
                "fechaResoluciones"  :fechaResoluciones,
                "numeroCajas"        :numeroCajas,
                "seriesSubseries"    :seriesSubseries
              }

              console.log(JSON.stringify(searchCriteria));

              const { data } = await indetechApi.post('/InventarioDocumental/busquedaBasica', searchCriteria);            
            
              // dispatch( onGetInventario( data ) );

              dispatch(setIsLoadingGetInventario(false));

        } catch (error) {
          
          dispatch(setIsLoadingGetInventario(false));
 
          console.log('Error buscando los datos con el criteria' + criteria );
          console.log(error)
        }
    }

    return {
        //* Propiedades
        registros,
        departamentosFilter,
        numeroResolucionFilter, 
        fechaResolucionFilter,
        numeroCajaFilter,
        serieSubserieFilter,  

        isLoadingAdd,
        isLoadingGet,
        isLoadingDelete,
        isLoadingUpdate,
        isLoadingDepartamentosFilter,
        isLoadingFechaResolucionFilter,
        isLoadingNumeroCajaFilter,
        isLoadingNumeroResolucionFilter,
        isLoadingSerieSubserieFilter,

        registroActivo,
        isOpenModalEditar,
        tipoOrigen,
       
        //* Métodos
        addRegistro,
        addRegistroExpediente,
        GetInventarioByCajaCarpeta,
        GetInventarioByCaja,
        deleteRegistroById,
        
        getDepartamentosFilter,
        getNumeroResolucionFilter,
        getFechaResolucionFilter,
        getNumeroCajaFilter,
        getSerieSubserieFilter,
        getBusquedaBasica
    }
}
