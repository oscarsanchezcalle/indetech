import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import Switch from "react-switch";

import { useCarpetaStore, useForm, useTipoDocumentoStore } from '../../../hooks';
import VerPdfCompleto from '../pdf/VerPdfCompleto';

export const IndexarDocumento = () => {
  
  const [height, setheight] = useState("500px");
 
  const { carpetaActiva } = useCarpetaStore();
  const { tipoDocumentos, startLoadingTipoDocumentosFromIndexar } = useTipoDocumentoStore();

  const documentoForm = {
    tipoDocumento:{},
    folioInicial: '',
    folioFinal: '',
    folios: '',
    notas: '',
    fecha: '',
    switchFolios: false
  };

  const [formValues, handleInputChange, handleSelectChange] = useForm(documentoForm);
 
  const {
    tipoDocumento,
    folioInicial,
    folioFinal,
    folios,
    notas,
    fecha,
    switchFolios
  } = formValues;

  useEffect(() => {
    setheight((window.innerHeight * 0.80) + 'px');
    if(carpetaActiva.subserieId > 0 ){
      startLoadingTipoDocumentosFromIndexar(carpetaActiva.subserieId);
    }
  }, []);

  useEffect(() => {
    try{
      const restaFolio = parseInt(folioFinal) - parseInt(folioInicial);
      
      if (parseInt(folioFinal) >= parseInt(folioInicial)){
        if(restaFolio === 0){
          if(parseInt(folioFinal) > 0){
            handleSelectChange(1, "folios")
          }else{
            handleSelectChange(0, "folios")
          }
          return;
        }
        
        if(restaFolio > 0){
          if(parseInt(folioInicial) > 0){
            handleSelectChange(restaFolio+1, "folios")
          }else{
            handleSelectChange("", "folios")
          }
  
          return;
        }
      }else{
        handleSelectChange("", "folios")
      }
    }catch(error){}
  }, [folioInicial, folioFinal]);

  const handleSelectTipoDocumentoChange = ( selectedOption ) => {    
    handleSelectChange(selectedOption, "tipoDocumento");
  }

  const handleBtnCrearDocumento = () => {
    console.log(formValues);
  }

  const handleFolioSwitchChange = (nextChecked) => {
    handleSelectChange(nextChecked, "switchFolios");
  };

  return (
    <>
      <div className='row'>
        <div className='col-md-8 pb-0' >
          <div className="nk-block">
            <div className="card card-bordered">
              <div className="card-aside-wrap">
                <div className="card-content">
                  <ul className="p-0 nav-tabs-card" style={{height: height}}>
                    <VerPdfCompleto pdf={"https://dl.dropboxusercontent.com/s/0wtf8q2jwbwteud/2014-0001.PDF"}/>   
                  </ul>
                </div>
               </div>
              </div>
            </div>
        </div>
        <div className='col-md-4'>
          <div className="nk-block nk-block-lg">
            <div className="nk-block-head-content">
              <h4 className="title nk-block-title">Indexar Documento</h4>
                <p className="modal-title pt-1 pb-1 border-bottom border-top">
                  <b>Serie:</b> {carpetaActiva?.serie?.descripcion}
                  <br/> 
                  <b>Subserie:</b> {carpetaActiva?.subserie?.descripcion}
                  <br/>
                  <b>Expediente:</b> {carpetaActiva?.codigo}
                  <br/>
                  <b>Cédula Catastral:</b> {carpetaActiva?.cedulaCatastral}
                </p>
              </div>
            <div className="row pt-2">
              <div className="form-group">
                  <label className="form-label">Tipo Documental</label>
                  <div className="form-control-wrap">
                  <Select
                      options={tipoDocumentos}  
                      value={tipoDocumento}  
                      onChange={(selectedOption) => handleSelectTipoDocumentoChange(selectedOption)}
                      placeholder='Tipo Documental'
                      />
                  </div>
              </div>
            </div>
            <div className='row pt-2'>
              <div className='col-md-6'>
                <label className='form-label'>Rango de Folios</label>
                <div className="input-group">
                    <input 
                        name="folioInicial"
                        onChange={handleInputChange}
                        type="number" 
                        className="form-control"
                        value={folioInicial} 
                        placeholder='Inicial'
                        autoComplete="off"
                        disabled={switchFolios}/>
                    <input 
                        name="folioFinal"
                        onChange={handleInputChange}
                        value={folioFinal}
                        min={formValues.folioInicial}
                        type="number" 
                        className="form-control" 
                        placeholder='Final'
                        autoComplete="off"
                        disabled={switchFolios}/>
                </div>
              </div>
              <div className='col-md-2 p-0'>
                <label className="form-label">
                  <h6>&nbsp;&nbsp;&nbsp;&nbsp;<em className="ni ni-exchange"></em></h6>
                </label>
                <h4>
                <Switch 
                     //onChange={(c) => handleSwitchChange(c,'switchFolios')} 
                     onChange={handleFolioSwitchChange}
                     checked={switchFolios}
                     className="react-switch"
                     onColor="#86d3ff"
                      onHandleColor="#2693e6"
                      handleDiameter={30}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                      height={20}
                      width={48}
                     />
                  
                </h4>
              </div>
              <div className='col-md-4'>
                <label className="form-label">
                  Folios
                </label>
                <input
                      value={folios}
                      name="folios"
                      disabled={!switchFolios}
                      onChange={handleInputChange} 
                      type="text" 
                      autoComplete="off"
                      className="form-control" />
              </div>
            </div>
            <div className='row pt-2'>
              <div className='col-md-12'>
                <label className="form-label">
                  Fecha del documento
                </label>
                <input 
                  type="date"
                  className="form-control"
                  value={fecha}
                  name="fecha"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className='row pt-2'>
              <div className='col-md-12'>
                <label className="form-label">
                  Observaciones
                </label>
                <div className="form-control-wrap">
                    <textarea 
                       value={notas}
                       onChange={handleInputChange} 
                       name="notas"
                       autoComplete="off"
                       className="form-control no-resize"></textarea>
                </div>
              </div>
            </div>
              <div className="modal-footer pt-2 p-0">
                <button type="button" onClick={handleBtnCrearDocumento} className="btn btn-primary">Crear documento</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Volver</button>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}
