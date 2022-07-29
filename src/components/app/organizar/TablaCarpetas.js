import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import { format, parseISO } from 'date-fns'
import Select from 'react-select';
import Swal from 'sweetalert2';

import { LoadingInButton } from './../LoadingInButton';

import 
{ 
    useAuthStore, useDependieciaStore, useOficinaStore, useSerieStore, useSubserieStore, useTipoDocumentoStore,
    useForm, useCarpetaStore, useVigenciaStore, useSoporteStore, useFrecuenciaStore, useCajaStore
} from '../../../hooks';
import { NumeroCaja } from './NumeroCaja';

export const TablaCarpetas = () => {

    const { proyectoId, proyecto } = useAuthStore();
    const { startLoadingDependencias, dependencias } = useDependieciaStore();
    const { startLoadingOficinas, oficinas } = useOficinaStore();
    const { series, startLoadingSeries } = useSerieStore();
    const { subseries, startLoadingSubseries } = useSubserieStore();
    const { tipoDocumentos, startLoadingTipoDocumentos } = useTipoDocumentoStore();
    const { vigencias, startLoadingVigencias } = useVigenciaStore();
    const { soportes, startLoadingSoportes } = useSoporteStore();
    const { frecuencias, startLoadingFrecuencias } = useFrecuenciaStore();
    const { isLoadingRotuloCaja, buscarRotuloCaja, rotuloCaja } = useCajaStore();
    const { crearCarpeta, isLoadingAddCarpeta, getCarpetasByCajaId, isDeletingCarpeta } = useCarpetaStore();

    //useForm
    const documentoForm = {
        dependencia: {},
        oficina: {},
        vigencia: {},
        numeroCaja: '',
        serie: {},
        subserie: {},
        tipoDocumento:{},
        tipoSoporte:{},
        frecuenciaUso:{},
        fechaExtremaInicial: '', 
        fechaExtremaFinal: '',
        tomoActual: '',
        tomoFinal: '',
        folioInicial: '',
        folioFinal: '',
        codigo: '',
        notas: '',
        cedulaCatastral: '',
        duplicidad:'',
        autoDeCierre: ''
    };

    const [formValues, handleInputChange, handleSelectChange, resetFuidForm, setEditFuidForm] = useForm(documentoForm);

    const {
        dependencia,
        oficina,
        vigencia,
        numeroCaja,
        serie,
        subserie,
        tipoDocumento,
        tipoSoporte,
        frecuenciaUso,
        fechaExtremaInicial, 
        fechaExtremaFinal,
        tomoActual,
        tomoFinal,
        folioInicial,
        folioFinal,
        codigo,
        notas,
        cedulaCatastral,
        duplicidad,
        autoDeCierre
    } = formValues;

    useEffect(() => {
        if(proyectoId > 0){
            startLoadingDependencias(proyectoId);
            startLoadingFrecuencias();
            startLoadingSoportes();
            startLoadingVigencias();
        }
    }, [proyectoId]);

    useEffect(() => {
        if(dependencias?.length > 0 && proyectoId == 1){
            handleSelectDependenciaChange(dependencias[0]);
        }
    }, [dependencias]);

    useEffect(() => {
        if(oficinas?.length > 0 && proyectoId == 1){
            handleSelectSubDependenciaChange(oficinas[0]);
        }
    }, [oficinas]);

    useEffect(() => {
        if(vigencias?.length > 0 && proyectoId == 1){
            handleSelectVigenciaChange(vigencias[2]);
        }
    }, [vigencias]);

    useEffect(() => {
        if(series?.length > 0 && proyectoId == 1){
            handleSelectSerieChange(series[0]);
        }
    }, [series]);

    useEffect(() => {
        if(subseries?.length > 0 && proyectoId == 1){
            handleSelectSubserieChange(subseries[0]);
        }
    }, [subseries]);

    useEffect(() => {
        if(tipoDocumentos?.length > 0 && proyectoId == 1){
            handleSelectTipoDocumentoChange(tipoDocumentos[0]);
        }
    }, [tipoDocumentos]);

    useEffect(() => {
        if(frecuencias?.length > 0){
            handleSelectFrecuenciaChange(frecuencias[0]);
        }
    }, [frecuencias]);

    useEffect(() => {
        if(soportes?.length > 0){
            handleSelectSoporteChange(soportes[0]);
        }
    }, [soportes]);

    useEffect(() => {
        if(rotuloCaja.cajaId > 0){
            getCarpetasByCajaId(rotuloCaja.cajaId);
        }
    }, [rotuloCaja]);

    const handleSelectDependenciaChange = ( selectedOption ) => {           
        startLoadingOficinas(selectedOption.value);
        handleSelectChange(selectedOption, "dependencia");
    }

    const handleSelectSubDependenciaChange = ( selectedOption ) => {           
        startLoadingSeries(selectedOption.value);
        handleSelectChange(selectedOption, "oficina");  
    }

    const handleSelectSerieChange = ( selectedOption) => {   
        startLoadingSubseries(selectedOption.value);
        handleSelectChange(selectedOption, "serie");
    }

    const handleSelectSubserieChange = ( selectedOption) => {   
        startLoadingTipoDocumentos(selectedOption.value);
        handleSelectChange(selectedOption, "subserie");
    }

    const handleSelectTipoDocumentoChange = ( selectedOption) => {    
        handleSelectChange(selectedOption, "tipoDocumento");
    }

    const handleSelectSoporteChange = ( selectedOption ) => {   
        handleSelectChange(selectedOption, "tipoSoporte");
    }

    const handleSelectFrecuenciaChange = ( selectedOption ) => {   
        handleSelectChange(selectedOption, "frecuenciaUso");
    }

    const handleSelectVigenciaChange = ( selectedOption ) => {   
        handleSelectChange(selectedOption, "vigencia");
    }

    const handleSelectAutoDeCierreChange = ( selectedOption ) => {   
        handleSelectChange(selectedOption, "autoDeCierre");
    }

    const handleBtnAgregar = async () => {

        // const {isValid, validationConditions} = isValidFormForSave(formValues);
        
        // if (!isValid){

        //     Swal.fire({
        //         //position: 'top-end',
        //         icon: 'warning',
        //         title: 'Campos incompletos',
        //         text: `Los siguientes campos son obligatorios: ${String(validationConditions)}`,
        //         showConfirmButton: true,
        //         //timer: 1500
        //     });

        //     return;
        // }

        console.log(formValues);
        // await crearCarpeta(formValues, proyectoId);
        
        // const frecuenciaDefault = frecuencias.find(f => f.label == 'Sin Frecuencia');
        // const tipoSoporteDefault = soportes.find(f => f.label == 'Sin Soporte');

        // resetFuidForm(frecuenciaDefault, tipoSoporteDefault);

    } 

    const isValidFormForSave = (criteria = {}) => {

        const {
            dependencia, oficina, numeroCaja,
            serie, subserie, tipoDocumento, 
            autoDeCierre, vigencia } = criteria;

        const validationConditions = [];
        let isValid = true;

        if ( typeof dependencia.value === 'undefined' || typeof oficina.value === 'undefined'
                || typeof serie.value === 'undefined' || typeof  subserie.value   === 'undefined' 
                || typeof vigencia.value === 'undefined' || typeof autoDeCierre.value === 'undefined'){            
                
                if(typeof dependencia.value === 'undefined'){
                    validationConditions.push(' Dependencia');
                }
                if(typeof oficina.value === 'undefined'){
                    validationConditions.push(' Sub Dependencia');
                }
                if(typeof vigencia.value === 'undefined'){
                    validationConditions.push(' Vigencia');
                }
                if(typeof serie.value === 'undefined'){
                    validationConditions.push(' Serie');
                }
                if(typeof subserie.value === 'undefined'){
                    validationConditions.push(' Subserie');
                }
                if(typeof autoDeCierre.value === 'undefined'){
                    validationConditions.push(' Auto de cierre');
                }
                isValid = false;
            }
        
            return {
                isValid,
                validationConditions
            };            
    } 

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    Modal.setAppElement('#root');

    const [modalIsOpen, setIsOpen] = useState(false);


    const { carpetasByCajaId, deleteCarpetaById } = useCarpetaStore();
   
    if(carpetasByCajaId === undefined){
        return null;
    }

    const handleBtnEliminar = async (carpetaId) => {
        await deleteCarpetaById(carpetaId);
    }

    function openModal(carpeta) {

        console.log(carpeta);

        const formValues = {
            cedulaCatastral:'',
            notas:carpeta.descripcion,
            fechaExtremaInicial: format(parseISO(carpeta.fechaInicial), 'yyyy-MM-dd') ,
            fechaExtremaFinal:format(parseISO(carpeta.fechaFinal), 'yyyy-MM-dd'),
        }

        setEditFuidForm(formValues);

        document.body.style.overflow = 'hidden';
        setIsOpen(true);
     }
    
     function afterOpenModal() {
        // references are now sync'd and can be accessed.
     }
    
     function closeModal() {
        setIsOpen(false);
        document.body.style.overflow = 'unset';

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
                                        Inventario Carpetas
                                    </h6>
                                    </div>
                                    <div className="card-tools me-n1">
                                        <ul className="btn-toolbar"> 
                                            <NumeroCaja numeroCaja={carpetasByCajaId[0]?.numeroCaja}/>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        
                            <div className="card-inner p-0">
                                <table className="table table-sm table-hover">
                                    <thead className="tb-odr-head">
                                        <tr>
                                            <th>
                                                <span>Código</span>
                                            </th>
                                            <th >
                                                <span>Serie, Subserie o tipo documental</span>
                                            </th>
                                            <th >
                                                <span>Número</span>
                                            </th>
                                            <th >
                                                <span>Fechas Extremas</span>
                                            </th>
                                            <th >
                                                <span>Tomo</span>
                                            </th>
                                            <th >
                                                <span>Folios</span>
                                            </th>
                                            <th >
                                                <span>Soporte</span>
                                            </th>
                                            <th >
                                                <span>Frecuencia</span>
                                            </th>
                                            <th >
                                                <span>Notas</span>
                                            </th>
                                            <th >
                                                <span></span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { carpetasByCajaId.map( carpeta => (
                                            <tr key={carpeta.id }>
                                                <td>
                                                    <span className="tb-odr-id">
                                                        {carpeta.dependencia.codigo}.{carpeta.oficina.codigo}.{carpeta.serie.codigo}.{carpeta.subserie.codigo}
                                                    </span>
                                                </td>
                                                <td>
                                                    {carpeta.serie.descripcion} - {carpeta.subserie.descripcion} - {carpeta.tipoDocumento.descripcion}
                                                </td>
                                                <td>
                                                    {carpeta.codigo}
                                                </td>
                                                <td>
                                                       {`${format(parseISO(carpeta.fechaInicial), 'dd/MM/yyyy')} - ${format(parseISO(carpeta.fechaFinal), 'dd/MM/yyyy')}`}
                                                </td>
                                                <td>
                                                    {carpeta.tomoInicial} de {carpeta.tomoFinal}
                                                </td>
                                                <td>
                                                    {carpeta.folioInicial} hasta {carpeta.folioFinal}
                                                </td>
                                                <td>
                                                    {carpeta.tipoSoporte.descripcion}
                                                </td>
                                                <td>
                                                    {carpeta.frecuenciaUso.descripcion}
                                                </td>
                                                <td>
                                                    {carpeta.descripcion}
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
                                                                <li>
                                                                    <a href="#">
                                                                        <em className="icon ni ni-external" />
                                                                        <span>Mover Carpeta</span>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="#" onClick={() => openModal(carpeta)}>
                                                                        <em className="icon ni ni-edit" />
                                                                        <span>Editar</span>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a onClick={() => handleBtnEliminar(carpeta.id)}>
                                                                        <em className="icon ni ni-trash" />
                                                                        <span>Eliminar</span>
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

                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Editar Carpeta"
                >   
                        <div className="modal-header">
                            <h5 className="modal-title">Editar Carpeta</h5>
                            
                            <ul className="btn-toolbar">  
                                
                                <NumeroCaja numeroCaja={carpetasByCajaId[0]?.numeroCaja}/>

                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <a href="#" onClick={closeModal} className="close">
                                    <em className="icon ni ni-cross" />
                                </a>
                            </ul>

                        </div>
                            <div className="modal-body modal-body-lg">
                                <div className='col-md-12'>
                                    <div className='row'>
                                        <div className='col-md-4'>
                                            <label className='form-label'>Serie</label>
                                            <Select
                                                isDisabled={proyectoId== 1 ? true : false}
                                                options={series}   
                                                value={serie}    
                                                onChange={(selectedOption) => handleSelectSerieChange(selectedOption)}
                                                placeholder='Series'
                                                />
                                        </div>
                                        <div className='col-md-4'>
                                            <label className='form-label'>Subserie</label>
                                            <Select
                                                options={subseries}  
                                                value={subserie}    
                                                isDisabled={proyectoId== 1 ? true : false}
                                                onChange={(selectedOption) => handleSelectSubserieChange(selectedOption)}
                                                placeholder='Subseries'
                                                />
                                        </div>
                                        <div className='col-md-4'>
                                            <label className='form-label'>Tipo Documental</label>
                                            <Select
                                                options={{tipoDocumentos}}  
                                                value={tipoDocumento}   
                                                isDisabled={proyectoId== 1 ? true : false} 
                                                onChange={(selectedOption) => handleSelectTipoDocumentoChange(selectedOption)}
                                                placeholder='Tipo Documental'
                                                />
                                        </div>
                                    </div>
                                    <div className='row mt-2'>
                                        <div className='col-md-4'>
                                            <label className='form-label'>Fechas extremas</label>
                                            <div className="form-control-wrap">
                                                <div className="input-group">
                                                    <input 
                                                        
                                                        name="fechaExtremaInicial" 
                                                        onChange={handleInputChange} 
                                                        type="date" 
                                                        value={fechaExtremaInicial}
                                                        className="form-control"/>
                                                    <input 
                                                        
                                                        name="fechaExtremaFinal"
                                                        onChange={handleInputChange}
                                                        value={fechaExtremaFinal}
                                                        type="date" 
                                                        min={formValues.fechaExtremaInicial}
                                                        className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-3'>
                                            <label className='form-label'>Tomos</label>
                                            <div className="form-control-wrap">
                                                <div className="input-group">
                                                    <input 
                                                        name="tomoActual"
                                                        onChange={handleInputChange}
                                                        value={tomoActual}
                                                        type="number" 
                                                        disabled={true}
                                                        autoComplete="off"
                                                        className="form-control" 
                                                        placeholder='Actual'/>
                                                    <input 
                                                        name="tomoFinal"
                                                        onChange={handleInputChange}
                                                        min={formValues.tomoActual}
                                                        value={tomoFinal}
                                                        type="number" 
                                                        disabled={true}
                                                        autoComplete="off"
                                                        className="form-control" 
                                                        placeholder='Final'/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-3'>
                                            <label className='form-label'>Folios</label>
                                            <div className="form-control-wrap">
                                                <div className="input-group">
                                                    <input 
                                                        name="folioInicial"
                                                        onChange={handleInputChange}
                                                        type="number" 
                                                        className="form-control"
                                                        value={folioInicial} 
                                                        disabled={true}
                                                        placeholder='Inicial'
                                                        autoComplete="off"/>
                                                    <input 
                                                        name="folioFinal"
                                                        onChange={handleInputChange}
                                                        value={folioFinal}
                                                        min={formValues.folioInicial}
                                                        type="number" 
                                                        disabled={true}
                                                        className="form-control" 
                                                        placeholder='Final'
                                                        autoComplete="off"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <label className='form-label'>Núm. Expediente</label>
                                                <input 
                                                    value={codigo}
                                                    name="codigo"
                                                    onChange={handleInputChange}
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder=''
                                                    autoComplete="off"/>
                                        </div>
                                    </div>
                                    <div className='row mt-2'>
                                        <div className='col-md-3'>
                                            <label className='form-label'>Soporte</label>
                                            <Select
                                                options={soportes}
                                                placeholder='' 
                                                isDisabled={true}
                                                value={tipoSoporte}    
                                                onChange={(selectedOption) => handleSelectSoporteChange(selectedOption)}
                                                />
                                        </div>
                                        <div className='col-md-3'>
                                            <label className='form-label'>Frecuencia</label>
                                            <Select
                                                options={frecuencias}    
                                                placeholder='' 
                                                isDisabled={true}
                                                value={frecuenciaUso}    
                                                onChange={(selectedOption) => handleSelectFrecuenciaChange(selectedOption)}
                                                />
                                        </div>
                                        <div className="col-md-2">
                                            <label className='form-label'>Cédula Catastral</label>
                                                <input 
                                                    name="cedulaCatastral"
                                                    value={cedulaCatastral}
                                                    onChange={handleInputChange}
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder=''/>
                                        </div>
                                        <div className='col-md-2'>
                                            <label className='form-label'>Duplicidad</label>
                                            <div className="form-control-wrap">
                                                <div className="input-group">
                                                    <input 
                                                        name="duplicidad"
                                                        disabled={true}
                                                        value={duplicidad}
                                                        onChange={handleInputChange}
                                                        type="text" 
                                                        className="form-control" 
                                                        placeholder='#'
                                                        min={0}
                                                        autoComplete="off"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <label className='form-label'>Auto de Cierre</label>
                                            <Select
                                                options={[{ value: 1, label: 'Si'},{ value: 0, label: 'No'}]}    
                                                placeholder='' 
                                                value={autoDeCierre}    
                                                onChange={(selectedOption) => handleSelectAutoDeCierreChange(selectedOption)}
                                                />
                                        </div>
                                    </div>
                                    <div className='row mt-2'>
                                        <div className='col-md-10'>
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
                                                disabled={isLoadingAddCarpeta}
                                                className="btn btn-outline-primary btn-dim  mt-1 btn-block">
                                                    <LoadingInButton isLoading={isLoadingAddCarpeta} btnText="Modificar" />
                                            </button>
                                        </div>
                                    </div>
                                </div>  
                                
                            </div>   
                </Modal>
            </>
        )
}
