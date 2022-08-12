import React, { useEffect } from 'react'
import { useAuthStore, useCarpetaStore, useDependieciaStore, useForm, useOficinaStore, useVigenciaStore } from '../../../hooks';
import { RotuloCaja } from './RotuloCaja';
import Modal from 'react-modal';
import { RotuloCarpeta } from './RotuloCarpeta';
import { LoadingInButton } from '../LoadingInButton';
import Select from 'react-select';

export const MoverCarpetaModal = () => {

    const customStyles = {
      content: {
          top: '55%',
          left: '50%',
          right: '0%',
          bottom: 'auto',
          marginRight: '-30%',
          transform: 'translate(-50%, -50%)',
      }
    };

    const { startLoadingDependencias, dependencias, dependenciaActiva } = useDependieciaStore();
    const { startLoadingOficinas, oficinas, oficinaActiva } = useOficinaStore();
    const { vigencias, startLoadingVigencias, vigenciaActiva } = useVigenciaStore();
    const { proyectoId } = useAuthStore();
    const { carpetaActiva, isOpenModalMoverCarpeta, isLoadingAddCarpeta, closeModalMoverCarpeta } = useCarpetaStore();

    const documentoForm = {
      dependencia: {},
      oficina: {},
      vigencia: {},
      caja: {}
    };

    const [formValues, handleInputChange, handleSelectChange] = useForm(documentoForm);

    const {
        dependencia,
        oficina,
        vigencia,
        caja,
    } = formValues;

    const handleSelectDependenciaChange = ( selectedOption ) => {           
      startLoadingOficinas(selectedOption.value);
      handleSelectChange(selectedOption, "dependencia");
    }

    const handleSelectSubDependenciaChange = ( selectedOption ) => {           
        handleSelectChange(selectedOption, "oficina");  
    }

    const handleSelectVigenciaChange = ( selectedOption ) => {   
      handleSelectChange(selectedOption, "vigencia");
    }

    // el useEffect setea el estado del formulario.
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
      if(vigencias?.length > 0 && proyectoId == 1){
          handleSelectVigenciaChange(vigencias[2]);
      }
    }, [vigencias]);

    Modal.setAppElement('#root');

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        //modifico el formulario con el estado global.
        handleSelectDependenciaChange(dependenciaActiva);
        handleSelectSubDependenciaChange(oficinaActiva);
        handleSelectVigenciaChange(vigenciaActiva);

        //console.log(formValues);
        
        // console.log('aqui');
        //console.log(carpetaActiva);
    }
    
    function closeModal() {
      //console.log('cerrado');
      closeModalMoverCarpeta({}, false);
    }

    const handleBtnMover = () => {
      console.log("mover");
    };

  return (
    <>
     <Modal
        isOpen={isOpenModalMoverCarpeta}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Mover Carpeta"> 

          <div className="modal-header pb-2">
            <h5 className="modal-title">Mover Carpeta</h5>
            <ul className="btn-toolbar">   
                <a href="#" onClick={closeModal} className="close">
                    <em className="icon ni ni-cross" />
                </a>
            </ul>
          </div>
          <div className="modal-body modal-body-lg pt-5">
              <div className="row">
              <div className="col-md-12">
                <RotuloCarpeta />
                </div>
              </div>
            <div className='row mt-2'>
              <div className='col-md-6'>
                  <RotuloCaja/>
              </div>
              <div className='col-md-6'>
                   <div className="code-block">
                    <h6 className="overline-title title">Mover carpeta</h6>
                    <div className='row'>
                      <div className='col-md-6'>
                          <div className="form-group">
                            <label className="form-label" htmlFor="cf-full-name">
                              Dependencia
                            </label>
                            <Select
                              // isDisabled={proyectoId== 1 ? true : false}
                              options={dependencias}    
                              value={dependencia}    
                              placeholder=''
                              onChange={(selectedOption) => handleSelectDependenciaChange(selectedOption)}
                              />
                          </div>
                      </div>
                      <div className='col-md-6'>
                          <div className="form-group">
                            <label className="form-label" htmlFor="cf-full-name">
                              Sub Dependencia
                            </label>
                            <Select
                              // isDisabled={proyectoId== 1 ? true : false}
                              options={oficinas}   
                              placeholder=''
                              value={oficina}    
                              onChange={(selectedOption) => handleSelectSubDependenciaChange(selectedOption)}
                              />
                          </div>
                      </div>
                    </div>
                    <div className='row mt-2'>
                      <div className='col-md-6'>
                          <div className="form-group">
                            <label className="form-label" htmlFor="cf-full-name">
                              Vigencia
                            </label>
                            <Select
                                options={vigencias}    
                                placeholder=''
                                value={vigencia}    
                                onChange={(selectedOption) => handleSelectVigenciaChange(selectedOption)}
                                />
                          </div>
                      </div>
                      <div className='col-md-6'>
                          <div className="form-group">
                            <label className="form-label" htmlFor="cf-full-name">
                              Caja
                            </label>
                            <input type="text" className="form-control" id="cf-full-name" />
                          </div>
                      </div>
                    </div>
                    <div className='row mt-2'>
                        <div className='col-md-6'>
                          <div className="form-group">
                            <label className="form-label" htmlFor="cf-full-name">
                              Nuevo número de Carpeta
                            </label>
                            <input type="text" className="form-control" id="cf-full-name" />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className="form-group">
                              <button 
                                  onClick={handleBtnMover}
                                  type="button"
                                  disabled={isLoadingAddCarpeta}
                                  className="btn btn-lg  btn-outline-primary btn-dim  mt-4 btn-block">
                                      <LoadingInButton isLoading={isLoadingAddCarpeta} btnText="Mover carpeta" />
                              </button>
                          </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>

          </div>

        </Modal>
    </>
  )
}
