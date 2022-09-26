import React from 'react'
import { 
        useAuthStore, useCarpetaStore, 
        useFormSelects, useCajaStore } from '../../../hooks';
import Modal from 'react-modal';
import { RotuloCarpeta } from './RotuloCarpeta';
import { LoadingInButton } from '../LoadingInButton';
import Creatable  from 'react-select/creatable';
import Swal from 'sweetalert2';

export const MoverCarpetaGobernacionModal = () => {

    const { cajas, startLoadingCajasByProyecto, buscarRotuloCajaById } = useCajaStore();
    const { proyectoId, username } = useAuthStore();
    const { 
      carpetaActiva, isOpenModalMoverCarpetaGobernacion, isLoadingAddCarpeta, 
      closeModalMoverCarpetaGobernacion, moverCarpetaGobernacion 
    } = useCarpetaStore();

    const documentoForm = {
      caja: {},
    };

    const [formValues, handleSelectChange] = useFormSelects(documentoForm);

    const {
        caja
    } = formValues;
  
    const handleSelectCajaChange = ( selectedOption ) => {  
      handleSelectChange(selectedOption, "caja");
    }

    Modal.setAppElement('#root');

    function afterOpenModal() {
        //modifico el formulario con el estado global.
        startLoadingCajasByProyecto(proyectoId);
    }
    
    function closeModal() {
      //console.log('cerrado');
      closeModalMoverCarpetaGobernacion({}, false);
    }

    const handleBtnMover = async () => {
      
      if( carpetaActiva.cajaId === formValues.caja?.cajaId )
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

      if( formValues.caja?.value === '' )
      {
        Swal.fire({
          //position: 'top-end',
          icon: 'warning',
          title: 'Campos incompletos',
          text: 'Por favor diligencia la caja.',
          showConfirmButton: true,
          //timer: 1500
        });
        return;
      }

      const moverCriteria = {
        "carpetaId": carpetaActiva.id,
        "cajaIdActual": carpetaActiva.cajaId,
        "cajaIdNueva": formValues.caja.cajaId ? formValues.caja.cajaId : 0,
        "proyectoId": parseInt(proyectoId),
        "numeroCaja": formValues.caja.cajaId ? 0 : parseInt(formValues.caja.value),
        "username": username
      }

     const fueMovida =  await moverCarpetaGobernacion(moverCriteria);

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
        isOpen={isOpenModalMoverCarpetaGobernacion}
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
                                //isLoading={true}
                                onChange={(selectedOption) => handleSelectCajaChange(selectedOption)}
                                />
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
                <RotuloCarpeta tipoOrigen={3} />
              </div>
            </div>
            {/* <div className="row">
              <div className="col-md-12">
                <RotuloCajaHorizontal/>
              </div>
            </div>
  */}
          </div>

        </Modal>
    </>
  )
}
