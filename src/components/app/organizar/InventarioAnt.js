import React, { useEffect } from 'react';
import Select from 'react-select';
import { LoadingInButton } from '../LoadingInButton';

import 
{ 
    useAuthStore, useDependieciaStore, useOficinaStore, useSerieStore, useSubserieStore,
    useFormBasic, useDepartamentoStore, useMunicipioStore
} from '../../../hooks';
import Swal from 'sweetalert2';
import { useInventarioStore } from '../../../hooks/useInventarioStore';

export const InventarioAnt = () => {

    const { proyectoId, proyecto, username } = useAuthStore();
    const { startLoadingDependencias, dependencias, setDependenciaSelected, isLoadingDependencia } = useDependieciaStore();
    const { startLoadingOficinas, oficinas, setOficinaSelected, isLoadingOficina } = useOficinaStore();
    const { series, startLoadingSeries, isLoadingSerie } = useSerieStore();
    const { subseries, startLoadingSubseries, isLoadingSubserie } = useSubserieStore();
    const { startLoadingDepartamentos, departamentos, isLoadingDepartamento } = useDepartamentoStore();
    const { startLoadingMunicipios, municipios, isLoadingMunicipio } = useMunicipioStore();
    const { isLoadingAdd, isLoadingGet,
            addRegistro, GetInventarioByCajaCarpeta       
          } = useInventarioStore();

    //useForm
    const documentoForm = {
            dependencia: {},
            oficina: {},
            numeroCaja: '',
            numeroCarpeta: '',
            serie: {},
            subserie: {},
            departamento: {},
            municipio: {},
            numeroConsecutivo: 0,
            nombre: '',
            nombrePredio:'',
            nombrePersona: '',
            documentoIdentificacion: '',
            numeroMatricula: '',
            numeroExpediente: 0,
            fechaExpediente:'',
            numeroPlano: '',
            fechaInicial: '',
            fechaFinal: '',
            tipoDocumentoId: 0,
            folios: 0,
            notas: '',
            fechaRegistro: ''
    };

    const [formValues, handleInputChange, handleSelectChange, reset] = useFormBasic(documentoForm);

    const {
            dependencia,
            oficina,
            numeroCaja,
            numeroCarpeta,
            serie,
            subserie,
            departamento,
            municipio,
            numeroConsecutivo,
            nombre,
            nombrePredio,
            nombrePersona,
            documentoIdentificacion,
            numeroMatricula,
            numeroExpediente,
            fechaExpediente,
            numeroPlano,
            fechaInicial,
            fechaFinal,
            tipoDocumentoId,
            folios,
            notas,
            
    } = formValues;
   
    useEffect(() => {
        if(proyectoId > 0){
            startLoadingDependencias(proyectoId);
            startLoadingDepartamentos();
        }
    }, [proyectoId]);

    const handleSelectDependenciaChange = ( selectedOption ) => {    
        startLoadingOficinas(selectedOption.value);
        handleSelectChange(selectedOption, "dependencia");
        setDependenciaSelected(selectedOption);  
    }

    const handleSelectSubDependenciaChange = ( selectedOption ) => {     
        startLoadingSeries(selectedOption.value);
        handleSelectChange(selectedOption, "oficina"); 
        setOficinaSelected(selectedOption);
    }
    
    const handleSelectSerieChange = ( selectedOption) => {   
        startLoadingSubseries(selectedOption.value);
        handleSelectChange(selectedOption, "serie");
    }

    const handleSelectSubserieChange = ( selectedOption) => { 
        handleSelectChange(selectedOption, "subserie");
    }

    const handleSelectDepartamentoChange = ( selectedOption ) => { 
        startLoadingMunicipios(selectedOption.value);
        handleSelectChange(selectedOption, "departamento");
        //setMunicipioSelected(selectedOption);
    }

    
    const handleBtnAgregar = async () => {
       
        await addRegistro(formValues, proyectoId, username);

        reset();
    }

    const handleBtnBuscar = () => {

        if (numeroCaja == '' || numeroCarpeta == '' || numeroCaja == 0 || numeroCarpeta == 0){

            Swal.fire({
                icon: 'warning',
                title: 'Campos incompletos',
                text: `Ingresa un número válido de caja o carpeta`,
                showConfirmButton: true
            });

            return;
        }

        GetInventarioByCajaCarpeta(numeroCaja, numeroCarpeta);
    }    
   
  return (
    <>
    <div className='row'>
        <div className='col-md-7'>
            <h6 className="title pb-2">Registro de Inventario</h6>
            <div className="row">
                <label className="col-sm-3 col-form-label form-label">Entidad</label>
                <div className="col-sm-9">
                    <input type="text" className="form-control" disabled={true} value={ proyecto }/>
                </div>
            </div>
            <div className=" row">
                <label className="col-sm-3 col-form-label form-label">Caja</label>
                <div className="col-sm-9">
                    <div className="form-control-wrap">
                        <div className="input-group">
                            <input 
                                type="number" 
                                className="form-control" 
                                placeholder='Número de la caja'  
                                name="numeroCaja"   
                                value={numeroCaja}  
                                autoComplete="off"                       
                                onChange={handleInputChange}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" row">
                <label className="col-sm-3 col-form-label form-label">Carpeta</label>
                <div className="col-sm-9">
                    <div className="form-control-wrap">
                        <div className="input-group">
                            <input 
                                type="number" 
                                className="form-control" 
                                placeholder='Número de la carpeta'  
                                name="numeroCarpeta"   
                                value={numeroCarpeta}  
                                autoComplete="off"                       
                                onChange={handleInputChange}/>
                            <div className="input-group-append">
                                <button onClick={handleBtnBuscar}  disabled={isLoadingGet} className="btn btn-outline-primary btn-dim">
                                    <LoadingInButton isLoading={isLoadingGet} btnText="Buscar Registros" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className='row pt-1'>
        <div className='col-md-12'>
            <div id="accordion" className="accordion">
                <div className="accordion-item">
                    <a href="#" className="accordion-head" data-bs-toggle="collapse" data-bs-target="#accordion-item-1" aria-expanded="false">
                        <h6 className="title">Registro de documento</h6>
                        <span className="accordion-icon" />
                    </a>
                    <div className="accordion-body collapse show" id="accordion-item-1" data-bs-parent="#accordion" style={{}}>
                        <div className="accordion-inner">
                            <div className="row">
                                <div className='col-md-4'>
                                    <label className='form-label'>Dependencia</label>
                                    <Select
                                        options={dependencias}    
                                        value={dependencia}    
                                        placeholder=''
                                        isLoading={isLoadingDependencia}
                                        onChange={(selectedOption) => handleSelectDependenciaChange(selectedOption)}
                                    />
                                </div>
                                <div className='col-md-4'>
                                    <label className='form-label'>Sub Dependencia</label>
                                    <Select
                                        options={oficinas}   
                                        placeholder=''
                                        value={oficina}    
                                        isLoading={isLoadingOficina}
                                        onChange={(selectedOption) => handleSelectSubDependenciaChange(selectedOption)}
                                    />
                                </div>
                                <div className='col-md-4'>
                                    <label className='form-label'>Serie</label>
                                    <Select
                                        options={series}   
                                        value={serie}    
                                        isLoading={isLoadingSerie}
                                        onChange={(selectedOption) => handleSelectSerieChange(selectedOption)}
                                        placeholder='Series'
                                        />
                                </div>
                            </div>
                            <div className='row pt-3'>
                              <div className='col-md-4'>
                                    <label className='form-label'>Subserie</label>
                                    <Select
                                        options={subseries}  
                                        value={subserie}    
                                        isLoading={isLoadingSubserie}
                                        onChange={(selectedOption) => handleSelectSubserieChange(selectedOption)}
                                        placeholder='Subseries'
                                        />
                                </div>
                                <div className='col-md-4'>
                                    <label className='form-label'>Departamento</label>
                                    <Select
                                        options={departamentos}  
                                        value={departamento}    
                                        isLoading={isLoadingDepartamento}
                                        onChange={(selectedOption) => handleSelectDepartamentoChange(selectedOption)}
                                        placeholder='Departamentos'
                                        />
                                </div>
                                <div className='col-md-4'>
                                    <label className='form-label'>Municipio</label>
                                    <Select
                                        options={municipios}  
                                        value={municipio}
                                        isLoading={isLoadingMunicipio}
                                        placeholder='Municipios'
                                        />
                                </div>
                            </div>
                            <div className='row pt-3'>
                              <div className='col-md-4'>
                                <label className='form-label'>Nombre</label>
                                <input 
                                    type="text"
                                    className='form-control no-resize'
                                    name="nombre"
                                    value={nombre}
                                    onChange={handleInputChange} 
                                    autoComplete="off"/>
                              </div>
                              <div className='col-md-4'>
                                <label className='form-label'>Nombre del predio</label>
                                <input 
                                    type="text"
                                    className='form-control no-resize'
                                    name="nombrePredio"
                                    value={nombrePredio}
                                    onChange={handleInputChange} 
                                    autoComplete="off"/>
                              </div>
                              <div className='col-md-4'>
                                <label className='form-label'>Nombre de persona (Natural o Jurídica)</label>
                                <input 
                                    type="text"
                                    className='form-control no-resize'
                                    name="nombrePersona"
                                    value={nombrePersona}
                                    onChange={handleInputChange} 
                                    autoComplete="off"/>
                              </div>
                            </div>

                            <div className='row pt-3'>
                              <div className='col-md-4'>
                                <label className='form-label'>Documento de identificación</label>
                                <input 
                                    type="text"
                                    className='form-control no-resize'
                                    name="documentoIdentificacion"
                                    value={documentoIdentificacion}
                                    onChange={handleInputChange} 
                                    autoComplete="off"/>
                              </div>
                              <div className='col-md-4'>
                              <label className='form-label'>Número Matrícula Inmobiliaria</label>
                                <input 
                                    type="text"
                                    className='form-control no-resize'
                                    name="numeroMatricula"
                                    value={numeroMatricula}
                                    onChange={handleInputChange} 
                                    autoComplete="off"/>
                              </div>
                              <div className='col-md-4'>
                                <label className='form-label'>Número de plano</label>
                                <input 
                                    type="text"
                                    className='form-control no-resize'
                                    name="numeroPlano"
                                    value={numeroPlano}
                                    onChange={handleInputChange} 
                                    autoComplete="off"/>
                              </div>
                            </div>

                            <div className='row pt-3'>
                              <div className='col-md-4'>
                                <label className='form-label'>Número de Resolución y Auto</label>
                                <input 
                                    type="text"
                                    className='form-control no-resize'
                                    name="numeroExpediente"
                                    value={numeroExpediente}
                                    onChange={handleInputChange} 
                                    autoComplete="off"/>
                              </div>
                              <div className='col-md-4'>
                              <label className='form-label'>Fecha de Resolución y Auto</label>
                                <input 
                                    type="date"
                                    className='form-control no-resize'
                                    name="fechaExpediente"
                                    value={fechaExpediente}
                                    onChange={handleInputChange} 
                                    autoComplete="off"/>
                              </div>
                              <div className='col-md-4'>
                                <label className='form-label'>Fechas extremas</label>
                                <div className="form-control-wrap">
                                    <div className="input-group">
                                        <input
                                            name="fechaInicial" 
                                            value={fechaInicial}
                                            onChange={handleInputChange} 
                                            type="date" 
                                            className="form-control"/>
                                        <input 
                                            name="fechaFinal"
                                            value={fechaFinal}
                                            onChange={handleInputChange}
                                            type="date" 
                                            min={formValues.fechaInicial}
                                            className="form-control" />
                                    </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className='row mt-2'>
                               <div className='col-md-4'>
                                  <label className='form-label'>Número de folios</label>
                                  <input 
                                      type="number"
                                      className='form-control no-resize'
                                      name="folios"
                                      value={folios}
                                      onChange={handleInputChange} 
                                      autoComplete="off"/>
                                </div>
                                <div className='col-md-8'>
                                    <label className='form-label'>Notas</label>
                                    <div className="form-control-wrap">
                                        <div className="input-group">
                                            <input 
                                                type="text"
                                                className='form-control no-resize'
                                                value={notas}
                                                onChange={handleInputChange} 
                                                name="notas"
                                                autoComplete="off"/>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-2'>
                                    <br />
                                    <button 
                                        onClick={handleBtnAgregar}
                                        type="button"
                                        disabled={isLoadingAdd}
                                        className="btn btn-outline-primary btn-dim  mt-1 btn-block">
                                            <LoadingInButton isLoading={isLoadingAdd} btnText="Agregar" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* <div className='row pt-1'>
        <div className='col-md-12'>
            <TablaCarpetas  tipoOrigen={3}/>
        </div>
    </div> */}
    </>
  )
}  
 