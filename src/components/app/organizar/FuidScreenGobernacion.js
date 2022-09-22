import React, { useEffect } from 'react';
import Select from 'react-select';
import { isAfter, parseISO } from 'date-fns'


import { TablaCarpetas } from './TablaCarpetas';
import { LoadingInButton } from '../LoadingInButton';

import 
{ 
    useAuthStore, useDependieciaStore, useOficinaStore, useSerieStore, useSubserieStore,
    useCarpetaStore, useCajaStore, useFormBasic
} from '../../../hooks';
import Swal from 'sweetalert2';

export const FuidScreenGobernacion = () => {

    const { proyectoId, proyecto, username } = useAuthStore();
    const { startLoadingDependencias, dependencias, setDependenciaSelected } = useDependieciaStore();
    const { startLoadingOficinas, oficinas, setOficinaSelected } = useOficinaStore();
    const { series, startLoadingSeries } = useSerieStore();
    const { subseries, startLoadingSubseries } = useSubserieStore();
    const { isLoadingRotuloCaja, buscarRotuloCajaById, rotuloCaja } = useCajaStore();
    const { 
         crearCarpetaGobernacion, isLoadingAddCarpeta,
         getCarpetasByCajaId, isDeletingCarpeta, setCarpetasByCajaId,
         getCarpetasByNumeroCaja
    } = useCarpetaStore();
    

    //useForm
    const documentoForm = {
            dependencia: {},
            oficina: {},
            numeroCaja: '',
            serie: {},
            subserie: {},
            fechaExtremaInicial: '', 
            fechaExtremaFinal: '',
            tomoActual: '',
            tomoFinal: '',
            folioInicial: '',
            folioFinal: '',
            codigo: '', // expediente
            cargo: '',
            notas: '',
            cedulaCatastral: '', // nombres
            duplicidad:'',
            fechaPosesion: ''
    };

    const [formValues, handleInputChange, handleSelectChange, reset] = useFormBasic(documentoForm);

    const {
        dependencia, oficina, numeroCaja, serie, subserie, fechaExtremaInicial, 
        fechaExtremaFinal,tomoActual,tomoFinal,folioInicial, folioFinal,codigo,notas,
        cedulaCatastral, duplicidad,cargo,fechaPosesion
    } = formValues;
   
    useEffect(() => {
        if(proyectoId > 0){
            startLoadingDependencias(proyectoId);
            setCarpetasByCajaId();
        }
    }, [proyectoId]);

    useEffect(() => {
        if(dependencias?.length > 0 && proyectoId == 1){
            handleSelectDependenciaChange(dependencias[0]);
        }
    }, [dependencias]);

    useEffect(() => {
        if(oficinas?.length > 0 && proyectoId == 1){
            handleSelectSubDependenciaChange(oficinas[1]);
        }
    }, [oficinas]);

    useEffect(() => {
        if(series?.length > 0 && proyectoId == 1){
            handleSelectSerieChange(series[0]);
        }
    }, [series]);

    useEffect(() => {
        if(subseries?.length > 0 && proyectoId == 1){
            handleSelectSubserieChange(subseries[0]);
        }
    }, [subseries]);

    useEffect(() => {
        if(rotuloCaja.cajaId > 0){
            getCarpetasByCajaId(rotuloCaja.cajaId);
        }
    }, [rotuloCaja]);

    useEffect(() => {
        if(isDeletingCarpeta === 'deleted' && rotuloCaja.cajaId && numeroCaja != ""){
            
            getCarpetasByCajaId(rotuloCaja.cajaId);
            
            //buscarRotuloCajaById(parseInt(numeroCaja));
            
        }
    }, [isDeletingCarpeta]);

    const handleSelectDependenciaChange = ( selectedOption ) => {           
        startLoadingOficinas(selectedOption.value);
        handleSelectChange(selectedOption, "dependencia");
        setDependenciaSelected(selectedOption);
    }

    const handleSelectSubDependenciaChange = ( selectedOption ) => {           
        startLoadingSeries(selectedOption.value);
        handleSelectChange(selectedOption, "oficina"); 
        setOficinaSelected(selectedOption);
    }
    
    const handleSelectSerieChange = ( selectedOption) => {   
        startLoadingSubseries(selectedOption.value);
        handleSelectChange(selectedOption, "serie");
    }

    const handleSelectSubserieChange = ( selectedOption) => { 
        handleSelectChange(selectedOption, "subserie");
    }
    
    const handleBtnAgregar = async () => {
        
        const {isValid, validationConditions} = isValidFormForSave(formValues);
        
        if (!isValid){

            Swal.fire({
                //position: 'top-end',
                icon: 'warning',
                title: 'Campos incompletos',
                text: `Los siguientes campos son obligatorios: ${String(validationConditions)}`,
                showConfirmButton: true,
            });

            return;
        }

        await crearCarpetaGobernacion(formValues, proyectoId, username);

        reset();
    }

    const handleBtnBuscarCaja = () => {

        const {isValid, validationConditions} = isValidFormForBuscarRotulo(formValues);
        
        if (!isValid){

            Swal.fire({
                //position: 'top-end',
                icon: 'warning',
                title: 'Campos incompletos',
                text: `El ${String(validationConditions)} es obligatorio`,
                showConfirmButton: true,
                
            });

            return;
        }

        getCarpetasByNumeroCaja(parseInt(numeroCaja), proyectoId);
    }    

    const isValidFormForSave = (criteria = {}) => {

        const {
             numeroCaja, dependencia, oficina,
             serie, subserie, codigo, cedulaCatastral, 
             fechaPosesion, cargo, fechaExtremaInicial, fechaExtremaFinal } = criteria;

        const validationConditions = [];
        let isValid = true;
        // let isValidFechas = true; 
        
        // if( (fechaExtremaInicial == '' && fechaExtremaFinal != '')){
        //     isValidFechas = false;
        // }

        // if( (fechaExtremaInicial != '' && fechaExtremaFinal == '') ){
        //     isValidFechas = false;
        // }

        // if((fechaExtremaInicial != '' && fechaExtremaFinal != '') ){
            
        //     const fechaIni = new Date(parseISO(fechaExtremaInicial));
        //     const fechaFin = new Date(parseISO(fechaExtremaFinal));

        //     if(isAfter(fechaIni, fechaFin)){
        //         isValidFechas = false; 
        //     }else{
        //         isValidFechas = true; 
        //     }
        // }  

        if (     typeof dependencia.value === 'undefined' || typeof oficina.value === 'undefined'
             || (typeof numeroCaja === 'undefined' || numeroCaja === 0 || numeroCaja === "" )
            //  || (typeof codigo === 'undefined' || numeroCaja === "" )
            //  || (typeof cedulaCatastral === 'undefined' || cedulaCatastral === "" )
            //  || (typeof fechaPosesion === 'undefined' || fechaPosesion === "" )
            //  || (typeof cargo === 'undefined' || cargo === "" )
             || typeof serie.value === 'undefined' || typeof  subserie.value   === 'undefined' 
             //|| !isValidFechas
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
            if(typeof subserie.value === 'undefined'){
                validationConditions.push(' Subserie');
            }
            // if(typeof codigo === 'undefined' || codigo === ""){
            //     validationConditions.push(' Número del expediente (Cédula)');
            // }
            // if(typeof cedulaCatastral === 'undefined' || cedulaCatastral === ""){
            //     validationConditions.push(' Apellidos y Nombres');
            // }
            // if(typeof fechaPosesion === 'undefined' || fechaPosesion === "" ){
            //     validationConditions.push(' Fecha de posesión');
            // }
            // if(typeof cargo === 'undefined' || cargo === "" ){
            //     validationConditions.push(' Cargo');
            // }
            // if(!isValidFechas){
            //     validationConditions.push(' Rango de fechas extremas');
            // }
            isValid = false;
        }
       
        return {
            isValid,
            validationConditions
        };            
    } 

    const isValidFormForBuscarRotulo = (criteria = {}) => {

        const { numeroCaja } = criteria;

        const validationConditions = [];
        let isValid = true;

        if ( (typeof numeroCaja === 'undefined' || numeroCaja === 0 || numeroCaja === "" ) )
        {   
            if(typeof numeroCaja === 'undefined' || numeroCaja === 0 || numeroCaja === ""){
                validationConditions.push(' número de la caja');
            }
            isValid = false;
        }
       
        return {
            isValid,
            validationConditions
        };            
    }  

  return (
    <>
    <div className='row'>
        <div className='col-md-7'>
            <h6 className="title pb-2">Registro de Caja</h6>
            <div className="row">
                <label className="col-sm-3 col-form-label form-label">Entidad</label>
                <div className="col-sm-9">
                    <input type="text" className="form-control" disabled={true} value={ proyecto }/>
                </div>
            </div>
            
            <div className=" row">
                <label className="col-sm-3 col-form-label form-label">Caja</label>
                <div className="col-sm-9">
                    <div className="form-control-wrap">
                        <div className="input-group">
                            <input 
                                type="number" 
                                className="form-control" 
                                placeholder='Número de la caja'  
                                name="numeroCaja"   
                                value={numeroCaja}  
                                autoComplete="off"                       
                                onChange={handleInputChange}/>
                            <div className="input-group-append">
                                <button onClick={handleBtnBuscarCaja}  disabled={isLoadingRotuloCaja} className="btn btn-outline-primary btn-dim">
                                    <LoadingInButton isLoading={isLoadingRotuloCaja} btnText="Buscar Caja" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='col-md-5'>
            {/* <RotuloCaja /> */}
        </div>
    </div>
    <div className='row pt-1'>
        <div className='col-md-12'>
            <div id="accordion" className="accordion">
                <div className="accordion-item">
                    <a href="#" className="accordion-head" data-bs-toggle="collapse" data-bs-target="#accordion-item-1" aria-expanded="false">
                        <h6 className="title">Registro de carpeta</h6>
                        <span className="accordion-icon" />
                    </a>
                    <div className="accordion-body collapse show" id="accordion-item-1" data-bs-parent="#accordion" style={{}}>
                        <div className="accordion-inner">
                            <div className=" row">
                                <div className='col-md-6'>
                                    <label className='form-label'>Dependencia</label>
                                    <Select
                                        options={dependencias}    
                                        value={dependencia}    
                                        placeholder=''
                                        onChange={(selectedOption) => handleSelectDependenciaChange(selectedOption)}
                                    />
                                </div>
                                <div className='col-md-6'>
                                    <label className='form-label'>Sub Dependencia</label>
                                    <Select
                                        options={oficinas}   
                                        placeholder=''
                                        value={oficina}    
                                        onChange={(selectedOption) => handleSelectSubDependenciaChange(selectedOption)}
                                    />
                                </div>
                                <div className='col-md-6 pt-2'>
                                    <label className='form-label'>Serie</label>
                                    <Select
                                        options={series}   
                                        value={serie}    
                                        onChange={(selectedOption) => handleSelectSerieChange(selectedOption)}
                                        placeholder='Series'
                                        />
                                </div>
                                <div className='col-md-6 pt-2'>
                                    <label className='form-label'>Subserie</label>
                                    <Select
                                        options={subseries}  
                                        value={subserie}    
                                        onChange={(selectedOption) => handleSelectSubserieChange(selectedOption)}
                                        placeholder='Subseries'
                                        />
                                </div>
                            </div>

                            <div className='row mt-2'>
                                <div className="col-md-3">
                                    <label className='form-label'>Núm. Expediente</label>
                                        <input 
                                            value={codigo}
                                            name="codigo"
                                            onChange={handleInputChange}
                                            type="text" 
                                            className="form-control" 
                                            placeholder=''
                                            autoComplete="off"/>
                                </div>
                                <div className="col-md-5">
                                    <label className='form-label'>Apellidos y Nombres</label>
                                        <input 
                                            name="cedulaCatastral"
                                            value={cedulaCatastral}
                                            onChange={handleInputChange}
                                            type="text" 
                                            className="form-control" 
                                            placeholder=''/>
                                </div>
                                <div className="col-md-4">
                                    <label className='form-label'>Cargo</label>
                                    <input 
                                        name="cargo"
                                        value={cargo}
                                        onChange={handleInputChange}
                                        type="text" 
                                        className="form-control" 
                                        placeholder=''/>
                                </div>
                            </div>

                            <div className='row mt-2'>
                                <div className='col-md-3'>
                                    <label className='form-label'>Fecha de Posesión</label>
                                    <input
                                        name="fechaPosesion" 
                                        onChange={handleInputChange} 
                                        type="date" 
                                        value={fechaPosesion}
                                        className="form-control"
                                    />
                                </div>
                                <div className='col-md-5'>
                                    <label className='form-label'>Fechas extremas</label>
                                    <div className="form-control-wrap">
                                        <div className="input-group">
                                            <input
                                                name="fechaExtremaInicial" 
                                                onChange={handleInputChange} 
                                                type="date" 
                                                value={fechaExtremaInicial}
                                                className="form-control"/>
                                            <input 
                                                name="fechaExtremaFinal"
                                                onChange={handleInputChange}
                                                value={fechaExtremaFinal}
                                                type="date" 
                                                min={formValues.fechaExtremaInicial}
                                                className="form-control" />
                                        </div>
                                    </div>
                                </div>
                               
                                <div className='col-md-4'>
                                    <label className='form-label'>Folios</label>
                                    <div className="form-control-wrap">
                                        <div className="input-group">
                                            <input 
                                                name="folioInicial"
                                                onChange={handleInputChange}
                                                type="number" 
                                                className="form-control"
                                                value={folioInicial} 
                                                placeholder='Inicial'
                                                autoComplete="off"/>
                                            <input 
                                                name="folioFinal"
                                                onChange={handleInputChange}
                                                value={folioFinal}
                                                min={formValues.folioInicial}
                                                type="number" 
                                                className="form-control" 
                                                placeholder='Final'
                                                autoComplete="off"/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='row mt-2'>
                                <div className='col-md-3'>
                                    <label className='form-label'>Duplicidad</label>
                                    <div className="form-control-wrap">
                                        <div className="input-group">
                                            <input 
                                                name="duplicidad"
                                                value={duplicidad}
                                                onChange={handleInputChange}
                                                type="text" 
                                                className="form-control" 
                                                placeholder='#'
                                                min={0}
                                                autoComplete="off"/>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <label className='form-label'>Tomos</label>
                                    <div className="form-control-wrap">
                                        <div className="input-group">
                                            <input 
                                                name="tomoActual"
                                                onChange={handleInputChange}
                                                value={tomoActual}
                                                type="number" 
                                                autoComplete="off"
                                                className="form-control" 
                                                placeholder='Actual'/>
                                            <input 
                                                name="tomoFinal"
                                                onChange={handleInputChange}
                                                min={formValues.tomoActual}
                                                value={tomoFinal}
                                                type="number" 
                                                autoComplete="off"
                                                className="form-control" 
                                                placeholder='Final'/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='row mt-2'>
                                <div className='col-md-10'>
                                    <label className='form-label'>Notas</label>
                                    <div className="form-control-wrap">
                                        <div className="input-group">
                                            <input 
                                                type="text"
                                                className='form-control no-resize'
                                                value={notas}
                                                onChange={handleInputChange} 
                                                name="notas"
                                                autoComplete="off"/>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-2'>
                                    <br />
                                    <button 
                                        onClick={handleBtnAgregar}
                                        type="button"
                                        disabled={isLoadingAddCarpeta}
                                        className="btn btn-outline-primary btn-dim  mt-1 btn-block">
                                            <LoadingInButton isLoading={isLoadingAddCarpeta} btnText="Agregar" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className='row pt-1'>
        <div className='col-md-12'>
            <TablaCarpetas  tipoOrigen={3}/>
        </div>
    </div>
    </>
  )
}   