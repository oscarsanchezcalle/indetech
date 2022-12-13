import React from 'react'
import Swal from 'sweetalert2';
import { useInventarioStore } from '../../../hooks/useInventarioStore';
import { NumeroCaja } from './NumeroCaja';
import { NumeroCarpeta } from './NumeroCarpeta';

export const TablaInventario = () => {

  const { registros, deleteRegistroById, isLoadingDelete } = useInventarioStore();

  const handleBtnEliminar = async (id, numeroCaja, numeroCarpeta) => {
        Swal.fire({  
        title: '¿Está seguro de eliminar?',  
        showCancelButton: true,  
        cancelButtonText: 'Cancelar',
        confirmButtonText: `Si`,  
        
        }).then((result) => {  
            if (result.isConfirmed) {   
                deleteRegistroById(id, numeroCaja, numeroCarpeta);
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
                            <h6 className="title">
                                Listado de documentos
                            </h6>
                            </div>
                            <div className="card-tools me-n1">
                                <ul className="btn-toolbar"> 
                                    <NumeroCaja numeroCaja={registros[0]?.numeroCaja}/>&nbsp;
                                    <NumeroCarpeta numero={registros[0]?.numeroCarpeta}/>
                                </ul>
                            </div>
                        </div>
                    </div>
                
                    <div className="card-inner p-0">
                        <table className="table table-sm table-hover">
                            <thead className="tb-odr-head">
                                <tr>
                                   
                                    <th>
                                        <span>Dependencia</span>
                                    </th>
                                    <th>
                                        <span>Serie</span>
                                    </th>
                                     <th>
                                        <span>Municipio</span>
                                     </th>
                                     <th>
                                        <span>Nombre</span>
                                     </th>
                                     <th>
                                        <span>N. Predio</span>
                                     </th>
                                     <th>
                                        <span>Identificación</span>
                                     </th>
                                     <th>
                                        <span>Matrícula Inmobiliaría</span>
                                     </th>
                                     <th>
                                        <span>Plano</span>
                                     </th>
                                     <th>
                                        <span>Folios</span>
                                     </th>
                                     <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                { registros.map( (registro, i) => (
                                    <tr key={registro.id }>
                                        <td>
                                            <span className="">
                                                {registro.dependencia} <br/> {registro.oficina}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="">
                                                {registro.serie} <br/> {registro.subserie}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="">
                                                {registro.departamento} <br/> {registro.municipio}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="">
                                                {registro.nombre}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="">
                                                {registro.nombrePredio}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="">
                                                {registro.documentoIdentificacion}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="">
                                                {registro.numeroMatricula}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="">
                                                {registro.numeroPlano}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="">
                                                {registro.folios}
                                            </span>
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
                                                            <a href='#' onClick={() => handleBtnEliminar(registro.id, registro.numeroCaja, registro.numeroCarpeta)}>
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
