import React, { useEffect } from 'react';
import Select from 'react-select';

import { TablaCarpetas } from './TablaCarpetas';
import { LoadingInButton } from './../../LoadingInButton'

import 
{ 
    useAuthStore, useDependieciaStore, useOficinaStore, useSerieStore, useSubserieStore, useTipoDocumentoStore,
    useForm, useCarpetaStore, useVigenciaStore, useSoporteStore, useFrecuenciaStore, useCajaStore
} from '../../../../hooks';
import Swal from 'sweetalert2';

export const FuidScreenCartagena = () => {

    const { proyectoId, proyecto, username } = useAuthStore();
    const { startLoadingDependencias, dependencias, setDependenciaSelected } = useDependieciaStore();
    const { startLoadingOficinas, oficinas, setOficinaSelected } = useOficinaStore();
    const { series, startLoadingSeries } = useSerieStore();
    const { subseries, startLoadingSubseries } = useSubserieStore();
    const { tipoDocumentos, startLoadingTipoDocumentos } = useTipoDocumentoStore();
    const { vigencias, startLoadingVigencias, setVigenciaSelected } = useVigenciaStore();
    const { soportes, startLoadingSoportes } = useSoporteStore();
    const { frecuencias, startLoadingFrecuencias } = useFrecuenciaStore();
    const { isLoadingRotuloCaja, buscarRotuloCaja, rotuloCaja } = useCajaStore();
    const { 
         crearCarpeta, isLoadingAddCarpeta,
         getCarpetasByCajaId, isDeletingCarpeta, setCarpetasByCajaId,
         setTipoOrigenNumero
    } = useCarpetaStore();
    

    //useForm
    const documentoForm = {
            dependencia: {},
            oficina: {},
            vigencia: {},
            numeroCaja: '',
            serie: {},
            subserie: {},
            tipoDocumento:{},
            tipoSoporte:{},
            frecuenciaUso:{},
            fechaExtremaInicial: '', 
            fechaExtremaFinal: '',
            tomoActual: '',
            tomoFinal: '',
            folioInicial: '',
            folioFinal: '',
            codigo: '',
            notas: '',
            cedulaCatastral: '',
            duplicidad:'',
            autoDeCierre: {}
    };

    const [formValues, handleInputChange, handleSelectChange, resetFuidForm] = useForm(documentoForm);

    const {
        dependencia,
        oficina,
        vigencia,
        numeroCaja,
        serie,
        subserie,
        tipoDocumento,
        tipoSoporte,
        frecuenciaUso,
        fechaExtremaInicial, 
        fechaExtremaFinal,
        tomoActual,
        tomoFinal,
        folioInicial,
        folioFinal,
        codigo,
        notas,
        cedulaCatastral,
        duplicidad,
        autoDeCierre
    } = formValues;
   
    useEffect(() => {
        if(proyectoId > 0){
            startLoadingDependencias(proyectoId);
            startLoadingFrecuencias();
            startLoadingSoportes();
            startLoadingVigencias();
            setCarpetasByCajaId();
            setTipoOrigenNumero(2);
        }
    }, [proyectoId]);

    useEffect(() => {
        if(dependencias?.length > 0 && proyectoId == 4){
            handleSelectDependenciaChange(dependencias[0]);
        }
    }, [dependencias]);

    useEffect(() => {
        if(oficinas?.length > 0 && proyectoId == 4){
            handleSelectSubDependenciaChange(oficinas[0]);
        }
    }, [oficinas]);

    useEffect(() => {
        if(vigencias?.length > 0 && proyectoId == 4){
            handleSelectVigenciaChange(vigencias[0]);
        }
    }, [vigencias]);

    useEffect(() => {
        if(series?.length > 0 && proyectoId == 4){
            handleSelectSerieChange(series[0]);
        }
    }, [series]);

    useEffect(() => {
        if(subseries?.length > 0 && proyectoId == 4){
            handleSelectSubserieChange(subseries[0]);
        }
    }, [subseries]);

    useEffect(() => {
        if(tipoDocumentos?.length > 0 && proyectoId == 4){            
            handleSelectTipoDocumentoChange(tipoDocumentos[0]);
        }
    }, [tipoDocumentos]);

    useEffect(() => {
        if(frecuencias?.length > 0){
            handleSelectFrecuenciaChange(frecuencias[0]);
        }
    }, [frecuencias]);

    useEffect(() => {
        if(soportes?.length > 0){            
            handleSelectSoporteChange(soportes[2]);
        }
    }, [soportes]);

    useEffect(() => {
        if(rotuloCaja.cajaId > 0){
            getCarpetasByCajaId(rotuloCaja.cajaId);
        }
    }, [rotuloCaja]);

    useEffect(() => {
        if(isDeletingCarpeta === 'deleted' && rotuloCaja.cajaId && numeroCaja != ""){
            
            getCarpetasByCajaId(rotuloCaja.cajaId);
            const criteria = {
                "numero": parseInt(numeroCaja),
                "proyectoId": proyectoId,
                "dependenciaId": formValues.dependencia.value,
                "oficinaId": formValues.oficina.value,
                "vigenciaId": formValues.vigencia.value
            };
            buscarRotuloCaja(criteria);
            
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
    
    const handleSelectVigenciaChange = ( selectedOption ) => {   
        handleSelectChange(selectedOption, "vigencia");
        setVigenciaSelected(selectedOption);
    }

    const handleSelectSerieChange = ( selectedOption) => {   
        startLoadingSubseries(selectedOption.value);
        handleSelectChange(selectedOption, "serie");
    }

    const handleSelectSubserieChange = ( selectedOption) => {   
        startLoadingTipoDocumentos(selectedOption.value);
        handleSelectChange(selectedOption, "subserie");
    }

    const handleSelectTipoDocumentoChange = ( selectedOption) => {    
        handleSelectChange(selectedOption, "tipoDocumento");
    }

    const handleSelectSoporteChange = ( selectedOption ) => {   
        handleSelectChange(selectedOption, "tipoSoporte");
    }

    const handleSelectFrecuenciaChange = ( selectedOption ) => {   
        handleSelectChange(selectedOption, "frecuenciaUso");
    }

    const handleSelectAutoDeCierreChange = ( selectedOption ) => {   
        handleSelectChange(selectedOption, "autoDeCierre");
    }
    
    const handleBtnAgregar = async () => {
        
        console.log(formValues);

        const {isValid, validationConditions} = isValidFormForSave(formValues);
        
        if (!isValid){

            Swal.fire({
                //position: 'top-end',
                icon: 'warning',
                title: 'Campos incompletos',
                text: `Los siguientes campos son obligatorios: ${String(validationConditions)}`,
                showConfirmButton: true,
                timer: 1500
            });

            return;
        }
        
        await crearCarpeta(formValues, proyectoId, username);
        
        const frecuenciaDefault = frecuencias.find(f => f.label == 'Sin Frecuencia');
        const tipoSoporteDefault = soportes.find(f => f.label == 'Sin Soporte');

        resetFuidForm(frecuenciaDefault, tipoSoporteDefault);
    }

    const handleBtnBuscarCaja = () => {

        const {isValid, validationConditions} = isValidFormForBuscarRotulo(formValues);
        
        if (!isValid){

            Swal.fire({
                //position: 'top-end',
                icon: 'warning',
                title: 'Campos incompletos',
                text: `Los siguientes campos son obligatorios: ${String(validationConditions)}`,
                showConfirmButton: true,
                //timer: 1500
            });

            return;
        }

        const criteria = {
            "numero": parseInt(numeroCaja),
            "proyectoId": proyectoId,
            "dependenciaId": formValues.dependencia.value,
            "oficinaId": formValues.oficina.value,
            "vigenciaId": formValues.vigencia.value
        };

        buscarRotuloCaja(criteria);
    }    

    const isValidFormForSave = (criteria = {}) => {

        const {
             dependencia, oficina, numeroCaja,
             serie, subserie, 
             vigencia } = criteria;

        const validationConditions = [];
        let isValid = true;

        if (     typeof dependencia.value === 'undefined' || typeof oficina.value === 'undefined'
             || (typeof numeroCaja === 'undefined' || numeroCaja === 0 || numeroCaja === "" ) || typeof serie.value === 'undefined'
             || typeof  subserie.value   === 'undefined' 
             || typeof vigencia.value === 'undefined')
        {            
            if(typeof dependencia.value === 'undefined'){
                validationConditions.push(' Dependencia');
            }
            if(typeof oficina.value === 'undefined'){
                validationConditions.push(' Sub Dependencia');
            }
            if(typeof vigencia.value === 'undefined'){
                validationConditions.push(' Vigencia');
            }
            if(typeof numeroCaja === 'undefined' || numeroCaja === 0 || numeroCaja === ""){
                validationConditions.push(' Número de Caja');
            }
            if(typeof serie.value === 'undefined'){
                validationConditions.push(' Serie');
            }
            if(typeof subserie.value === 'undefined'){
                validationConditions.push(' Subserie');
            }
            
            isValid = false;
        }
       
        return {
            isValid,
            validationConditions
        };            
    } 
    
    const isValidFormForBuscarRotulo = (criteria = {}) => {

        const {
             numeroCaja, dependencia,
             oficina, vigencia } = criteria;

        const validationConditions = [];
        let isValid = true;

        if (     typeof dependencia.value === 'undefined' || typeof oficina.value === 'undefined'
             || (typeof numeroCaja === 'undefined' || numeroCaja === 0 || numeroCaja === "" ) 
             || typeof vigencia.value === 'undefined')
        {            
            if(typeof dependencia.value === 'undefined'){
                validationConditions.push(' Dependencia');
            }
            if(typeof oficina.value === 'undefined'){
                validationConditions.push(' Sub Dependencia');
            }
            if(typeof vigencia.value === 'undefined'){
                validationConditions.push(' Vigencia');
            }
            if(typeof numeroCaja === 'undefined' || numeroCaja === 0 || numeroCaja === ""){
                validationConditions.push(' Número de Caja');
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
            <h6 className="title pb-2">Registro de Caja - SECRETARIA DE HACIENDA</h6>
            <div className="row">
                <label className="col-sm-3 col-form-label form-label">Entidad</label>
                <div className="col-sm-9">
                    <input type="text" className="form-control" disabled={true} value={ proyecto }/>
                </div>
            </div>
            <div className=" row">
                <label className="col-sm-3 col-form-label form-label">Dependecia</label>
                <div className="col-sm-9">
                     <Select
                        isDisabled={proyectoId== 4 ? true : false}
                        options={dependencias}    
                        value={dependencia}    
                        placeholder=''
                        onChange={(selectedOption) => handleSelectDependenciaChange(selectedOption)}
                        />
                </div>
            </div>
            <div className=" row">
            <label className="col-sm-3 col-form-label form-label">Sub Dependencia</label>
                <div className="col-sm-9">
                    <Select
                        isDisabled={proyectoId== 4 ? true : false}
                        options={oficinas}   
                        placeholder=''
                        value={oficina}    
                        onChange={(selectedOption) => handleSelectSubDependenciaChange(selectedOption)}
                        />
                </div>
            </div>
            <div className="row d-none">
                <label className="col-sm-3 col-form-label form-label">Vigencia</label>
                <div className="col-sm-9">
                    <Select                        
                        isDisabled={proyectoId== 4 ? true : false}
                        options={vigencias}    
                        placeholder=''
                        value={vigencia}    
                        onChange={(selectedOption) => handleSelectVigenciaChange(selectedOption)}
                        />
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
    <div className='row pt-3'>
        <div className='col-md-12'>
            <div id="accordion" className="accordion">
                <div className="accordion-item">
                    <a href="#" className="accordion-head" data-bs-toggle="collapse" data-bs-target="#accordion-item-1" aria-expanded="false">
                        <h6 className="title">Registro de carpeta</h6>
                        <span className="accordion-icon" />
                    </a>
                    <div className="accordion-body collapse show" id="accordion-item-1" data-bs-parent="#accordion" style={{}}>
                        <div className="accordion-inner">

                            <div className='row'>
                                <div className='col-md-3'>
                                    <label className='form-label'>Serie</label>
                                    <Select
                                        isDisabled={proyectoId== 4 ? true : false}
                                        options={series}   
                                        value={serie}    
                                        onChange={(selectedOption) => handleSelectSerieChange(selectedOption)}
                                        placeholder='Series'
                                        />
                                </div>
                                <div className='col-md-3'>
                                    <label className='form-label'>Subserie</label>
                                    <Select
                                        isDisabled={proyectoId== 4 ? true : false}
                                        options={subseries}  
                                        value={subserie}    
                                        onChange={(selectedOption) => handleSelectSubserieChange(selectedOption)}
                                        placeholder='Subseries'
                                        />
                                </div>  
                                 <div className='col-md-6'>
                                    <label className='form-label'>Nombre del Asunto  (Titulo de la Carpeta)</label>
                                    <Select
                                        options={tipoDocumentos}  
                                        value={tipoDocumento}                                           
                                        onChange={(selectedOption) => handleSelectTipoDocumentoChange(selectedOption)}
                                        placeholder='Tipo Documental'
                                        />
                                </div>                             
                            </div>
                            <div className='row mt-2'>
                                <div className='col-md-4'>
                                    <label className='form-label'>No de Comprobante</label>
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
                                <div className='col-md-4'>
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
                            <div className="col-md-6">
                                    <label className='form-label'>Otro</label>
                                        <input 
                                            name="cedulaCatastral"
                                            value={cedulaCatastral}
                                            onChange={handleInputChange}
                                            type="text" 
                                            className="form-control" 
                                            placeholder=''/>
                                </div>                                
                                <div className='col-md-6 '>
                                    <label className='form-label'>Soporte</label>
                                    <Select
                                        options={soportes}
                                        placeholder='' 
                                        value={tipoSoporte}    
                                        onChange={(selectedOption) => handleSelectSoporteChange(selectedOption)}
                                        />
                                </div>
                                <div className="col-md-3 d-none">
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

                                
                                <div className='col-md-3 d-none'>
                                    <label className='form-label'>Frecuencia</label>
                                    <Select
                                        options={frecuencias}    
                                        placeholder='' 
                                        isDisabled={true}
                                        value={frecuenciaUso}    
                                        onChange={(selectedOption) => handleSelectFrecuenciaChange(selectedOption)}
                                        />
                                </div>
                               
                               
                                <div className="col-md-2 d-none">
                                    <label className='form-label'>Auto de Cierre</label>
                                    <Select
                                        options={[{ value: 0, label: 'No'}]}    
                                        placeholder='' 
                                        defaultValue={{ value: 0, value: 'No' }}
                                        value={autoDeCierre}    
                                        onChange={(selectedOption) => handleSelectAutoDeCierreChange(selectedOption)}
                                        />
                                </div>

                                <div className='col-md-6 d-none'>
                                    <label className='form-label'>Duplicidad</label>
                                    <div className="form-control-wrap">
                                        <div className="input-group">
                                            <input 
                                                name="duplicidad"
                                                value={duplicidad}
                                                onChange={handleInputChange}
                                                type="text" 
                                                className="form-control" 
                                                placeholder=''
                                                min={0}
                                                autoComplete="off"/>
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
    <div className='row pt-3'>
        <div className='col-md-12'>
            <TablaCarpetas  tipoOrigen={2}/>
        </div>
    </div>
    </>
  )
}   