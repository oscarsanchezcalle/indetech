import React from 'react'
import Modal from 'react-modal';
import { dropboxToRender } from '../../../helpers';
import { useCarpetaStore } from '../../../hooks';
import { RotuloCarpeta } from '../organizar/RotuloCarpeta';
import Dropbox from 'https://www.dropbox.com/static/api/2/dropins.js';

export const VerDocumentoPdfModal = () => {

  Modal.setAppElement('#root');

  const { 
    closeModalVerPdf, carpetaActiva, isLoadingAsignarPdf, isOpenModalVerPdf
  } = useCarpetaStore();

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // dropboxToRender();
      var element = document.getElementById("visor-pdf");

      var options = {
        // Shared link to Dropbox file
        link: "https://www.dropbox.com/sh/keptcjl08q3wsid/AACui966iXcXPbagCJ2py2L-a?dl=0",
        file: {
          // Sets the zoom mode for embedded files. Defaults to 'best'.
          zoom: "best" // or "fit"
        },
        folder: {
          // Sets the view mode for embedded folders. Defaults to 'list'.
          view: "list", // or "grid"
          headerSize: "normal" // or "small"
        }
      }

       Dropbox.embed(options, element)
  }

  function closeModal() {
    closeModalVerPdf({}, false);

  }

  const pruebaDropbox = () => {
    
    // create session ref:
    // const dropbox = dropboxV2Api.authenticate({
    //   token: 'sl.BNuPfL2AvN-hQM-WcJLUNjKqUFMQ0T5E0ouNH1iTTJEeKnD83h2GhGpzvamc7vN59ZD5aK7AY1FLAiXogMj6a1onocO10_RKIBMn1mcbfHEN9CWXJLxd_Susv4EAsWWjCRDwd20kkZVm'
    // });
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

              <div className="modal-header">
               
                <h5 className="modal-title">Detalle de Carpeta con Imagen</h5>
                <ul className="btn-toolbar">   
                    <a href="#" onClick={closeModal} className="close">
                        <em className="icon ni ni-cross" />
                    </a>
                </ul>
             </div> 
             <div id="visor-pdf"></div>
              {/* <a href={carpetaActiva.fileUrl}
                  className="dropbox-embed mt-4"
                  data-height="500px"
                  data-width="100%"
              ></a> */}
                  
              <div className='col-md-12 pt-2'>
                 <RotuloCarpeta />
              </div> 
        </Modal>
    </>
  )
}
