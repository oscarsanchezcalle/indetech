import React from 'react'
import { format, parseISO } from 'date-fns'

import 
{ 
     useCarpetaStore
} from '../../../hooks';

export const TablaCarpetas = () => {

    const { carpetasByCajaId, deleteCarpetaById } = useCarpetaStore();
   
    if(carpetasByCajaId === undefined){
        return null;
    }

    const handleBtnEliminar = async (carpetaId) => {
        await deleteCarpetaById(carpetaId);
    }

    return (
            <>
                <div className="nk-block">
                    <div className="card card-bordered card-stretch">
                        <div className="card-inner-group">
                            <div className="card-inner">
                                <div className="card-title-group">
                                    <div className="card-title">
                                    <h6 className="title">
                                        Inventario Carpetas
                                    </h6>
                                    </div>
                                    <div className="card-tools me-n1">
                                        <ul className="btn-toolbar">                           
                                            {/* todo: dropdown aqui */}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        
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
                                                <span>Fechas Extremas</span>
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
                                                        <a
                                                            href="#"
                                                            className="dropdown-toggle btn btn-icon btn-trigger"
                                                            data-bs-toggle="dropdown"
                                                            aria-expanded="false"
                                                        >
                                                            <em className="icon ni ni-more-h" />
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-end" style={{}}>
                                                            <ul className="link-list-opt no-bdr">
                                                                <li>
                                                                    <a href="#">
                                                                        <em className="icon ni ni-external" />
                                                                        <span>Mover Carpeta</span>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="#">
                                                                        <em className="icon ni ni-edit" />
                                                                        <span>Editar</span>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a onClick={() => handleBtnEliminar(carpeta.id)}>
                                                                        <em className="icon ni ni-trash" />
                                                                        <span>Eliminar</span>
                                                                    </a>
                                                                </li>
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
