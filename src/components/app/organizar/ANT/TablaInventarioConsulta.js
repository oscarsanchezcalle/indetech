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
                                        <span>Persona Natural / Jurídica</span>
                                    </th>
                                    <th>
                                        <span>Doc. Identificación</span>
                                    </th>    
                                    <th>
                                        <span>Predio</span>
                                     </th>                                 
                                     <th>
                                        <span>N° Resolución / Auto</span>
                                     </th> 
                                     <th>
                                        <span>Fecha Resolución / Auto</span>
                                     </th> 
                                     <th>
                                        <span>N° Caja</span>
                                     </th>    
                                     <th>
                                        <span>N° Carpeta</span>
                                     </th>    
                                     <th>
                                        <span>Tomo</span>
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
                                                { (registro.serieName != '' || registro.serieName != null)  ? registro.serieName : 'S/I' }
                                            </span>
                                        </td>
                                        <td>
                                            <span className="">                                              
                                                { (registro.nombrePersona != '' || registro.nombrePersona != null)  ? registro.nombrePersona : 'S/I' }
                                            </span>
                                        </td>
                                        <td>
                                            <span className="">                                                
                                                { (registro.documentoIdentificacion != '' || registro.documentoIdentificacion != null ) ? registro.documentoIdentificacion : 'S/I' }
                                            </span>
                                        </td>                                       
                                        <td>
                                            <span className="">                                                
                                                { (registro.nombrePredio != '' || registro.nombrePredio != null) ? registro.nombrePredio : 'S/I' }
                                            </span>
                                        </td>   
                                        <td>
                                            <span className="">
                                            { (registro.numeroExpediente != null || registro.numeroExpediente != null) ? registro.numeroExpediente : 'S/I' }                                                
                                            </span>
                                        </td>
                                        <td>
                                            <span className="">                                                
                                                { (registro.fechaExpediente != null) ? registro.fechaExpediente : 'S/I' }                                                
                                            </span>
                                        </td>
                                        <td>
                                            <span className="">
                                            { (registro.numeroCaja != null || registro.numeroCaja != null ) ? registro.numeroCaja : 'S/I' }                                                      
                                            </span>
                                        </td>
                                        <td>
                                            <span className="">                                                
                                                { (registro.numeroCarpeta != null || registro.numeroCarpeta != null ) ? registro.numeroCarpeta : 'S/I' }      
                                            </span>
                                        </td>
                                        <td>
                                            <span className="">                                                
                                                { (registro.tomo != null || registro.tomo != '' ) ? registro.tomo : 'S/I' }      
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
