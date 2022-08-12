import React from 'react'
import { Titulo } from '../Titulo'
import { Estado } from './Estado'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

export const TareasAsignadas = () => {

  // ToDo: Consultar en el estado o al api las tareas asignadas puede ser dentro dewl useEffect
  const tareasAsignadas = [
      {
          documentoId: 1,
          fechaAsignacion: new Date(2022,7,1),
          folios: 600,
          porcentajeAvance: "0%",
          foliosAvance: 0,
          estado: 1,
          urlPdf: '/sample.pdf'
      },      
      {
          documentoId: 2,
          fechaAsignacion: new Date(),
          folios: 600,
          porcentajeAvance: "0%",
          foliosAvance: 0,
          estado: 1,
          urlPdf: '/sample2.pdf'
      },      
      {
          documentoId: 3,
          fechaAsignacion: new Date(),
          folios: 600,
          porcentajeAvance: "0%",
          foliosAvance: 0,
          estado: 1,
          urlPdf: '/sample3.pdf'
      },
      {
        documentoId: 4,
        fechaAsignacion: new Date(),
        folios: 600,
        porcentajeAvance: "0%",
        foliosAvance: 0,
        estado: 1,
        urlPdf: '/sample3.pdf'
    }
  ]

  return (
    <> 
            <div className="nk-block">
              <div className="card card-bordered card-stretch">
                <div className="card-inner-group">
                    
                    <div className="card-inner">
                        <div className="card-title-group">
                            <div className="card-title">
                            <h5 className="title">
                                <Titulo 
                                    titulo="Tareas Asignadas" 
                                    subtitulo="Seleccione el archivo a indexar"/>
                            </h5>
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
                                    <th className='col-md-2'>
                                        <span>Id Doc</span>
                                    </th>
                                    <th className='col-md-3'>
                                        <span>Fecha Asignación</span>
                                    </th>
                                    <th className="col-md-2">
                                        <span>Folios</span>
                                    </th>
                                    <th className="col-md-2">
                                        <span>% Avance</span>
                                    </th>
                                    <th className="col-md-2">
                                        <span>Estado</span>
                                    </th>
                                    
                                    <th className="col-md-1">
                                        &nbsp;
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {tareasAsignadas.map( tarea => (
                                    <tr key={tarea.documentoId }>
                                        <td>
                                            <span className="tb-odr-id">
                                                <a href="#">#{tarea.documentoId}</a>
                                            </span>
                                        </td>
                                        <td>
                                            <span className="tb-odr-date">{format(tarea.fechaAsignacion, 'dd/MM/yyyy')}</span>
                                        </td>
                                        <td>
                                            <span>{tarea.folios}</span>                                        
                                        </td>
                                        <td>
                                            <span>{tarea.porcentajeAvance} ({tarea.foliosAvance} folios)</span>                                        
                                        </td>
                                        <td className="tb-odr-action">
                                            <Estado estado={tarea.estado} />
                                        </td>
                                        <td className="tb-odr-action">
                                            {/* ToDo actualizar el estado global y  */}
                                            {/* <Link 
                                                to={{     
                                                    pathname: '/indexar',
                                                    documento:tarea
                                                }}
                                                className='btn btn-dim btn-xs btn-primary'>
                                                <em className="icon ni ni-printer-fill" />&nbsp;Indexar
                                            </Link> */}
                                            
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
