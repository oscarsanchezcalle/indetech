import React, { useEffect } from 'react'
import Select from 'react-select'

import { useAuthStore, useDependieciaStore, useOficinaStore, useSerieStore } from '../../../hooks';

export const Filtros = () => {
   
    const { proyectoId, proyecto, objetoContrato } = useAuthStore();
    const { startLoadingDependencias, dependencias } = useDependieciaStore();
    const { startLoadingOficinas, oficinas } = useOficinaStore();
    const { startLoadingSeries } = useSerieStore();

    //cargo la primera vez
    useEffect(() => {
         startLoadingDependencias(proyectoId);
    }, [])

    const handleSelectDependenciaChange = ( selectedOption) => {   
        //ToDo: agregar al estado de formularioFuid el campo dependencia
        startLoadingOficinas(selectedOption.value);
    }

    const handleSelectSubDependenciaChange = ( selectedOption) => {   
        //ToDo: agregar al estado de formularioFuid el campo dependencia        
        startLoadingSeries(selectedOption.value);
    }

  return (
    <> 
        <h6 className="title pb-2">Formato Único de Inventario Documental</h6>
        <div className="row">
            <label className="col-sm-3 col-form-label form-label">Entidad</label>
            <div className="col-sm-9">
                <input type="text" className="form-control" disabled={true} value={ proyecto }/>
            </div>
        </div>
        <div className=" row">
            <label className="col-sm-3 col-form-label form-label">Dependecia</label>
            <div className="col-sm-9">
            <Select
                    options={dependencias}         
                    placeholder='Selecciona la dependencia'
                    onChange={(selecteOption) => handleSelectDependenciaChange(selecteOption)}
                    />
            </div>
        </div>
        <div className=" row">
            <label className="col-sm-3 col-form-label form-label">Sub Dependecia</label>
            <div className="col-sm-9">
            <Select
                    options={oficinas}   
                    placeholder='Selecciona la sub dependencia'
                    onChange={(selecteOption) => handleSelectSubDependenciaChange(selecteOption)}
                    />
            </div>
        </div>
        <div className="row">
            <label className="col-sm-3 col-form-label form-label">Objeto</label>
            <div className="col-sm-9">
                <input type="text" className="form-control" disabled={true} value={objetoContrato}/>
            </div>
        </div>
        <div className=" row">
            <label className="col-sm-3 col-form-label form-label">Caja</label>
            <div className="col-sm-9">
                <div className="form-control-wrap">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder='Número de la caja' />
                        <div className="input-group-append">
                            <button className="btn btn-outline-primary btn-dim">Buscar Caja</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
