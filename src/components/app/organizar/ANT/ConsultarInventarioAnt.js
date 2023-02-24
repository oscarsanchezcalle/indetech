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
          getSerieSubserieFilter, getBusquedaBasica, getNombrePersonaFilter,
          getNombrePredioFilter, getDocumentoIdentificacionFilter, getNumeroMatriculaFilter,
          getMunicipioFilter,
          isLoadingDepartamentosFilter,
          isLoadingFechaResolucionFilter, isLoadingNumeroCajaFilter,
          isLoadingNumeroResolucionFilter, isLoadingSerieSubserieFilter,   
          isLoadingNombrePredioFilter, isLoadingNombrePersonaFilter,
          isLoadingDocumentoIdentificacionFilter, isLoadingNumeroMatriculaFilter,isLoadingMunicipioFilter,                 
          nombrePersonaFilter,nombrePredioFilter, documentoIdentificacionFilter, numeroMatriculaFilter,
          municipioFilter, departamentosFilter, numeroResolucionFilter,
          numeroCajaFilter, fechaResolucionFilter, serieSubserieFilter,
          isLoadingGet
        } = useInventarioStore();

  const filterForm = {
    departamento: '',
    numeroResolucion: '',
    fechaResolucion: '',          
    numeroCaja: '',          
    serieSubserie: '',
    nombrePredio: '',
    nombrePersona: '',
    documentoIdentificacion: '',
    numeroMatricula: '',
    municipio: ''
  };

  const [formValues, handleInputChange, handleSelectChange, reset] = useFormBasic(filterForm);

  const {
    departamento,
    numeroResolucion,
    fechaResolucion,          
    numeroCaja,          
    serieSubserie,
    nombrePredio,
    nombrePersona,
    documentoIdentificacion,
    numeroMatricula,
    municipio
  } = formValues;

  useEffect(() => {
    if(proyectoId > 0){
        getDepartamentosFilter();
        getSerieSubserieFilter();      
    }
  }, [proyectoId]);

  const handleSelectDepartamentoChange = ( selectedOption ) => {        
    handleSelectChange(selectedOption, "departamento");        
  }

  const handleSelectNumeroResolucionChange = ( selectedOption ) => {        
    handleSelectChange(selectedOption, "numeroResolucion");    
  }

  const handleSelectNumeroResolucionSearch = ( selectedOption ) => {        
    if(selectedOption.length >= 1){
      getNumeroResolucionFilter(selectedOption);
    }
  }

  const handleSelectFechaResolucionChange = ( selectedOption ) => {        
    handleSelectChange(selectedOption, "fechaResolucion");    
  }

  const handleSelectFechaResolucionSearch = ( selectedOption ) => {        
    if(selectedOption.length >= 7){
      getFechaResolucionFilter(selectedOption);
    }
  }

  const handleSelectNumeroCajaChange = ( selectedOption ) => {        
    handleSelectChange(selectedOption, "numeroCaja");    
  }

  const handleSelectNombrePredioChange = ( selectedOption ) => {        
    handleSelectChange(selectedOption, "nombrePredio");        
  }

  const handleSelectNombrePredioSearch = ( selectedOption ) => {        
    if(selectedOption.length >= 2){
      getNombrePredioFilter(selectedOption);
    }
  }

  const handleSelectNombrePersonaChange = ( selectedOption ) => {     
    handleSelectChange(selectedOption, "nombrePersona");        
  }

  const handleSelectNombrePersonaSearch = ( selectedOption ) => {        
    if(selectedOption.length >= 2){
      getNombrePersonaFilter(selectedOption);
    }
  }

  const handleSelectDocumentoIdentificacionChange = ( selectedOption ) => {        
    handleSelectChange(selectedOption, "documentoIdentificacion");        
  }

  const handleSelectDocumentoIdentificacionSearch = ( selectedOption ) => {        
    if(selectedOption.length >= 2){
      getDocumentoIdentificacionFilter(selectedOption);
    }
  }

  const handleSelectNumeroMatriculaChange = ( selectedOption ) => {        
    handleSelectChange(selectedOption, "numeroMatricula");        
  }

  const handleSelectNumeroMatriculaSearch = ( selectedOption ) => {        
    if(selectedOption.length >= 1){
      getNumeroMatriculaFilter(selectedOption);
    }
  }

  const handleSelectMunicipioChange = ( selectedOption ) => {        
    handleSelectChange(selectedOption, "municipio");        
  }

  const handleSelectMunicipioSearch = ( selectedOption ) => {        
    if(selectedOption.length >= 2){
      getMunicipioFilter(selectedOption);
    }
  }

  const handleSelectSerieSubserieChange = ( selectedOption ) => {        
    handleSelectChange(selectedOption, "serieSubserie");        
  }

  const handleBtnAgregar = async () => {   
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
          <em className="icon ni ni-search"></em> &nbsp;Busqueda
          </a>
        </li>
        {/* <li className="nav-item">
          <a className="nav-link" data-bs-toggle="tab" href="#tabItem2">
            <em className="icon ni ni-zoom-in"></em> &nbsp;Busqueda Avanzada
          </a>
        </li>          */}
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
                <label className='form-label'>N° Resolución / Auto</label>
                <Select
                    options={numeroResolucionFilter}    
                    value={numeroResolucion}    
                    placeholder=''
                    isLoading={isLoadingNumeroResolucionFilter}
                    onChange={(selectedOption) => handleSelectNumeroResolucionChange(selectedOption)}
                    onInputChange={(selectedOption) => handleSelectNumeroResolucionSearch(selectedOption)}
                    loadingMessage={() => 'buscando...'}
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
                    onInputChange={(selectedOption) => handleSelectFechaResolucionSearch(selectedOption)}
                    loadingMessage={() => 'buscando...'}
                    isClearable={true}
                    isMulti
                />
            </div>
            <div className='col-md-3'>
                <label className='form-label'>Nombre del Predio</label>
                <Select
                    options={nombrePredioFilter}    
                    value={nombrePredio}    
                    placeholder=''
                    isLoading={isLoadingNombrePredioFilter}
                    onChange={(selectedOption) => handleSelectNombrePredioChange(selectedOption)}
                    onInputChange={(selectedOption) => handleSelectNombrePredioSearch(selectedOption)}
                    loadingMessage={() => 'buscando...'}
                    isClearable={true}
                    isMulti
                />
            </div>
          </div>
          <div className="row pt-3">
            <div className='col-md-3'>
                <label className='form-label'>Nombre de persona natural o jurídica</label>
                <Select
                    options={nombrePersonaFilter}    
                    value={nombrePersona}    
                    placeholder=''
                    isLoading={isLoadingNombrePersonaFilter}
                    onChange={(selectedOption) => handleSelectNombrePersonaChange(selectedOption)}
                    onInputChange={(selectedOption) => handleSelectNombrePersonaSearch(selectedOption)}
                    isClearable={true}
                    loadingMessage={() => 'buscando...'}
                    isMulti
                />
            </div>
            <div className='col-md-3'>
                <label className='form-label'>Documento de identificación</label>
                <Select
                    options={documentoIdentificacionFilter}    
                    value={documentoIdentificacion}    
                    placeholder=''
                    isLoading={isLoadingDocumentoIdentificacionFilter}
                    onChange={(selectedOption) => handleSelectDocumentoIdentificacionChange(selectedOption)}
                    onInputChange={(selectedOption) => handleSelectDocumentoIdentificacionSearch(selectedOption)}
                    loadingMessage={() => 'buscando...'}
                    isClearable={true}
                    isMulti
                />
            </div>
            <div className='col-md-3'>
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
            <div className='col-md-3'>
                <label className='form-label'>Número de matricula inmobiliaria</label>
                <Select
                    options={numeroMatriculaFilter}    
                    value={numeroMatricula}    
                    placeholder=''
                    isLoading={isLoadingNumeroMatriculaFilter}
                    onChange={(selectedOption) => handleSelectNumeroMatriculaChange(selectedOption)}
                    onInputChange={(selectedOption) => handleSelectNumeroMatriculaSearch(selectedOption)}
                    loadingMessage={() => 'buscando...'}
                    isClearable={true}
                    isMulti
                />
            </div>
          </div>
          <div className='row pt-3'>
            <div className='col-md-3'>
                <label className='form-label'>Municipio</label>
                <Select
                    options={municipioFilter}    
                    value={municipio}    
                    placeholder=''
                    isLoading={isLoadingMunicipioFilter}
                    onChange={(selectedOption) => handleSelectMunicipioChange(selectedOption)}
                    onInputChange={(selectedOption) => handleSelectMunicipioSearch(selectedOption)}
                    loadingMessage={() => 'buscando...'}
                    isClearable={true}
                    isMulti
                />
            </div>
            <div className='col-md-3'>
              <br />
              <button 
                  onClick={handleBtnAgregar}
                  type="button"
                  disabled={isLoadingGet}
                  className="btn btn-outline-primary btn-dim  mt-1 btn-block">
                      <LoadingInButton isLoading={isLoadingGet} btnText="Buscar" />
              </button>
            </div>
            {/* <div className='col-md-3'>
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
            </div> */}
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