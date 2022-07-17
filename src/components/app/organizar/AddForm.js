import React from "react";
import Select from "react-select";

import 
{ 
    useSerieStore, useSubserieStore, useTipoDocumentoStore,
    useForm, useFormStore, useCarpetaService
} from '../../../hooks';

export const AddForm = () => {

   const { series } = useSerieStore();
   const { subseries, startLoadingSubseries } = useSubserieStore();
   const { tipoDocumentos, startLoadingTipoDocumentos } = useTipoDocumentoStore();
   const { fuidForm } = useFormStore();
   const { crearCarpeta } = useCarpetaService();
   
   //useForm
   const documentoForm = {};
   const [formValues, handleInputChange, handleSelectChange, reset] = useForm(documentoForm);
    
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
        handleSelectChange(selectedOption, "soporte");
   }

   const handleSelectFrecuenciaChange = ( selectedOption ) => {   
        handleSelectChange(selectedOption, "frecuencia");
   }

   const handleBtnAgregar = () => {
        crearCarpeta(fuidForm, formValues);
   }

  return (
    <>
    <div id="accordion" className="accordion">
        <div className="accordion-item">
          <a href="#" className="accordion-head" data-bs-toggle="collapse" data-bs-target="#accordion-item-1" aria-expanded="false">
            <h6 className="title">Nuevo registro de carpeta</h6>
            <span className="accordion-icon" />
          </a>
          <div className="accordion-body collapse show" id="accordion-item-1" data-bs-parent="#accordion" style={{}}>
            <div className="accordion-inner">

                <div className='row'>
                    <div className='col-md-3'>
                        <label className='form-label'>Serie</label>
                        <Select
                            options={series}   
                            onChange={(selectedOption) => handleSelectSerieChange(selectedOption)}
                            placeholder='Series'
                            />
                    </div>
                    <div className='col-md-3'>
                        <label className='form-label'>Subserie</label>
                        <Select
                            options={subseries}   
                            onChange={(selectedOption) => handleSelectSubserieChange(selectedOption)}
                            placeholder='Subseries'
                            />
                    </div>
                    <div className='col-md-3'>
                        <label className='form-label'>Tipo Documental</label>
                        <Select
                            options={tipoDocumentos}   
                            onChange={(selectedOption) => handleSelectTipoDocumentoChange(selectedOption)}
                            placeholder='Tipo Documental'
                            />
                    </div>
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
                </div>
                <div className='row mt-2'>
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
                        <input
                            name="folios"
                            onChange={handleInputChange}
                            type="number" 
                            className="form-control" 
                            min="0"/>
                    </div>
                    <div className='col-md-2'>
                        <label className='form-label'>Soporte</label>
                        <Select
                            options={[{ value: '1', label: 'Serie  jhsdgfjhsdgfjshgfkjshgfkhjsdgfkjhsdf1' }]}
                            placeholder=''         
                            onChange={(selectedOption) => handleSelectSoporteChange(selectedOption)}
                            />
                    </div>
                    <div className='col-md-2'>
                        <label className='form-label'>Frecuencia</label>
                        <Select
                            options={[{ value: '2', label: 'Serie 1' }]}    
                            placeholder=''         
                            onChange={(selectedOption) => handleSelectFrecuenciaChange(selectedOption)}
                            />
                    </div>
                    <div className='col-md-2'>
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
    </>
  )
}
