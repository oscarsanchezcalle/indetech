import React from 'react'
import { useCarpetaStore } from '../../../hooks'

export const TablaCarpetasSinPDFAsociado = () => {

  const { carpetasSinPdf  } = useCarpetaStore();
    
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
                </tr>
            </thead>
            <tbody className="tb-odr-body">
               { carpetasSinPdf.map( carpeta => (
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
                </tr>
                ))} 
            </tbody>
        </table>
        
  )
}
