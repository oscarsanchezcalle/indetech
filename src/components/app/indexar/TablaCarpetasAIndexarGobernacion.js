import React from 'react'
import { Link } from 'react-router-dom';

import { useCarpetaStore } from '../../../hooks';
import { NumeroCaja } from '../organizar/NumeroCaja';

export const TablaCarpetasAIndexarGobernacion = () => {

  const { carpetasByCajaId, setCarpetaActivaActual } = useCarpetaStore();

  const handleIndexarDocs = (carpeta) => {
    setCarpetaActivaActual(carpeta);
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
                      <span className="tb-odr-id"># Carpeta - Dependencia</span>
                    </th>
                    <th className="tb-odr-info">
                      <span className="tb-odr-date d-none d-md-inline-block">Sub Dependencia</span>
                    </th>
                    <th className="tb-odr-info">
                      <span className="tb-odr-date d-none d-md-inline-block">Serie, Subserie</span>
                    </th>
                    <th className="tb-odr-amount">
                      <span className="tb-odr-total"># Expediente</span>
                      <span className="tb-odr-status d-none d-md-inline-block">Nombre</span>
                    </th>
                    <th className="tb-odr-action">&nbsp;</th>
                  </tr>
                </thead>
                <tbody className="tb-odr-body">
                  { carpetasByCajaId.map( carpeta => (
                    <tr key={ carpeta.id } className="tb-odr-item">
                      <td className="tb-odr-info">
                        <span className="tb-odr-id">
                          {carpeta.numero} - {carpeta.dependencia.descripcion}</span>
                      </td>
                      <td >
                        {carpeta.oficina.descripcion}
                      </td>
                      <td >
                        <span >{carpeta.serie.descripcion} - {carpeta.subserie.descripcion}</span>
                      </td>
                      <td >
                        <span className="tb-odr-total">
                          <span className="amount">{carpeta.codigo}</span>
                        </span>
                        <span className="tb-odr-status">
                          <span className="amount">{carpeta.cedulaCatastral}</span>
                        </span>
                      </td>
                      <td className="tb-odr-action">
                        <div className="tb-odr-btns d-sm-inline">
                            <Link onClick={() => handleIndexarDocs(carpeta)}
                              className="btn btn-xs btn-dim btn-sm btn-outline-primary"
                              to="/indexar">
                                Indexar Docs
                            </Link>  
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
    </>
  )
}
