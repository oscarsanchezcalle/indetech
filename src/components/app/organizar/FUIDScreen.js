import React, { useEffect } from 'react';
import Select from 'react-select';

import { RotuloCaja } from './RotuloCaja';
import { TablaCarpetas } from './TablaCarpetas';

import 
{ 
    useAuthStore, useDependieciaStore, useOficinaStore, useSerieStore, useSubserieStore, useTipoDocumentoStore,
    useForm, useCarpetaStore, useVigenciaStore, useSoporteStore, useFrecuenciaStore
} from '../../../hooks';

export const FuidScreen = () => {

    const { proyectoId, proyecto } = useAuthStore();
    const { startLoadingDependencias, dependencias } = useDependieciaStore();
    const { startLoadingOficinas, oficinas } = useOficinaStore();
    const { series, startLoadingSeries } = useSerieStore();
    const { subseries, startLoadingSubseries } = useSubserieStore();
    const { tipoDocumentos, startLoadingTipoDocumentos } = useTipoDocumentoStore();
    const { vigencias, startLoadingVigencias } = useVigenciaStore();
    const { soportes, startLoadingSoportes } = useSoporteStore();
    const { frecuencias, startLoadingFrecuencias } = useFrecuenciaStore();

    const { crearCarpeta } = useCarpetaStore();
    
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
            autoDeCierre: ''
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
        }
    }, [proyectoId]);

    useEffect(() => {
        if(dependencias?.length > 0 && proyectoId == 1){
            handleSelectDependenciaChange(dependencias[0]);
        }
    }, [dependencias]);

    useEffect(() => {
        if(oficinas?.length > 0 && proyectoId == 1){
            handleSelectSubDependenciaChange(oficinas[0]);
        }
    }, [oficinas]);

    useEffect(() => {
        if(series?.length > 0 && proyectoId == 1){
            handleSelectSerieChange(series[0]);
        }
    }, [series]);

    const handleSelectDependenciaChange = ( selectedOption ) => {           
        startLoadingOficinas(selectedOption.value);
        handleSelectChange(selectedOption, "dependencia");
    }

    const handleSelectSubDependenciaChange = ( selectedOption ) => {           
        startLoadingSeries(selectedOption.value);
        handleSelectChange(selectedOption, "oficina");  
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

    const handleSelectVigenciaChange = ( selectedOption ) => {   
        handleSelectChange(selectedOption, "vigencia");
    }

    const handleSelectAutoDeCierreChange = ( selectedOption ) => {   
        handleSelectChange(selectedOption, "autoDeCierre");
    }

    const handleBtnAgregar = () => {
        crearCarpeta(formValues, proyectoId).then(() => {

            const frecuenciaDefault = frecuencias.find(f => f.label == 'Sin Frecuencia');
            const tipoSoporteDefault = soportes.find(f => f.label == 'Sin Soporte');

            resetFuidForm(frecuenciaDefault, tipoSoporteDefault);
        });
    }

    const handleBtnBuscarCaja = () => {
        

        //console.log(formValues)
        // console.log(proyectoId);
    }    

  return (
    <>
    <div className='row'>
        <div className='col-md-7'>
            <h6 className="title pb-2">Formato Único de Inventario Documental</h6>
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
                        isDisabled={proyectoId== 1 ? true : false}
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
                        isDisabled={proyectoId== 1 ? true : false}
                        options={oficinas}   
                        placeholder=''
                        value={oficina}    
                        onChange={(selectedOption) => handleSelectSubDependenciaChange(selectedOption)}
                        />
                </div>
            </div>
            <div className="row">
                <label className="col-sm-3 col-form-label form-label">Vigencia</label>
                <div className="col-sm-9">
                    <Select
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
                                onChange={handleInputChange}/>
                            <div className="input-group-append">
                                <button onClick={handleBtnBuscarCaja} className="btn btn-outline-primary btn-dim">Buscar Caja</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='col-md-5'>
            <RotuloCaja />
        </div>
    </div>
    <div className='row pt-3'>
        <div className='col-md-12'>
            <div id="accordion" className="accordion">
                <div className="accordion-item">
                    <a href="#" className="accordion-head" data-bs-toggle="collapse" data-bs-target="#accordion-item-1" aria-expanded="false">
                        <h6 className="title">Nuevo registro de carpeta</h6>
                        <span className="accordion-icon" />
                    </a>
                    <div className="accordion-body collapse show" id="accordion-item-1" data-bs-parent="#accordion" style={{}}>
                        <div className="accordion-inner">

                            <div className='row'>
                                <div className='col-md-4'>
                                    <label className='form-label'>Serie</label>
                                    <Select
                                        isDisabled={proyectoId== 1 ? true : false}
                                        options={series}   
                                        value={serie}    
                                        onChange={(selectedOption) => handleSelectSerieChange(selectedOption)}
                                        placeholder='Series'
                                        />
                                </div>
                                <div className='col-md-4'>
                                    <label className='form-label'>Subserie</label>
                                    <Select
                                        options={subseries}  
                                        value={subserie}    
                                        onChange={(selectedOption) => handleSelectSubserieChange(selectedOption)}
                                        placeholder='Subseries'
                                        />
                                </div>
                                <div className='col-md-4'>
                                    <label className='form-label'>Tipo Documental</label>
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
                                    <label className='form-label'>Fehas extremas</label>
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
                                <div className='col-md-3'>
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
                                <div className='col-md-3'>
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
                                <div className="col-md-2">
                                    <label className='form-label'>Código</label>
                                        <input 
                                            value={codigo}
                                            name="codigo"
                                            onChange={handleInputChange}
                                            type="text" 
                                            className="form-control" 
                                            placeholder=''
                                            autoComplete="off"/>
                                </div>
                            </div>
                            <div className='row mt-2'>
                                <div className='col-md-3'>
                                    <label className='form-label'>Soporte</label>
                                    <Select
                                        options={soportes}
                                        placeholder='' 
                                        value={tipoSoporte}    
                                        onChange={(selectedOption) => handleSelectSoporteChange(selectedOption)}
                                        />
                                </div>
                                <div className='col-md-3'>
                                    <label className='form-label'>Frecuencia</label>
                                    <Select
                                        options={frecuencias}    
                                        placeholder='' 
                                        value={frecuenciaUso}    
                                        onChange={(selectedOption) => handleSelectFrecuenciaChange(selectedOption)}
                                        />
                                </div>
                                <div className="col-md-2">
                                    <label className='form-label'>Cédula Catastral</label>
                                        <input 
                                            name="cedulaCatastral"
                                            value={cedulaCatastral}
                                            onChange={handleInputChange}
                                            type="text" 
                                            className="form-control" 
                                            placeholder=''/>
                                </div>
                                <div className='col-md-2'>
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
                                <div className="col-md-2">
                                    <label className='form-label'>Auto de Cierre</label>
                                    <Select
                                        options={[{ value: 1, label: 'Si' }, { value: 0, label: 'No'}]}    
                                        placeholder='' 
                                        value={autoDeCierre}    
                                        onChange={(selectedOption) => handleSelectAutoDeCierreChange(selectedOption)}
                                        />
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
                                        className="btn btn-outline-primary btn-dim  mt-1 btn-block">
                                        Agregar
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
            <TablaCarpetas />
        </div>
    </div>
    </>
  )
}
