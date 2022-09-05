import React, { useState } from 'react'
import Modal from 'react-modal';
import { format, parseISO } from 'date-fns'
import Select from 'react-select';
import Swal from 'sweetalert2';

import { LoadingInButton } from './../LoadingInButton';
import { NumeroCaja } from './NumeroCaja';

import 
{ 
    useAuthStore, useSubserieStore, useTipoDocumentoStore, useSerieStore,
    useForm, useCarpetaStore, useSoporteStore, useFrecuenciaStore, useCajaStore
} from '../../../hooks';

import { convertSeriesToSelect, convertSubseriesToSelect, convertTipoDocumentosToSelect } from '../../../helpers';
import { MoverCarpetaModal } from './MoverCarpetaModal';
import { TituloColumna } from './TituloColumna';
import { EditarCarpetaGobernacionModal } from './EditarCarpetaGobernacionModal';

export const TablaCarpetas = ({tipoOrigen}) => {

    const { username, proyectoId } = useAuthStore();
    const { series } = useSerieStore();
    const { subseriesEdit, startLoadingSubseriesEdit } = useSubserieStore();
    const { tipoDocumentosEdit, startLoadingTipoDocumentosEdit } = useTipoDocumentoStore();
    const { soportes } = useSoporteStore();
    const { frecuencias,  } = useFrecuenciaStore();
    const { 
        isLoadingAddCarpeta, editarCarpeta, openModalMoverCarpeta, carpetasByCajaId, 
        deleteCarpetaById, deleteCarpetaGobernacionById, openModalEditarCarpetaGobernacion } 
    = useCarpetaStore();
    const { rotuloCaja, buscarRotuloCajaById } = useCajaStore();

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

    Modal.setAppElement('#root');

    const [modalIsOpen, setIsOpen] = useState(false);
    
    if(carpetasByCajaId === undefined){
        return null;
    }

    const handleBtnEliminar = async (carpetaId) => {
        Swal.fire({  
        title: '¿Está seguro de eliminar la carpeta?',  
        showCancelButton: true,  
        cancelButtonText: 'Cancelar',
        confirmButtonText: `Si`,  
        
        }).then((result) => {  
            if (result.isConfirmed) {   
                //soacha
                if(tipoOrigen === 1 || tipoOrigen === 2) {
                    deleteCarpetaById(carpetaId, username);
                }

                //gobernacion
                if(tipoOrigen === 3) {
                    deleteCarpetaGobernacionById(carpetaId, username, carpetasByCajaId[0]?.numeroCaja, proyectoId);
                }
                
            }
        });
    }

    const handleMoverCarpeta = (carpeta) => {
        openModalMoverCarpeta(carpeta);
    }

    function openModal(carpeta) {
        resetFuidForm();
        
        const serieOption = convertSeriesToSelect([carpeta.serie]);
        const subserieOption = convertSubseriesToSelect([carpeta.subserie]);
        const tipoDocumentoOption = convertTipoDocumentosToSelect([carpeta.tipoDocumento]);
        const tipoSoporteOption = convertTipoDocumentosToSelect([carpeta.tipoSoporte]); 
        const frecuenciaUsoOption = convertTipoDocumentosToSelect([carpeta.frecuenciaUso]); 

        startLoadingSubseriesEdit(serieOption[0].value);
        startLoadingTipoDocumentosEdit(subserieOption[0].value);

        const formValues = {
            id: carpeta.id,
            serie:serieOption[0],
            subserie:subserieOption[0],
            tipoDocumento:tipoDocumentoOption[0],
            cedulaCatastral:'',
            notas:carpeta.descripcion,
            fechaExtremaInicial: format(parseISO(carpeta.fechaInicial), 'yyyy-MM-dd') ,
            fechaExtremaFinal:format(parseISO(carpeta.fechaFinal), 'yyyy-MM-dd'),
            folioInicial:carpeta.folioInicial,
            folioFinal:carpeta.folioFinal,
            tomoActual:carpeta.tomoInicial,
            tomoFinal:carpeta.tomoFinal,
            codigo: carpeta.codigo,
            cedulaCatastral: carpeta.cedulaCatastral,
            duplicidad: carpeta.duplicidad,
            autoDeCierre: carpeta.autoDeCierre ? { value: 1, label: 'Si'} : { value: 0, label: 'No'},
            tipoSoporte: tipoSoporteOption[0],
            frecuenciaUso: frecuenciaUsoOption[0]
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

    const handleSelectSerieChange = ( selectedOption) => {   
        startLoadingSubseriesEdit(selectedOption.value);
        handleSelectChange(selectedOption, "serie");
    }

    const handleSelectSubserieChange = ( selectedOption) => {   
        startLoadingTipoDocumentosEdit(selectedOption.value);
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

    const handleSelectAutoDeCierreChange = ( selectedOption ) => {   
        handleSelectChange(selectedOption, "autoDeCierre");
    }

    const handleEditarCarpetaGobernacion = (carpeta) => {
        openModalEditarCarpetaGobernacion(carpeta);
    }

    const handleBtnModificar = async () => {

        const {isValid, validationConditions} = isValidFormForSave(formValues);
        
        if (!isValid){

            Swal.fire({
                //position: 'top-end',
                icon: 'warning',
                title: 'Campos incompletos',
                text: `Los siguientes campos son obligatorios: ${String(validationConditions)}`,
                showConfirmButton: true,
                //timer: 1500
            });

            return;
        }

        document.body.style.overflow = 'unset';

        await editarCarpeta(formValues, rotuloCaja.cajaId, username);

        await buscarRotuloCajaById(rotuloCaja.cajaId);
        
        setIsOpen(false);
    } 

    const isValidFormForSave = (criteria = {}) => {

        const {
            serie, subserie, tipoDocumento, 
            cedulaCatastral, codigo } = criteria;

        const validationConditions = [];
        let isValid = true;

        if (       typeof serie.value === 'undefined' || typeof  subserie.value   === 'undefined' 
                || typeof tipoDocumento.value === 'undefined' || cedulaCatastral === '' || codigo === ''){            
               
                if(typeof serie.value === 'undefined'){
                    validationConditions.push(' Serie');
                }
                if(typeof subserie.value === 'undefined'){
                    validationConditions.push(' Subserie');
                }
                if(typeof tipoDocumento.value === 'undefined'){
                    validationConditions.push(' Tipo Documento');
                }
                if(cedulaCatastral === ''){
                    validationConditions.push(' Cédula catastral');
                }
                if(codigo === ''){
                    validationConditions.push(' Número del expediente');
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

    return (
            <>
                <div className="nk-block">
                    <div className="card card-bordered card-stretch">
                        <div className="card-inner-group">
                            <div className="card-inner">
                                <div className="card-title-group">
                                    <div className="card-title">
                                    <h6 className="title">
                                        Listado de carpetas
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
                                                <span># Carpeta</span>
                                            </th>
                                            {
                                                tipoOrigen === 3 && 
                                                <th>
                                                    <span>Dependencia, Sub Dependencia</span>
                                                </th>
                                            }
                                            <th>
                                                <span>Serie, Subserie</span>
                                            </th>
                                            <th >
                                                <span>Número del expediente</span>
                                            </th>
                                            <th >
                                                <TituloColumna estado={tipoOrigen} />
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
                                                <span></span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { carpetasByCajaId.map( carpeta => (
                                            <tr key={carpeta.id }>
                                                <td>
                                                    <span className="tb-odr-id">
                                                        {carpeta.numero}
                                                    </span>
                                                </td>
                                                {
                                                    tipoOrigen === 3 && 
                                                    <td>
                                                        {carpeta.dependencia.descripcion} - {carpeta.oficina.descripcion}
                                                    </td>
                                                }
                                                <td>
                                                    {carpeta.serie.descripcion} - {carpeta.subserie.descripcion}
                                                </td>
                                                <td>
                                                    {carpeta.codigo}
                                                </td>
                                                <td>
                                                    {carpeta.cedulaCatastral}
                                                </td>
                                                <td>
                                                {`${format(parseISO(carpeta.fechaInicial), 'dd/MM/yyyy')} - ${format(parseISO(carpeta.fechaFinal), 'dd/MM/yyyy')}`}
                                                </td>
                                                <td>
                                                    {carpeta.tomoInicial} hasta {carpeta.tomoFinal}
                                                </td>
                                                <td>
                                                     {carpeta.folioInicial} hasta {carpeta.folioFinal}
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
                                                               {
                                                                    (tipoOrigen === 1 || tipoOrigen === 2) && 
                                                                    <li>
                                                                        <a href="#" onClick={() => handleMoverCarpeta(carpeta)}>
                                                                            <em className="icon ni ni-external" />
                                                                            <span>Mover carpeta a otra caja</span>
                                                                        </a>
                                                                    </li>
                                                               }
                                                                
                                                                { 
                                                                    (tipoOrigen === 1 || tipoOrigen === 2) && 
                                                                    <li>
                                                                        <a href="#" onClick={() => openModal(carpeta)}>
                                                                            <em className="icon ni ni-edit" />
                                                                            <span>Editar</span>
                                                                        </a>
                                                                    </li>
                                                                }

                                                                { 
                                                                    (tipoOrigen === 3) && 
                                                                    <li>
                                                                        <a href="#" onClick={() => handleEditarCarpetaGobernacion(carpeta)}>
                                                                            <em className="icon ni ni-edit" />
                                                                            <span>Editar</span>
                                                                        </a>
                                                                    </li>
                                                                }
                                                               
                                                                <li>
                                                                    <a href='#' onClick={() => handleBtnEliminar(carpeta.id)}>
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

                {
                    (tipoOrigen === 1 || tipoOrigen === 2) && 
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
                                                <div className='col-md-6'>
                                                    <label className='form-label'>Serie <span className='text-danger'>*</span></label>
                                                    <Select
                                                        options={series}   
                                                        value={serie}    
                                                        onChange={(selectedOption) => handleSelectSerieChange(selectedOption)}
                                                        placeholder='Series'
                                                        />
                                                </div>
                                                <div className='col-md-6'>
                                                    <label className='form-label'>Subserie <span className='text-danger'>*</span></label>
                                                    <Select
                                                        options={subseriesEdit}  
                                                        value={subserie}    
                                                        onChange={(selectedOption) => handleSelectSubserieChange(selectedOption)}
                                                        placeholder='Subseries'
                                                        />
                                                </div>
                                                <div className='col-md-4 d-none'>
                                                    <label className='form-label'>Tipo Documental</label>
                                                    <Select
                                                        options={tipoDocumentosEdit}
                                                        value={tipoDocumento}   
                                                        onChange={(selectedOption) => handleSelectTipoDocumentoChange(selectedOption)}
                                                        placeholder='Tipo Documental'
                                                        />
                                                </div>
                                            </div>
                                            <div className='row mt-2'>
                                                <div className='col-md-5'>
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
                                                <div className='col-md-4'>
                                                    <label className='form-label'>Folios</label>
                                                    <div className="form-control-wrap">
                                                        <div className="input-group">
                                                            <input 
                                                                name="folioInicial"
                                                                onChange={handleInputChange}
                                                                type="number" 
                                                                className="form-control"
                                                                value={folioInicial} 
                                                                placeholder='Inicial'
                                                                autoComplete="off"/>
                                                            <input 
                                                                name="folioFinal"
                                                                onChange={handleInputChange}
                                                                value={folioFinal}
                                                                min={formValues.folioInicial}
                                                                type="number" 
                                                                className="form-control" 
                                                                placeholder='Final'
                                                                autoComplete="off"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <label className='form-label'>Núm. Expediente <span className='text-danger'>*</span></label>
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
                                                <div className='col-md-3 d-none'>
                                                    <label className='form-label'>Soporte</label>
                                                    <Select
                                                        options={soportes}
                                                        placeholder='' 
                                                        value={tipoSoporte}    
                                                        onChange={(selectedOption) => handleSelectSoporteChange(selectedOption)}
                                                        />
                                                </div>
                                                <div className='col-md-3 d-none'>
                                                    <label className='form-label'>Frecuencia</label>
                                                    <Select
                                                        options={frecuencias}    
                                                        placeholder='' 
                                                        value={frecuenciaUso}    
                                                        onChange={(selectedOption) => handleSelectFrecuenciaChange(selectedOption)}
                                                        />
                                                </div>
                                                <div className={`${tipoOrigen === 1 ? "col-md-3" : "col-md-6"}`}>
                                                    <label className='form-label'>
                                                        <TituloColumna estado={tipoOrigen} />
                                                    <span className='text-danger'>*</span></label>
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
                                                <div className={`col-md-3 ${tipoOrigen === 1 ? "" : "d-none"}`}>
                                                    <label className='form-label'>Auto de Cierre<span className='text-danger'>*</span></label>
                                                    <Select
                                                        options={[{ value: 1, label: 'Si'},{ value: 0, label: 'No'}]}    
                                                        placeholder='' 
                                                        value={autoDeCierre}    
                                                        onChange={(selectedOption) => handleSelectAutoDeCierreChange(selectedOption)}
                                                        />
                                                </div>
                                                <div className='col-md-4'>
                                                    <label className='form-label'>Tomos</label>
                                                    <div className="form-control-wrap">
                                                        <div className="input-group">
                                                            <input 
                                                                name="tomoActual"
                                                                onChange={handleInputChange}
                                                                value={tomoActual}
                                                                type="number" 
                                                                autoComplete="off"
                                                                className="form-control" 
                                                                placeholder='Actual'/>
                                                            <input 
                                                                name="tomoFinal"
                                                                onChange={handleInputChange}
                                                                min={formValues.tomoActual}
                                                                value={tomoFinal}
                                                                type="number" 
                                                                autoComplete="off"
                                                                className="form-control" 
                                                                placeholder='Final'/>
                                                        </div>
                                                    </div>
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
                                                        onClick={handleBtnModificar}
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
                }

                <MoverCarpetaModal />

                {
                    (tipoOrigen === 3) && 
                        <EditarCarpetaGobernacionModal /> 
                }
                
            </>
        )
}
