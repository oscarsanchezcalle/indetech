import React from 'react'
import { useCarpetaStore } from '../../../hooks'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { downloadURI } from '../../../helpers';

export const TablaCarpetasConPDFAsociado = () => {

    const { carpetasConPdf } = useCarpetaStore();

    const handleDescargarPdf = (fileUrl) => {
        var uri = fileUrl.replace(/.$/,"1");
        downloadURI(uri, "pdfDrobox");
    }
    
  return (
    
        <table className="table table-orders">
            <thead className="tb-odr-head">
                <tr className="tb-odr-item">
                    <th className="">
                        <span className="tb-odr-status d-md-inline-block">Dependencia - Sub Dependencia - Vigencia</span>
                    </th>
                    <th className="">
                        <span className="tb-odr-status d-md-inline-block">#Caja - #Carpeta - Serie - Subserie</span>
                    </th>
                    <th className="">
                        <span className="tb-odr-total d-md-inline-block">Expediente - Cédula Catastral</span>
                    </th>
                    <th className="tb-odr-action ">&nbsp;</th>
                </tr>
            </thead>
            <tbody className="tb-odr-body">
               { carpetasConPdf.map( carpeta => (
                <tr key={ carpeta.carpetaId } className="tb-odr-item">
                    <td className="tb-odr-amount">
                        <span className="tb-odr-status">
                            <span className="amount">{carpeta.dependencia.descripcion} - {carpeta.oficina.descripcion} - {carpeta.vigencia.descripcion}</span>
                        </span>
                    </td>
                    <td className="tb-odr-amount">
                        <span className="tb-odr-status">
                            <span className="amount">{carpeta.numeroCaja} - {carpeta.numeroCarpeta} - {carpeta.serie.descripcion} - {carpeta.subserie.descripcion}</span>
                        </span>
                    </td>
                    <td className="tb-odr-amount">
                        <span className="tb-odr-total">
                            <span className="amount">{carpeta.expediente} - {carpeta.cedulaCatastral}</span>
                        </span>
                    </td>
                    <td className="tb-odr-action">
                        <div className="tb-odr-btns d-sm-inline">
                        {
                            (carpeta.archivo.fileId != "") &&
                            <OverlayTrigger key={Math.random()} overlay={<Tooltip id="tooltip-disabled">Ver PDF</Tooltip>}>
                                    <a href={carpeta.archivo.fileUrl} target="_blank"
                                    //onClick={() => handleOpenModalVerPdf(carpeta)}
                                    className="btn btn-icon btn-white btn-dim btn-sm btn-primary">
                                    <em className="icon ni ni-eye"></em>
                                </a>
                            </OverlayTrigger>
                            }
                            {
                            (carpeta.archivo.fileId != "") &&
                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Descargar PDF</Tooltip>}>
                                    <a target="_blank" onClick={() => handleDescargarPdf(carpeta.archivo.fileUrl)}
                                    className="btn btn-icon btn-white btn-dim btn-sm btn-primary">
                                    <em className="icon ni ni-download"></em>
                                </a>
                            </OverlayTrigger>
                            }
                        </div>
                    </td>
                </tr>
                ))} 
            </tbody>
        </table>
        
  )
}
