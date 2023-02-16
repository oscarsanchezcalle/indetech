import React from 'react'
import { useInventarioStore } from '../../../../hooks/useInventarioStore';

export const TablaInventarioConsulta = () => {

  const { registros } = useInventarioStore();

  const handleBtnExportar = async (numeroCaja, formato) => {
    window.open('https://protechreporting.azurewebsites.net/fuidANT/'+formato+'/file?numerocaja='+numeroCaja);
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
                                                        <li className='center'>
                                                             <small>Exportar FUID - Caja # {registro.numeroCaja}</small>
                                                        </li>
                                                        <li>
                                                            <a href='#' onClick={() => handleBtnExportar(registro.numeroCaja, 'xls')}>
                                                                <em className="icon ni ni-file-xls"></em>
                                                                <span>Excel</span>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href='#' onClick={() => handleBtnExportar(registro.numeroCaja, 'csv')}>
                                                                <em className="icon ni ni-file-text"></em>
                                                                <span>CSV</span>
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
