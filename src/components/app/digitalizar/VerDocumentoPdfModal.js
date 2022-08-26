import React from 'react'
import Modal from 'react-modal';

import { useCarpetaStore } from '../../../hooks';
import  VerPdfCompleto  from '../pdf/VerPdfCompleto';

export const VerDocumentoPdfModal = () => {

  Modal.setAppElement('#root');

  const { 
    closeModalVerPdf, carpetaActiva, isLoadingAsignarPdf, isOpenModalVerPdf
  } = useCarpetaStore();

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
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
                    left: '5%',
                    right: '5%',
                    bottom: '2%',
                    border: '1px solid #ccc',
                    background: '#fff',
                    overflow: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    borderRadius: '4px',
                    outline: 'none',
                    padding: '0px'
                }}
            }
            contentLabel="Imagen de carpeta Pdf"> 

              <div className="modal-header">
               
                <h6 className="modal-title">
                  Serie-Subserie: <small>{carpetaActiva?.serie?.descripcion} - {carpetaActiva?.subserie?.descripcion}</small> - 
                  Expediente: <small>{carpetaActiva?.codigo}</small> - 
                  Cédula Catastral: <small>{carpetaActiva?.cedulaCatastral}</small>
                </h6>
                <ul className="btn-toolbar">   
                    <a href="#" onClick={closeModal} className="close">
                        <em className="icon ni ni-cross" />
                    </a>
                </ul>
             </div> 
              {/* https://www.dropbox.com/s/q50rol56e66i926/sample%20-%20copia.pdf?dl=0 */}
              <VerPdfCompleto pdf={"https://dl.dropboxusercontent.com/s/0wtf8q2jwbwteud/2014-0001.PDF"}/>   
              {/* <div className='col-md-12 pt-2'>
                 <RotuloCarpeta />
              </div>  */}
        </Modal>
    </>
  )
}
