import React from 'react'
import Select from 'react-select';
import { LoadingInButton } from '../../LoadingInButton';
import { TablaInventarioConsulta } from './TablaInventarioConsulta';

export const ConsultarInventarioAnt = () => {

  const handleBtnAgregar = async () => {

  }

  return (
    <>   
     <div className='row'>
        <div className='col-md-7'>
            <h6 className="title pb-2">Consultar Inventario Documental</h6>            
        </div>
     </div>  
     <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className="nav-link active" data-bs-toggle="tab" href="#tabItem1">
          <em className="icon ni ni-search"></em> &nbsp;Busqueda Básica
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-bs-toggle="tab" href="#tabItem2">
            <em className="icon ni ni-zoom-in"></em> &nbsp;Busqueda Avanzada
          </a>
        </li>         
     </ul>
     <div className="tab-content">
        <div className="tab-pane active" id="tabItem1">
          <div className="row">
            <div className='col-md-3'>
                <label className='form-label'>Departamento</label>
                <Select
                    //options={dependencias}    
                    // value={dependencia}    
                    placeholder=''
                    // isLoading={isLoadingDependencia}
                    // onChange={(selectedOption) => handleSelectDependenciaChange(selectedOption)}
                />
            </div>
            <div className='col-md-3'>
                <label className='form-label'>N° Resolución</label>
                <Select
                    //options={dependencias}    
                    // value={dependencia}    
                    placeholder=''
                    // isLoading={isLoadingDependencia}
                    // onChange={(selectedOption) => handleSelectDependenciaChange(selectedOption)}
                />
            </div>
            <div className='col-md-3'>
                <label className='form-label'>Fecha de Resolución</label>
                <Select
                    //options={dependencias}    
                    // value={dependencia}    
                    placeholder=''
                    // isLoading={isLoadingDependencia}
                    // onChange={(selectedOption) => handleSelectDependenciaChange(selectedOption)}
                />
            </div>
            <div className='col-md-3'>
                <label className='form-label'>N° Caja</label>
                <Select
                    //options={dependencias}    
                    // value={dependencia}    
                    placeholder=''
                    // isLoading={isLoadingDependencia}
                    // onChange={(selectedOption) => handleSelectDependenciaChange(selectedOption)}
                />
            </div>
          </div>
          <div className="row pt-3">
            <div className='col-md-6'>
              <label className='form-label'>Nombre de la serie o subserie</label>
              <Select
                  //options={dependencias}    
                  // value={dependencia}    
                  placeholder=''
                  // isLoading={isLoadingDependencia}
                  // onChange={(selectedOption) => handleSelectDependenciaChange(selectedOption)}
              />
            </div>
            <div className='col-md-2'>
              <br />
              <button 
                  onClick={handleBtnAgregar}
                  type="button"
                  disabled={false}
                  className="btn btn-outline-primary btn-dim  mt-1 btn-block">
                      <LoadingInButton isLoading={false} btnText="Buscar" />
              </button>
            </div>
          </div>
        </div>
        <div className="tab-pane" id="tabItem2">
          <p>advance</p>                   
        </div>
     </div>
     <div className='row pt-3'>
        <TablaInventarioConsulta />
     </div>
    </>
  )
}
