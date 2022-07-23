import React, { useEffect, useLayoutEffect, useState } from 'react';
import Select from 'react-select';

import { RotuloCaja } from './RotuloCaja';
import { TablaCarpetas } from './TablaCarpetas';

import 
{ 
    useAuthStore, useDependieciaStore, useOficinaStore, useSerieStore, useSubserieStore, useTipoDocumentoStore,
    useForm, useCarpetaStore
} from '../../../hooks';

export const FuidScreen = () => {

    const { proyectoId, proyecto, objetoContrato  } = useAuthStore();
    const { startLoadingDependencias, dependencias, isSuccessDependencia } = useDependieciaStore();
    const { startLoadingOficinas, oficinas } = useOficinaStore();
    const { series, startLoadingSeries } = useSerieStore();
    const { subseries, startLoadingSubseries } = useSubserieStore();
    const { tipoDocumentos, startLoadingTipoDocumentos } = useTipoDocumentoStore();
    // Vigencia
    // Tipo Soporte
    // Frecuencia Uso

    const { crearCarpeta } = useCarpetaStore();
    
    //useForm
    const documentoForm = {
            proyectoIdForm: proyectoId,
            dependenciaId:0,
            subDependenciaId:0,
            oficinaId:0,
            vigenciaId:0,
            numeroCaja:0,
            serieId: 0,
            subserieId:0,
            tipoDocumentoId:0,
            tipoSoporteId:0,
            frecuenciaUsoId:0,
            fechaExtremaInicial: '0001-01-01T00:00:00.0Z', 
            fechaExtremaFinal: '0001-01-01T00:00:00.0Z',
            tomoActual: 0,
            tomoFinal: 0,
            folioInicial: 0,
            folioFinal: 0,
            codigo: '',
            notas: '',
            cedulaCatastral: '',
            duplicidad:0,
            autoDeCierre: false
    };

    const [formValues, handleInputChange, handleSelectChange, reset] = useForm(documentoForm);

    const {
        proyectoIdForm,
        dependenciaId,
        subDependenciaId,
        oficinaId,
        vigenciaId,
        numeroCaja,
        serieId,
        subserieId,
        tipoDocumentoId,
        tipoSoporteId,
        frecuenciaUsoId,
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
        }

    }, [proyectoId]);

    const handleSelectDependenciaChange = ( selectedOption ) => {           
        startLoadingOficinas(selectedOption.value);
        handleSelectChange(selectedOption, "dependenciaId");
    }

    const handleSelectSubDependenciaChange = ( selectedOption ) => {           
        startLoadingSeries(selectedOption.value);
        handleSelectChange(selectedOption, "subDependenciaId");  
    }

    const handleInputCajaChange = ( {target} ) => {           
        handleInputChange({target});
    }

    const handleSelectSerieChange = ( selectedOption) => {   
        startLoadingSubseries(selectedOption.value);
        handleSelectChange(selectedOption, "serieId");
    }

    const handleSelectSubserieChange = ( selectedOption) => {   
            startLoadingTipoDocumentos(selectedOption.value);
            handleSelectChange(selectedOption, "subserieId");
    }

    const handleSelectTipoDocumentoChange = ( selectedOption) => {    
            handleSelectChange(selectedOption, "tipoDocumentoId");
    }

    const handleSelectSoporteChange = ( selectedOption ) => {   
            handleSelectChange(selectedOption, "tipoSoporteId");
    }

    const handleSelectFrecuenciaChange = ( selectedOption ) => {   
            handleSelectChange(selectedOption, "frecuenciaUsoId");
    }

    const handleBtnAgregar = () => {
            crearCarpeta(formValues);
    }

    const handleBtnBuscarCaja = () => {
            console.log(dependencias);
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
                        options={dependencias}         
                        placeholder=''
                        onChange={(selectedOption) => handleSelectDependenciaChange(selectedOption)}
                        />
                </div>
            </div>
            <div className=" row">
            <label className="col-sm-3 col-form-label form-label">Sub Dependencia</label>
                <div className="col-sm-9">
                    <Select
                        options={oficinas}   
                        placeholder=''
                        onChange={(selectedOption) => handleSelectSubDependenciaChange(selectedOption)}
                        />
                </div>
            </div>
            <div className="row">
                <label className="col-sm-3 col-form-label form-label">Vigencia</label>
                <div className="col-sm-9">
                    <input type="text" className="form-control" disabled={true} value={objetoContrato}/>
                </div>
            </div>
            <div className=" row">
                <label className="col-sm-3 col-form-label form-label">Caja</label>
                <div className="col-sm-9">
                    <div className="form-control-wrap">
                        <div className="input-group">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder='Número de la caja'  
                                name="numeroCaja"                            
                                onChange={handleInputCajaChange}/>
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
                                        options={series}   
                                        onChange={(selectedOption) => handleSelectSerieChange(selectedOption)}
                                        placeholder='Series'
                                        />
                                </div>
                                <div className='col-md-4'>
                                    <label className='form-label'>Subserie</label>
                                    <Select
                                        options={subseries}   
                                        onChange={(selectedOption) => handleSelectSubserieChange(selectedOption)}
                                        placeholder='Subseries'
                                        />
                                </div>
                                <div className='col-md-4'>
                                    <label className='form-label'>Tipo Documental</label>
                                    <Select
                                        options={tipoDocumentos}   
                                        onChange={(selectedOption) => handleSelectTipoDocumentoChange(selectedOption)}
                                        placeholder='Tipo Documental'
                                        />
                                </div>
                            </div>
                            <div className='row mt-2'>
                            <div className='col-md-3'>
                                    <label className='form-label'>Fehas extremas</label>
                                    <div className="form-control-wrap">
                                        <div className="input-group">
                                            <input 
                                                name="fechaExtremaInicial" 
                                                onChange={handleInputChange} 
                                                type="date" 
                                                className="form-control"/>
                                            <input 
                                                name="fechaExtremaFinal"
                                                onChange={handleInputChange}
                                                type="date" 
                                                min={formValues.fechaExtremaInicial}
                                                className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-2'>
                                    <label className='form-label'>Tomos</label>
                                    <div className="form-control-wrap">
                                        <div className="input-group">
                                            <input 
                                                name="tomoActual"
                                                onChange={handleInputChange}
                                                type="number" 
                                                className="form-control" 
                                                placeholder='Actual'/>
                                            <input 
                                                name="tomoFinal"
                                                onChange={handleInputChange}
                                                min={formValues.tomoActual}
                                                type="number" 
                                                className="form-control" 
                                                placeholder='Final'/>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-2'>
                                    <label className='form-label'>Folios</label>
                                    <div className="form-control-wrap">
                                        <div className="input-group">
                                            <input 
                                                name="folioInicial"
                                                onChange={handleInputChange}
                                                type="number" 
                                                className="form-control" 
                                                placeholder='Inicial'/>
                                            <input 
                                                name="folioFinal"
                                                onChange={handleInputChange}
                                                min={formValues.folioInicial}
                                                type="number" 
                                                className="form-control" 
                                                placeholder='Final'/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                <label className='form-label'>Código</label>
                                    <input 
                                        name="Código"
                                        onChange={handleInputChange}
                                        type="number" 
                                        className="form-control" 
                                        placeholder=''/>
                                </div>
                                <div className='col-md-3'>
                                    <label className='form-label'>Soporte</label>
                                    <Select
                                        options={[{ value: 1, label: 'Serie  jhsdgfjhsdgfjshgfkjshgfkhjsdgfkjhsdf1' }]}
                                        placeholder=''         
                                        onChange={(selectedOption) => handleSelectSoporteChange(selectedOption)}
                                        />
                                </div>
                            </div>
                            <div className='row mt-2'>
                            <div className='col-md-3'>
                                    <label className='form-label'>Frecuencia</label>
                                    <Select
                                        options={[{ value: 1, label: 'Serie 1' }]}    
                                        placeholder=''         
                                        onChange={(selectedOption) => handleSelectFrecuenciaChange(selectedOption)}
                                        />
                                </div>
                                <div className='col-md-3'>
                                    <label className='form-label'>Notas</label>
                                    <div className="form-control-wrap">
                                        <div className="input-group">
                                            <input 
                                                type="text" 
                                                className="input-xs form-control"
                                                name="notas"
                                                onChange={handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-2'>
                                    <br />
                                    <button 
                                    onClick={handleBtnAgregar}
                                    type="button"
                                    className="btn btn-outline-primary btn-dim  mt-1 btn-block"
                                    >
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
