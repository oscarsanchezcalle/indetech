import React from 'react'
import Select from 'react-select'

export const Filtros = () => {
  return (
    <> 
        <h6 className="title pb-2">Formato Único de Inventario Documental</h6>
        <div className="row">
            <label className="col-sm-3 col-form-label form-label">Entidad</label>
            <div className="col-sm-9">
                <input type="text" className="form-control" disabled={true} value="Nombre de la entidad"/>
            </div>
        </div>
        <div className=" row">
            <label className="col-sm-3 col-form-label form-label">Dependecia</label>
            <div className="col-sm-9">
            <Select
                    options={{ value: '1', label: 'Serie 1' }}         
                    placeholder='Selecciona la dependencia'
                    //onChange={(name) => handleSelectChange(name,"objeto")}
                    />
            </div>
        </div>
        <div className=" row">
            <label className="col-sm-3 col-form-label form-label">Sub Dependecia</label>
            <div className="col-sm-9">
            <Select
                    options={{ value: '1', label: 'Serie 1' }}   
                    placeholder='Selecciona la sub dependencia'
                    //onChange={(name) => handleSelectChange(name,"objeto")}
                    />
            </div>
        </div>
        <div className="row">
            <label className="col-sm-3 col-form-label form-label">Objeto</label>
            <div className="col-sm-9">
                <input type="text" className="form-control" disabled={true} value="Objeto del contrato"/>
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
