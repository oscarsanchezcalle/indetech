import React from 'react'
import Modal from 'react-modal';
import { parseISO, format } from 'date-fns'

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
                  { (typeof carpetaActiva?.fechaInicial != 'undefined')  &&
                    <>
                      <br />
                      Fechas Extremas: <small>{format(parseISO(carpetaActiva?.fechaInicial), 'yyyy-MM-dd')} - {format(parseISO(carpetaActiva?.fechaFinal), 'yyyy-MM-dd')}</small> - 
                      Folios: <small>{carpetaActiva?.folioInicial} - {carpetaActiva?.folioFinal} </small>
                    </>
                  }
                  
                </h6>
                <br/>
              
                <ul className="btn-toolbar">   
                    <a href="#" onClick={closeModal} className="close">
                        <em className="icon ni ni-cross" />
                    </a>
                </ul>
             </div> 
             {
                ( typeof carpetaActiva.fileUrl == "undefined" || carpetaActiva.fileUrl == "" )  
                  ? (
                    <VerPdfCompleto pdf={"./carpeta-sin-imagen.pdf"}/>

                  )
                  : (
                      <VerPdfCompleto pdf={carpetaActiva.fileUrl}/>
                  )
              }
        </Modal>
    </>
  )
}
