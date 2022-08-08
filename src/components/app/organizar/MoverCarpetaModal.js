import React from 'react'
import { useCarpetaStore } from '../../../hooks';
import { RotuloCaja } from './RotuloCaja';
import Modal from 'react-modal';
import { RotuloCarpeta } from './RotuloCarpeta';

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

    const { carpetaActiva, isOpenModalMoverCarpeta, closeModalMoverCarpeta } = useCarpetaStore();

    Modal.setAppElement('#root');

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // console.log('aqui');
        // console.log(carpetaActiva);
    }
    
    function closeModal() {
      console.log('cerrado');
      closeModalMoverCarpeta({}, false);
    }

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
                    <div className='col-md-12'>
                        <div className="form-group">
                          <label className="form-label" htmlFor="cf-full-name">
                            Nuevo número de caja
                          </label>
                          <input type="text" className="form-control" id="cf-full-name" />
                        </div>
                        <div className="form-group">
                          <label className="form-label" htmlFor="cf-full-name">
                            Nuevo número de Carpeta (posición en la caja)
                          </label>
                          <input type="text" className="form-control" id="cf-full-name" />
                        </div>
                        <div className="form-group">
                          <button type="button" className="btn btn-outline-primary btn-dim">
                            Mover carpeta
                          </button>
                          &nbsp;&nbsp;
                          <button type="button" className="btn btn-dim btn-outline-secondary">
                            Cancelar
                          </button>
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
