import React, { useEffect } from 'react'
import Select from 'react-select';
import { useAuthStore, useFormBasic } from '../../../../hooks';
import { useInventarioStore } from '../../../../hooks/useInventarioStore';
import { LoadingInButton } from '../../LoadingInButton';
import { TablaInventarioConsulta } from './TablaInventarioConsulta';

export const ConsultarInventarioAnt = () => {

  const { proyectoId, proyecto, username } = useAuthStore();
  const { getDepartamentosFilter, getFechaResolucionFilter, 
          getNumeroCajaFilter, getNumeroResolucionFilter, 
          getSerieSubserieFilter, getBusquedaBasica,isLoadingDepartamentosFilter,
          isLoadingFechaResolucionFilter, isLoadingNumeroCajaFilter,
          isLoadingNumeroResolucionFilter, isLoadingSerieSubserieFilter,
          departamentosFilter, numeroResolucionFilter,
          numeroCajaFilter, fechaResolucionFilter, serieSubserieFilter
        } = useInventarioStore();

  const filterForm = {
    departamento: {},
    numeroResolucion: {},
    fechaResolucion: '',          
    numeroCaja: '',          
    serieSubserie: {}
  };

  const [formValues, handleInputChange, handleSelectChange, reset] = useFormBasic(filterForm);

  const {
    departamento,
    numeroResolucion,
    fechaResolucion,          
    numeroCaja,          
    serieSubserie
  } = formValues;

  useEffect(() => {
    if(proyectoId > 0){
        getDepartamentosFilter();
        getNumeroResolucionFilter();
        getFechaResolucionFilter();
        getNumeroCajaFilter();
        getSerieSubserieFilter();
    }
  }, [proyectoId]);

  const handleSelectDepartamentoChange = ( selectedOption ) => {        
    handleSelectChange(selectedOption, "departamento");    
  }

  const handleSelectNumeroResolucionChange = ( selectedOption ) => {        
    handleSelectChange(selectedOption, "numeroResolucion");    
  }

  const handleSelectFechaResolucionChange = ( selectedOption ) => {        
    handleSelectChange(selectedOption, "fechaResolucion");    
  }

  const handleSelectNumeroCajaChange = ( selectedOption ) => {        
    handleSelectChange(selectedOption, "numeroCaja");    
  }

  const handleSelectSerieSubserieChange = ( selectedOption ) => {        
    handleSelectChange(selectedOption, "serieSubserie");    
  }

  const handleBtnAgregar = async () => {
    console.log(formValues);
    getBusquedaBasica(formValues)
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
                    options={departamentosFilter}    
                    value={departamento}    
                    placeholder=''
                    isLoading={isLoadingDepartamentosFilter}
                    onChange={(selectedOption) => handleSelectDepartamentoChange(selectedOption)}
                    isClearable={true}
                    isMulti
                />
            </div>
            <div className='col-md-3'>
                <label className='form-label'>N° Resolución</label>
                <Select
                    options={numeroResolucionFilter}    
                    value={numeroResolucion}    
                    placeholder=''
                    isLoading={isLoadingNumeroResolucionFilter}
                    onChange={(selectedOption) => handleSelectNumeroResolucionChange(selectedOption)}
                    isClearable={true}
                    isMulti
                />
            </div>
            <div className='col-md-3'>
                <label className='form-label'>Fecha de Resolución</label>
                <Select
                    options={fechaResolucionFilter}    
                    value={fechaResolucion}    
                    placeholder=''
                    isLoading={isLoadingFechaResolucionFilter}
                    onChange={(selectedOption) => handleSelectFechaResolucionChange(selectedOption)}
                    isClearable={true}
                    isMulti
                />
            </div>
            <div className='col-md-3'>
                <label className='form-label'>N° Caja</label>
                <Select
                    options={numeroCajaFilter}    
                    value={numeroCaja}    
                    placeholder=''
                    isLoading={isLoadingNumeroCajaFilter}
                    onChange={(selectedOption) => handleSelectNumeroCajaChange(selectedOption)}
                    isClearable={true}
                    isMulti
                />
            </div>
          </div>
          <div className="row pt-3">
            <div className='col-md-6'>
              <label className='form-label'>Nombre de la serie o subserie</label>
              <Select
                  options={serieSubserieFilter}    
                  value={serieSubserie}    
                  placeholder=''
                  isLoading={isLoadingSerieSubserieFilter}
                  onChange={(selectedOption) => handleSelectSerieSubserieChange(selectedOption)}
                  isClearable={true}
                  isMulti
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
          <p>filtros busqueda avanzada</p>                   
        </div>
     </div>
     <div className='row pt-3'>
        <TablaInventarioConsulta />
     </div>
    </>
  )
}
