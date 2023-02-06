import React from 'react'
import Swal from 'sweetalert2';
import { useInventarioStore } from '../../../../hooks/useInventarioStore';

export const TablaInventarioConsulta = () => {

  const { registros, deleteRegistroById, isLoadingDelete } = useInventarioStore();

  const handleBtnExcel = async (id, numeroCaja, numeroCarpeta) => {
        Swal.fire({  
        title: '¿Está seguro de eliminar?',  
        showCancelButton: true,  
        cancelButtonText: 'Cancelar',
        confirmButtonText: `Si`,  
        
        }).then((result) => {  
            if (result.isConfirmed) {   
                //deleteRegistroById(id, numeroCaja, numeroCarpeta);
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
                        </div>
                    </div>
                
                    <div className="card-inner p-0">
                        <table className="table table-sm table-hover">
                            <thead className="tb-odr-head">
                                <tr>
                                    <th>
                                        ITEM
                                    </th>
                                    <th>
                                        <span>Serie / Subserie</span>
                                    </th>
                                    <th>
                                        <span>Departamento</span>
                                    </th>
                                     <th>
                                        <span>N° Resolución</span>
                                     </th>
                                     <th>
                                        <span>Fecha Resolución</span>
                                     </th>
                                     <th>
                                        <span>Fechas Extremas</span>
                                     </th>
                                     <th>
                                        <span>N° Caja</span>
                                     </th>                                    
                                     <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                { registros.map( (registro, i) => (
                                    <tr key={registro.id }>
                                         <td>
                                            <span className="">
                                                {i + 1}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="">
                                                {registro.serieName}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="">
                                                {registro.departamentoName}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="">
                                                {registro.numeroExpediente}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="">
                                                {registro.fechaExpediente}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="">
                                                {registro.fechasExtremas}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="">
                                                {registro.numeroCaja}
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
                                                            <a href='#' onClick={() => handleBtnExcel(registro.id, registro.numeroCaja, registro.numeroCarpeta)}>
                                                                <em className="icon ni ni-file-xls"></em>
                                                                <span>Exportar excel</span>
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
