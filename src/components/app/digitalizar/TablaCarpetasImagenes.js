import React from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { downloadURI, removeDropboxToRender } from '../../../helpers';
import { useAuthStore, useCarpetaStore } from '../../../hooks';
import { NumeroCaja } from '../organizar/NumeroCaja';
import { AsignarImagenModal } from './AsignarImagenModal';
import { VerDocumentoPdfModal } from './VerDocumentoPdfModal';

export const TablaCarpetasImagenes = () => {

  const { 
     carpetasByCajaId, openModalAsignar, quitarArchivoACarpeta,
     isLoadingQuitarPdf, openModalVerPdf, isOpenModalVerPdf
  } = useCarpetaStore();
  const { username } = useAuthStore();

  const  handleOpenModalAsignar = (carpeta) => {
    openModalAsignar(carpeta);
  }

  const handleQuitarArchivo = (carpeta) => {
   
    const criteria = {
      "carpetaId": carpeta.id,
      "fileId": "",
      "username": username
    }
    quitarArchivoACarpeta(criteria, carpeta.cajaId);
  }

  const  handleOpenModalVerPdf = (carpeta) => {
    openModalVerPdf(carpeta);
    console.log(carpeta);
  }

  const handleDescargarPdf = (fileUrl) => {
    var uri = fileUrl.replace(/.$/,"1");
    downloadURI(uri, "pdfDrobox");
  }

  
  return (
    <>
      <div className="nk-block">
        <div className="card card-bordered card-stretch">
          <div className="card-inner-group">
            <div className="card-inner">
              <div className="card-title-group">
                <div className="card-title">
                  <h5 className="title">Listado de Carpetas</h5>
                </div>
                <div className="card-tools me-n1">
                  <ul className="btn-toolbar"> 
                          <NumeroCaja numeroCaja={carpetasByCajaId[0]?.numeroCaja}/>
                      </ul>
                </div>
              </div>
            </div>
            <div className="card-inner p-0">
            <table className="table table-orders">
                <thead className="tb-odr-head">
                  <tr className="tb-odr-item">
                    <th className="tb-odr-info">
                      <span className="tb-odr-id"># Carpeta</span>
                      <span className="tb-odr-date d-none d-md-inline-block">Serie, Subserie o tipo documental</span>
                    </th>
                    <th className="tb-odr-amount">
                      <span className="tb-odr-total">Número Expediente</span>
                      <span className="tb-odr-status d-none d-md-inline-block">Cédula Catastral</span>
                    </th>
                    <th className="tb-odr-action">&nbsp;</th>
                  </tr>
                </thead>
                <tbody className="tb-odr-body">
                  { carpetasByCajaId.map( carpeta => (
                    <tr key={ carpeta.id } className="tb-odr-item">
                      <td className="tb-odr-info">
                        <span className="tb-odr-id">
                          {carpeta.numero}
                        </span>
                        <span className="tb-odr-date">{carpeta.serie.descripcion} - {carpeta.subserie.descripcion}</span>
                      </td>
                      <td className="tb-odr-amount">
                        <span className="tb-odr-total">
                          <span className="amount">{carpeta.codigo}</span>
                        </span>
                        <span className="tb-odr-status">
                          <span className="amount">{carpeta.cedulaCatastral}</span>
                        </span>
                      </td>
                      <td className="tb-odr-action">
                        <div className="tb-odr-btns d-sm-inline">
                        {
                          (carpeta.fileId == "") &&
                          <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Asignar PDF</Tooltip>}>
                          <span className="d-inline-block">
                            <a onClick={() => handleOpenModalAsignar(carpeta)}
                              className="btn btn-icon btn-white btn-dim btn-sm btn-primary">
                              <em className="icon ni ni-file-plus" />
                            </a>
                          </span>
                        </OverlayTrigger>
                        }
                        {
                          (carpeta.fileId != "") &&
                            <OverlayTrigger key={Math.random()} overlay={<Tooltip id="tooltip-disabled">Ver PDF</Tooltip>}>
                                 <a onClick={() => handleOpenModalVerPdf(carpeta)}
                                  className="btn btn-icon btn-white btn-dim btn-sm btn-primary">
                                    <em className="icon ni ni-eye"></em>
                                </a>
                            </OverlayTrigger>
                         }
                         {
                          (carpeta.fileId != "") &&
                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Descargar PDF</Tooltip>}>
                                 <a target="_blank" onClick={() => handleDescargarPdf(carpeta.fileUrl)}
                                  className="btn btn-icon btn-white btn-dim btn-sm btn-primary">
                                    <em className="icon ni ni-download"></em>
                                </a>
                            </OverlayTrigger>
                         }
                         { (carpeta.fileId != "") &&
                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Quitar PDF</Tooltip>}>
                              <a target="_blank" onClick={() => handleQuitarArchivo(carpeta)}
                                className="btn btn-icon btn-white btn-dim btn-sm btn-danger">
                                
                                {isLoadingQuitarPdf ? <i className="fas fa-circle-notch fa-spin"></i>: <em className="icon ni ni-file-remove"></em>}
                              </a>
                            </OverlayTrigger>
                         }
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

      <AsignarImagenModal />
      <VerDocumentoPdfModal/>
    </>
  )
}
