import React, { useState } from 'react'

import Modal from 'react-modal';
import Swal from 'sweetalert2';

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { useCarpetaStore } from '../../../hooks';
import { RotuloCarpeta } from '../organizar/RotuloCarpeta';
import { RenderTree } from '../RenderTree';

export const AsignarImagenModal = () => {
  
  const [archivo, setArchivo] = useState("");

  Modal.setAppElement('#root');
  
  const { 
    carpetaActiva, isOpenModalAsignar, isLoadingDropbox,
    closeModalAsignar, buscarArchivosDropbox, archivosDropbox } = useCarpetaStore();

  //const { proyectoId, username } = useAuthStore();
  
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //console.log(carpetaActiva);
    buscarArchivosDropbox(carpetaActiva.proyectoId, false);
  }

  function closeModal() {
    closeModalAsignar({}, false);
  }

  const handleAsignar = () => {
    
    if (! archivo.includes("Archivo-")){
      Swal.fire({
          icon: 'error',
          title: 'Debes seleccionar un archivo',
          text: `Por favor selecciona un archivo en vez de una carpeta`,
          showConfirmButton: true,
          //timer: 1500
      });
      return;
    }

    const archivoId = archivo.replace('Archivo-','');

    //console.log(archivoId);
  }

  const handleRefrescar = () => {
    buscarArchivosDropbox(carpetaActiva.proyectoId, true);
  }
 
  const handleFileSelect = (event, nodeId) => {
    setArchivo(nodeId);
  };
  
  // var getSubMenuItem = function (subMenuItems, id) {
  //   console.log(subMenuItems);
  //   if (subMenuItems) {
  //       for (var i = 0; i < subMenuItems.length; i++) {
  //           if (subMenuItems[i].id == id) {
  //               return subMenuItems[i];
  //           }
  //           var found = getSubMenuItem(subMenuItems[i].items, id);
  //           if (found) return found;
  //       }
  //   }
  // };

  return (
    <>
        <Modal
            isOpen={isOpenModalAsignar}
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
            contentLabel="Asignar Pdf"> 

            <div className="modal-header pb-2">
                <h5 className="modal-title">Asignar PDF a Carpeta</h5>
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
                  {
                      ( isLoadingDropbox )  
                      ? (
                          <>
                              <i className="fas fa-circle-notch fa-spin"></i>&nbsp;
                              <label>Buscando archivos en Dropbox...</label>
                              <br/>
                              <br/>
                          </>
                      )
                      : (
                          <>
                            <div className="nk-block-between">
                              <div className="nk-block-head-content">
                                <h5 className="nk-block-title">Selecciona el archivo PDF asociado a la carpeta</h5>
                              </div>
                              <div className="nk-block-head-content">
                                <div className="toggle-wrap nk-block-tools-toggle">
                                  <a
                                    href="#"
                                    className="btn btn-icon btn-trigger toggle-expand me-n1"
                                    data-target="pageMenu"
                                  >
                                    <em className="icon ni ni-more-v" />
                                  </a>
                                  <div className="toggle-expand-content">
                                    <ul className="nk-block-tools g-3">
                                      <li>
                                        <a onClick = {handleRefrescar} className="btn btn-white btn-dim btn-outline-primary">
                                          <em className="icon ni ni-reload"></em>
                                          <span>Refrescar</span>
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                               </div>
                              </div>
                              <br />

                              {
                                  'id' in archivosDropbox && 
                                  <TreeView
                                    aria-label="rich object"
                                    defaultCollapseIcon={<ExpandMoreIcon />}
                                    defaultExpandIcon={<ChevronRightIcon />}
                                    onNodeSelect={handleFileSelect}
                                    sx={{ height: '100%', flexGrow: 1, maxWidth: '100%', overflowY: 'auto' }}
                                  >
                                    {RenderTree(archivosDropbox)}
                                  </TreeView>
                              }
                          </>
                      )
                  }
                </div>
              </div>  
              <div className="modal-footer">
                
                <button type="button" onClick={handleAsignar} className="btn btn-outline-primary btn-dim">Asignar</button>
                <button type="button" onClick={closeModal} className="btn btn-outline-secondary btn-dim">Cancelar</button>
              </div>  
            </div>
            
        </Modal>
    </>
  )
}
