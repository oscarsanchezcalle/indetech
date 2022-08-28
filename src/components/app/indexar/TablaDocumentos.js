import React from 'react'

import Swal from 'sweetalert2';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { useAuthStore, useDocumentoStore } from '../../../hooks';
import { parseISO, format } from 'date-fns'
import { EditarDocumentoModal } from './EditarDocumentoModal';

export const TablaDocumentos = () => {

  const { documentos, deleteDocumentoById, isLoadingDeleteDocumento, openModalEditarDocumento } = useDocumentoStore();
  const { username } = useAuthStore();

  const handleOpenModalEditar = (documento) => {
    openModalEditarDocumento(documento);
  }

  const handleEliminar = (documento) => {
    Swal.fire({  
      title: '¿Está seguro de eliminar el documento?',  
      showCancelButton: true,  
      cancelButtonText: 'Cancelar',
      confirmButtonText: `Si`,  
      
      }).then((result) => {  
          if (result.isConfirmed) {    
              deleteDocumentoById(documento.id, documento.carpetaId, username);
          }
      });
  }
  
  return (
    <>
      <div className="nk-block">
        <div className="card card-bordered card-stretch">
          <div className="card-inner-group">
            <div className="card-inner">
              <div className="card-title-group">
                <div className="card-title">
                  <h5 className="title">Listado de Documentos</h5>
                </div>
                <div className="card-tools me-n1">
                  {/* <ul className="btn-toolbar"> 
                          <NumeroCaja numeroCaja={carpetasByCajaId[0]?.numeroCaja}/>
                      </ul> */}
                </div>
              </div>
            </div>
            <div className="card-inner p-0">
              <table className="table table-orders">
                  <thead className="tb-odr-head">
                    <tr className="tb-odr-item">
                      <th className="tb-odr-info">
                        <span className="tb-odr-id"># Documento</span>
                        <span className="tb-odr-date d-none d-md-inline-block">Tipo Documental</span>
                      </th>
                      <th className="tb-odr-amount">
                        <span className="tb-odr-total">Folios</span>
                        <span className="tb-odr-status d-none d-md-inline-block">Fecha</span>
                      </th>
                      <th className="tb-odr-action">&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody className="tb-odr-body">
                    { documentos.map( documento => (
                      <tr key={ documento.id } className="tb-odr-item">
                        <td className="tb-odr-info">
                          <span className="tb-odr-id">
                            {documento.numero}
                          </span>
                          <span className="tb-odr-date">{documento.tipoDocumento.descripcion}</span>
                        </td>
                        <td className="tb-odr-amount">
                          <span className="tb-odr-total">
                            <span className="amount">({documento.folioInicial}, {documento.foliofinal}) = {documento.folios}</span>
                          </span>
                          <span className="tb-odr-status">
                            <span className="amount">{format(parseISO(documento.fecha), 'dd/MM/yyyy')}</span>
                          </span>
                        </td>
                        <td className="tb-odr-action">
                          <div className="tb-odr-btns d-sm-inline">
                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Editar</Tooltip>}>
                              <span className="d-inline-block">
                                <a onClick={() => handleOpenModalEditar(documento)}
                                  className="btn btn-icon btn-white btn-dim btn-sm btn-primary">
                                  <em className="icon ni ni-edit"></em>
                                </a>
                              </span>
                            </OverlayTrigger>
                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Eliminar</Tooltip>}>
                              <span className="d-inline-block">
                                <a onClick={() => handleEliminar(documento)}
                                  className="btn btn-icon btn-white btn-dim btn-sm btn-danger">
                                  {isLoadingDeleteDocumento ? <i className="fas fa-circle-notch fa-spin"></i>: <em className="icon ni ni-trash"></em>}
                                </a>
                              </span>
                            </OverlayTrigger>
                          </div>
                        </td>
                      </tr>
                      ))} 
                  </tbody>
                </table>
            </div>
          </div>
        </div>
      </div>
      <EditarDocumentoModal />
    </>
  )
}
