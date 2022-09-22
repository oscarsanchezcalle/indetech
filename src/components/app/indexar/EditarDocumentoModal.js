import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import Switch from "react-switch";
import { parseISO, format } from 'date-fns'

import Modal from 'react-modal';

import { useAuthStore, useCarpetaStore, useDocumentoStore, useFormBasic, useTipoDocumentoStore } from '../../../hooks';
import { RotuloCarpeta } from '../organizar/RotuloCarpeta';
import { LoadingInButton } from '../LoadingInButton';

export const EditarDocumentoModal = () => {
  
  Modal.setAppElement('#root');
  const [verNombreDocumento, setVerNombreDocumento] = useState(false);
  
  const { username, proyectoId } = useAuthStore();
  const { tipoDocumentos } = useTipoDocumentoStore();
  const { editarDocumento } = useDocumentoStore();
  const { carpetaActiva } = useCarpetaStore();

  const documentoForm = {
    tipoDocumento:{},
    folioInicial: '',
    folioFinal: '',
    folios: '',
    notas: '',
    fecha: '',
    switchFolios: false,
    nombreDocumento: ''
  };

  const [formValues, handleInputChange, handleSelectChange, setFormValues] = useFormBasic(documentoForm);
 
  const {
    tipoDocumento,
    folioInicial,
    folioFinal,
    folios,
    notas,
    fecha,
    switchFolios,
    nombreDocumento
  } = formValues;

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

    useEffect(() => {
      try{
          if(switchFolios){
            handleSelectChange("", "folioInicial");      
          }
      }catch(error){}
    }, [switchFolios]);

    useEffect(() => {
      try{
          if(switchFolios){
            handleSelectChange("", "folioFinal");      
          }
      }catch(error){}
    }, [folioInicial]);
    
    useEffect(() => {
      if(tipoDocumento.label == "Oficio"){
        setVerNombreDocumento(true);
        return;
      }

      setVerNombreDocumento(false);
    }, [tipoDocumento]);

    const handleFolioSwitchChange = (nextChecked) => {
      handleSelectChange(nextChecked, "switchFolios");
    };

    const { 
      documentoActivo, closeModalEditarDocumento, isOpenModalEditarDocumento,
      isLoadingEditDocumento
    } = useDocumentoStore();
   
    function afterOpenModal() {

      const newValues = {
        tipoDocumento:{
          label: documentoActivo.tipoDocumento.descripcion,
          value: documentoActivo.tipoDocumento.id,
        },
        folioInicial: documentoActivo.folioInicial,
        folioFinal: documentoActivo.foliofinal,
        folios: documentoActivo.folios,
        notas: documentoActivo.observaciones,
        fecha: format(parseISO(documentoActivo.fecha), 'yyyy-MM-dd'),
        switchFolios: false,
        nombreDocumento: documentoActivo.nombre,
      };
      
      setFormValues(newValues);
    }

    const handleSelectTipoDocumentoChange = ( selectedOption ) => {    
      handleSelectChange(selectedOption, "tipoDocumento");
    }

    function closeModal() {
      closeModalEditarDocumento({}, false);
    }

    const handleEditar = async () => {
      const isCorrect = await editarDocumento(formValues, documentoActivo.id, username, carpetaActiva.fechaInicial, carpetaActiva.fechaFinal, carpetaActiva.id, proyectoId);
      if(isCorrect){
        closeModal();
      }
   }
  return (
  <>
      <Modal
          isOpen={isOpenModalEditarDocumento}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={{
              overlay: {
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(255, 255, 255, 0.75)'
              },
              content: {
                  position: 'absolute',
                  top: '80px',
                  left: '10%',
                  right: '10%',
                  bottom: '10%',
                  border: '1px solid #ccc',
                  background: '#fff',
                  overflow: 'auto',
                  WebkitOverflowScrolling: 'touch',
                  borderRadius: '4px',
                  outline: 'none',
                  padding: '3px'
              }}
          }
          contentLabel="Asignar Pdf"> 

          <div className="modal-header pb-2">
              <h5 className="modal-title">Editar Documento</h5>
              <ul className="btn-toolbar">   
                  <a href="#" onClick={closeModal} className="close">
                      <em className="icon ni ni-cross" />
                  </a>
              </ul>
          </div>
          <div className="modal-body modal-body-lg pt-5">  
            <div className='row'>
              <div className='col-md-12'>
                  <RotuloCarpeta />
              </div>
            </div>
            <div className='row pt-3'>
              <div className='col-md-4'>
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
              <div className={`${verNombreDocumento ? "col-md-8 pb-3" : "d-none"}`}>
                <div className="form-group">
                    <label className="form-label">Nombre del documento</label>
                    <div className="form-control-wrap">
                      <input 
                      type="text"
                      className="form-control"
                      value={nombreDocumento}
                      name="nombreDocumento"
                      onChange={handleInputChange}
                    />
                    </div>
                </div>
              </div>
              <div className='col-md-4'>
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
              <div className='col-md-1 p-0'>
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
              <div className='col-md-3'>
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
            <div className='row pt-3 pb-3'>
              <div className='col-md-4'>
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
              <div className='col-md-8'>
                <label className="form-label">
                  Observaciones
                </label>
                <div className="form-control-wrap">
                    <input 
                       value={notas}
                       onChange={handleInputChange} 
                       name="notas"
                       autoComplete="off"
                       className="form-control" />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={handleEditar}  disabled={isLoadingEditDocumento} className="btn btn-outline-primary btn-dim">
                  <LoadingInButton isLoading={isLoadingEditDocumento} btnText="Editar" />
              </button>
              <button type="button" onClick={closeModal} className="btn btn-outline-secondary btn-dim">Cancelar</button>
            </div>  
          </div>
          
      </Modal>
    </>
  )
}
