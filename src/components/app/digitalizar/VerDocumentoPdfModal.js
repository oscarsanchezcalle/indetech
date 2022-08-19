import React, { useState } from 'react'

import Modal from 'react-modal';

import { useCarpetaStore } from '../../../hooks';
import { RotuloCarpeta } from '../organizar/RotuloCarpeta';
import VerPdfCompleto from '../VerPdfCompleto';

export const VerDocumentoPdfModal = () => {
    
  Modal.setAppElement('#root');

  const { 
    closeModalVerPdf, carpetaActiva, isLoadingAsignarPdf, isOpenModalVerPdf
  } = useCarpetaStore();

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    console.log(carpetaActiva);
  }

  function closeModal() {
    closeModalVerPdf({}, false);
  }

 return (
    <>
        <Modal
            isOpen={isOpenModalVerPdf}
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
                    bottom: '2%',
                    border: '1px solid #ccc',
                    background: '#fff',
                    overflow: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    borderRadius: '4px',
                    outline: 'none',
                    padding: '20px'
                }}
            }
            contentLabel="Imagen de carpeta Pdf"> 

            <div className="modal-header pb-2">
                <h5 className="modal-title">Detalle de Carpeta con Imagen</h5>
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
                <div className='col-md-12'>
                    <VerPdfCompleto pdf="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"/>
                </div>
              </div>
              <div className="modal-footer mt-3">
                <button type="button" onClick={closeModal} className="btn btn-outline-secondary btn-dim">Cancelar</button>
              </div> 
            </div>
        </Modal>
    </>
  )
}
