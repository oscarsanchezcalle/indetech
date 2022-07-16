import React from "react";
import Select from "react-select";


export const AddForm = () => {
  return (
    <>
    <div className="card card-bordered">
        <div className="card-inner">
            <div className='row'>
                <div className='col-md-3'>
                    <div className="form-group">
                        <label className=''>Serie</label>
                        <Select
                            options={[{ value: '1', label: 'Serie  jhsdgfjhsdgfjshgfkjshgfkhjsdgfkjhsdf1' }]}
                            placeholder=''         
                            //onChange={(name) => handleSelectChange(name,"objeto")}
                            />
                    </div>
                </div>
                <div className='col-md-3'>
                    <label className=''>Subserie</label>
                    <Select
                        options={[{ value: '1', label: 'Serie 1' }]}    
                        placeholder=''         
                        //onChange={(name) => handleSelectChange(name,"objeto")}
                        />
                </div>
                <div className='col-md-3'>
                    <label className=''>Fehas extremas</label>
                    <div className="form-control-wrap">
                        <div className="input-group">
                            <input type="date" className="form-control" />
                            <input type="date" className="form-control" />
                        </div>
                    </div>
                </div>
                <div className='col-md-3'>
                    <label className=''>Tomos</label>
                    <div className="form-control-wrap">
                        <div className="input-group">
                            <input type="number" className="form-control" placeholder='Inicial'/>
                            <input type="number" className="form-control" placeholder='Final'/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row mt-1'>
                <div className='col-md-2'>
                    <label className=''>Folios</label>
                    <input type="number" className="form-control" min="0"/>
                </div>
                <div className='col-md-3'>
                    <label className=''>Soporte</label>
                    <Select
                        options={[{ value: '1', label: 'Serie  jhsdgfjhsdgfjshgfkjshgfkhjsdgfkjhsdf1' }]}
                        placeholder=''         
                        //onChange={(name) => handleSelectChange(name,"objeto")}
                        />
                </div>
                <div className='col-md-3'>
                    <label className=''>Frecuencia</label>
                    <Select
                        options={[{ value: '1', label: 'Serie 1' }]}    
                        placeholder=''         
                        //onChange={(name) => handleSelectChange(name,"objeto")}
                        />
                </div>
                <div className='col-md-2'>
                    <label className=''>Notas</label>
                    <div className="form-control-wrap">
                        <div className="input-group">
                            <input type="text" className="input-xs form-control" />
                        </div>
                    </div>
                </div>
                <div className='col-md-2'>
                    <br />
                    <button type="button"  className="btn btn-outline-primary btn-dim   btn-block">Agregar</button>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}
