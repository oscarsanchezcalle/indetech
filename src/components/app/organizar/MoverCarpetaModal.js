import React, { useEffect } from 'react'
import { 
        useAuthStore, useCarpetaStore, useDependieciaStore, 
        useForm, useOficinaStore, useVigenciaStore, useCajaStore } from '../../../hooks';
import { RotuloCajaHorizontal } from './RotuloCajaHorizontal';
import Modal from 'react-modal';
import { RotuloCarpeta } from './RotuloCarpeta';
import { LoadingInButton } from '../LoadingInButton';
import Select from 'react-select';
import Creatable  from 'react-select/creatable';
import Swal from 'sweetalert2';


export const MoverCarpetaModal = () => {

    const { dependencias, dependenciaActiva } = useDependieciaStore();
    const { startLoadingOficinas, oficinas, oficinaActiva } = useOficinaStore();
    const { vigencias, vigenciaActiva } = useVigenciaStore();
    const { cajas, startLoadingCajas, buscarRotuloCajaById } = useCajaStore();
    const { proyectoId, username } = useAuthStore();
    const { carpetaActiva, isOpenModalMoverCarpeta, isLoadingAddCarpeta, 
            closeModalMoverCarpeta, moverCarpeta } = useCarpetaStore();

    const documentoForm = {
      dependencia: {},
      oficina: {},
      vigencia: {},
      caja: {},
      numeroCarpeta: ''
    };

    const [formValues, handleInputChange, handleSelectChange] = useForm(documentoForm);

    const {
        dependencia,
        oficina,
        vigencia,
        caja,
        numeroCarpeta
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
      
      if(dependenciaActiva && oficinaActiva && vigenciaActiva && proyectoId){
        const criteria = 
        {
            "proyectoId": parseInt(proyectoId),
            "dependenciaId": dependenciaActiva.value,
            "oficinaId": oficinaActiva.value,
            "vigenciaId": selectedOption.value
        };
        buscarCajas(criteria);
      }
    }

    const handleSelectCajaChange = ( selectedOption ) => {  
      handleSelectChange(selectedOption, "caja");
    }

    const buscarCajas = async (criteria) => { 
          await startLoadingCajas(criteria);
    }

    // el useEffect setea el estado del formulario.
    useEffect(() => {
      if(dependencias?.length > 0 && proyectoId == 1){
        return  handleSelectDependenciaChange(dependencias[0]);
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
        //modifico el formulario con el estado global.
        handleSelectDependenciaChange(dependenciaActiva);
        handleSelectSubDependenciaChange(oficinaActiva);
        handleSelectVigenciaChange(vigenciaActiva);
    }
    
    function closeModal() {
      //console.log('cerrado');
      closeModalMoverCarpeta({}, false);
    }

    const handleBtnMover = async () => {
      
      if( 
            vigenciaActiva.value === formValues.vigencia.value 
          && dependenciaActiva.value === formValues.dependencia.value
          && oficinaActiva.value === formValues.oficina.value
          && carpetaActiva.cajaId === formValues.caja?.cajaId
         )
      {
        Swal.fire({
          //position: 'top-end',
          icon: 'error',
          title: 'Acción no permitida',
          text: 'No se puede mover la carpeta dentro de la misma caja',
          showConfirmButton: true,
          //timer: 1500
        });
        return;
      }

      if( 
          formValues.caja?.value === ''
          || formValues.numeroCarpeta === ''
          || formValues.numeroCarpeta === '0'
        )
      {
        Swal.fire({
          //position: 'top-end',
          icon: 'warning',
          title: 'Campos incompletos',
          text: 'Por favor diligencia todos los campos.',
          showConfirmButton: true,
          //timer: 1500
        });
        return;
      }

      const moverCriteria = {
        "carpetaId": carpetaActiva.id,
        "numeroCarpeta": parseInt(formValues.numeroCarpeta),
        "cajaIdActual": carpetaActiva.cajaId,
        "cajaIdNueva": formValues.caja.cajaId ? formValues.caja.cajaId : 0,
        "proyectoId": parseInt(proyectoId),
        "dependenciaId": formValues.dependencia.value,
        "oficinaProductoraId": formValues.oficina.value,
        "vigenciaId": formValues.vigencia.value,
        "numeroCaja": formValues.caja.cajaId ? 0 : parseInt(formValues.caja.value),
        "username": username
      }

      const fueMovida =  await moverCarpeta(moverCriteria);

      if(fueMovida){
         await buscarRotuloCajaById(carpetaActiva.cajaId);
         closeModal();
      }
    };
    
    const onlyNumbers = (e) => {
        const keyCode = e.which ? e.which : e.keyCode
        //console.log(String.fromCharCode(e.keyCode));
        if(!(keyCode >= 48 && keyCode <= 57  || keyCode >= 37 && keyCode <= 40 
          || keyCode >= 8 && keyCode <= 10 || keyCode === 13
          )){
          // si es numero mato el evento y no deja meter letras
          e.preventDefault();
        }
    }

  return (
    <>
     <Modal
        isOpen={isOpenModalMoverCarpeta}
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
            top: '70px',
            left: '40px',
            right: '40px',
            bottom: '40px',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px'
          }
        }}
        contentLabel="Mover Carpeta"> 

          <div className="modal-header pb-2">
            <h5 className="modal-title">Mover carpeta a otra caja</h5>
            <ul className="btn-toolbar">   
                <a href="#" onClick={closeModal} className="close">
                    <em className="icon ni ni-cross" />
                </a>
            </ul>
          </div>
          <div className="modal-body modal-body-lg pt-5">            
            <div className='row'>
              <div className='col-md-12'>
                   <div className="code-block">
                    <h6 className="overline-title title">Mover carpeta</h6>
                    <div className='row'>
                      <div className='col-md-4'>
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
                      <div className='col-md-4'>
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
                      <div className='col-md-4'>
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
                    </div>
                    <div className='row mt-2'>
                     
                      <div className='col-md-4'>
                          <div className="form-group">
                            <label className="form-label" htmlFor="cf-full-name">
                              Caja
                            </label>
                            <Creatable
                                options={cajas}   
                                formatCreateLabel= {(inputValue) => `Crear Caja ${inputValue}`}
                                placeholder=''
                                value={caja}
                                onKeyDown={(e) => onlyNumbers(e)}
                                onChange={(selectedOption) => handleSelectCajaChange(selectedOption)}
                                />
                          </div>
                      </div>
                      <div className='col-md-4'>
                          <div className="form-group">
                            <label className="form-label" htmlFor="cf-full-name">
                              Nuevo número de Carpeta
                            </label>
                            
                            <input 
                               type="number" 
                               className="form-control" 
                               name="numeroCarpeta"   
                               value={numeroCarpeta}  
                               autoComplete="off"                       
                               onChange={handleInputChange}/>
                          </div>
                        </div>
                        <div className='col-md-4'>
                          <div className="form-group">
                              <button 
                                  onClick={handleBtnMover}
                                  type="button"
                                  disabled={isLoadingAddCarpeta}
                                  className="btn btn-lg bg-primary-dim text-primary btn-outline-light btn-dim  mt-4 btn-block">
                                      <LoadingInButton isLoading={isLoadingAddCarpeta} btnText="Mover carpeta" />
                              </button>
                          </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <RotuloCarpeta />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <RotuloCajaHorizontal/>
              </div>
            </div>
 
          </div>

        </Modal>
    </>
  )
}
