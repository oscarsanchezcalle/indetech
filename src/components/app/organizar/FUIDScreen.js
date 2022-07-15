import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Titulo } from '../Titulo';
import { useCajaStore } from '../../../hooks';
import { cajaSlice } from '../../../store';

export const FUIDScreen = () => {
  
   // const dispatch = useDispatch();
    const { startLoadingCajas } = useCajaStore();
    const { cajas } = useCajaStore();

    //cargo la primera vez
    useEffect(() => {
        startLoadingCajas();
    }, [])
    
    
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
                        </div>
                    </div>

                    <div className="card-inner p-0">
                        <table className="table table-sm table-hover">
                            <thead className="tb-odr-head">
                                <tr>
                                    <th className='col-md-2'>
                                        <span>Id</span>
                                    </th>
                                    <th className='col-md-3'>
                                        <span>Descripcion</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {cajas.map( caja => (
                                    <tr key={caja.id }>
                                        <td>
                                            <span className="tb-odr-id">
                                                {caja.id}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="tb-odr-date">{ caja.descripcion }</span>
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
