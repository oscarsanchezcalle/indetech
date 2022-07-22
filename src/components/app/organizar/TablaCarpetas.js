import React, { useEffect } from 'react'
import { Estado } from '../indexar/Estado'
import { format, parseISO } from 'date-fns'
import { Link } from 'react-router-dom'

import 
{ 
     useCarpetaStore
} from '../../../hooks';

export const TablaCarpetas = () => {

    const { carpetasByCajaId } = useCarpetaStore();
   
    if(carpetasByCajaId === undefined){
        return null;
    }

    return (
            <>
                <div className="nk-block">
                    <div className="card card-bordered card-stretch">
                        <div className="card-inner-group">
                        
                            <div className="card-inner p-0">
                                <table className="table table-sm table-hover">
                                    <thead className="tb-odr-head">
                                        <tr>
                                            <th>
                                                <span>Código</span>
                                            </th>
                                            <th >
                                                <span>Serie, Subserie o tipo documental</span>
                                            </th>
                                            <th >
                                                <span>Número</span>
                                            </th>
                                            <th >
                                                <span>FechasExtremas</span>
                                            </th>
                                            <th >
                                                <span>Tomo</span>
                                            </th>
                                            <th >
                                                <span>Folios</span>
                                            </th>
                                            <th >
                                                <span>Soporte</span>
                                            </th>
                                            <th >
                                                <span>Frecuencia</span>
                                            </th>
                                            <th >
                                                <span>Notas</span>
                                            </th>
                                            <th >
                                                <span></span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { carpetasByCajaId.map( carpeta => (
                                            <tr key={carpeta.id }>
                                                <td>
                                                    <span className="tb-odr-id">
                                                        {carpeta.dependencia.codigo}.{carpeta.oficina.codigo}.{carpeta.serie.codigo}.{carpeta.subserie.codigo}
                                                    </span>
                                                </td>
                                                <td>
                                                    {carpeta.serie.descripcion} - {carpeta.subserie.descripcion} - {carpeta.tipoDocumento.descripcion}
                                                </td>
                                                <td>
                                                    {carpeta.codigo}
                                                </td>
                                                <td>
                                                       {`${format(parseISO(carpeta.fechaInicial), 'dd/MM/yyyy')} - ${format(parseISO(carpeta.fechaFinal), 'dd/MM/yyyy')}`}
                                                </td>
                                                <td>
                                                    {carpeta.tomoInicial} de {carpeta.tomoFinal}
                                                </td>
                                                <td>
                                                    {carpeta.folioInicial} hasta {carpeta.folioFinal}
                                                </td>
                                                <td>
                                                    {carpeta.tipoSoporte.descripcion}
                                                </td>
                                                <td>
                                                    {carpeta.frecuenciaUso.descripcion}
                                                </td>
                                                <td>
                                                    {carpeta.descripcion}
                                                </td>
                                                <td>
                                                <div className="drodown">
                                                        <a href="#" className="dropdown-toggle btn btn-icon btn-trigger me-n1 show" data-bs-toggle="dropdown" aria-expanded="true"><em className="icon ni ni-more-h" /></a>
                                                        <div className="dropdown-menu dropdown-menu-end show" style={{position: 'absolute', inset: '0px 0px auto auto', margin: '0px', transform: 'translate3d(-18px, 349px, 0px)'}} data-popper-placement="bottom-end">
                                                        <ul className="link-list-opt no-bdr">
                                                            <li><a href="#"><em className="icon ni ni-external"></em><span>Mover Carpeta</span></a></li>
                                                            <li><a href="#"><em className="icon ni ni-edit"></em><span>Editar</span></a></li>
                                                            <li><a href="#"><em className="icon ni ni-trash"></em><span>Eliminar</span></a></li>
                                                        </ul>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>         
                                        ))}
                                                    
                                    </tbody>
                                </table>
                            </div>{/* .card-inner */}
                        </div>{/* .card-inner-group */}
                    </div>{/* .card */}
                    </div>{/* .nk-block */}
            </>
        )
}
