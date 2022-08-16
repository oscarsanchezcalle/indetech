import React from 'react'

import Modal from 'react-modal';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

import { useCarpetaStore } from '../../../hooks';
import { RotuloCarpeta } from '../organizar/RotuloCarpeta';

export const AsignarImagenModal = () => {
  
  Modal.setAppElement('#root');
  
  const { 
    carpetaActiva, isOpenModalAsignar, isLoadingDropbox,
    closeModalAsignar, buscarArchivosDropbox } = useCarpetaStore();

  //const { proyectoId, username } = useAuthStore();
  
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //console.log(carpetaActiva);
    buscarArchivosDropbox(carpetaActiva.proyectoId);
  }

  function closeModal() {
    closeModalAsignar({}, false);
  }

  const handleAsignar = () => {
    console.log("asignar");
  }

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
                                        <a href="#" className="btn btn-white btn-dim btn-outline-primary">
                                          <em class="icon ni ni-reload"></em>
                                          <span>Refrescar</span>
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                               </div>
                              </div>
                              <br />
                            
                            <TreeView
                              aria-label="multi-select"
                              defaultCollapseIcon={<ExpandMoreIcon />}
                              defaultExpandIcon={ <ChevronRightIcon />}
                              multiSelect
                              sx={{ height: 216, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
                            >
                              <TreeItem nodeId="1" label="Applications">
                                <TreeItem nodeId="2" label="Calendar" />
                                <TreeItem nodeId="3" label="Chrome" />
                                <TreeItem nodeId="4" label="Webstorm" />
                              </TreeItem>
                              <TreeItem nodeId="5" label="Documents">
                                <TreeItem nodeId="6" label="MUI">
                                  <TreeItem nodeId="7" label="src">
                                    <TreeItem nodeId="8" label="index.js" />
                                    <TreeItem nodeId="9" label="tree-view.js" />
                                  </TreeItem>
                                </TreeItem>
                              </TreeItem>
                            </TreeView>
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
