import React, { useEffect } from 'react'
import Select from 'react-select';
import { parseISO, format, isAfter } from 'date-fns'
import Swal from 'sweetalert2';

import { 
        useAuthStore, useCarpetaStore, useDependieciaStore, 
        useFormBasic, useOficinaStore, useSerieStore, useSubserieStore } from '../../../hooks';
import Modal from 'react-modal';
import { LoadingInButton } from '../LoadingInButton';

export const EditarCarpetaGobernacionModal = () => {

    const { proyectoId, proyecto, username } = useAuthStore();
    const { startLoadingDependencias, dependencias, setDependenciaSelected } = useDependieciaStore();
    const { startLoadingOficinas, oficinas, setOficinaSelected } = useOficinaStore();
    const { series, startLoadingSeries } = useSerieStore();
    const { subseries, startLoadingSubseries } = useSubserieStore();
    
    const { 
        isLoadingAddCarpeta, setCarpetasByCajaId,
        carpetaActiva, isOpenModalEditarCarpetaGobernacion, 
        closeModalEditarCarpetaGobernacion, editarCarpetaGobernacion
    } = useCarpetaStore();
    
    Modal.setAppElement('#root');

    //useForm
    const documentoForm = {
      dependencia: {},
      oficina: {},
      numeroCaja: '',
      serie: {},
      subserie: {},
      fechaExtremaInicial: '', 
      fechaExtremaFinal: '',
      tomoActual: '',
      tomoFinal: '',
      folioInicial: '',
      folioFinal: '',
      codigo: '', // expediente
      cargo: '',
      notas: '',
      cedulaCatastral: '', // nombres
      duplicidad:'',
      fechaPosesion: ''
      };

      const [formValues, handleInputChange, handleSelectChange, reset, setFormValues] = useFormBasic(documentoForm);

      const {
        dependencia, oficina, numeroCaja, serie, subserie, fechaExtremaInicial, 
        fechaExtremaFinal,tomoActual,tomoFinal,folioInicial, folioFinal,codigo,notas,
        cedulaCatastral, duplicidad,cargo,fechaPosesion
      } = formValues;

      useEffect(() => {
        if(proyectoId > 0){
            startLoadingDependencias(proyectoId);
            setCarpetasByCajaId();
        }
      }, [proyectoId]);

      useEffect(() => {
          if(dependencias?.length > 0){
              handleSelectDependenciaChange(dependencias[0]);
          }
      }, [dependencias]);

      useEffect(() => {
          if(oficinas?.length > 0){
              handleSelectSubDependenciaChange(oficinas[0]);
          }
      }, [oficinas]);

      useEffect(() => {
          if(series?.length){
              handleSelectSerieChange(series[0]);
          }
      }, [series]);

      useEffect(() => {
          if(subseries?.length > 0){
              handleSelectSubserieChange(subseries[0]);
          }
      }, [subseries]);

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

      const handleBtnEditar = async () => {

        const {isValid, validationConditions} = isValidFormForSave(formValues);
        
        if (!isValid){

            Swal.fire({
                //position: 'top-end',
                icon: 'warning',
                title: 'Campos incompletos',
                text: `Los siguientes campos son obligatorios: ${String(validationConditions)}`,
                showConfirmButton: true,
            });

            return;
        }

        await editarCarpetaGobernacion(formValues, proyectoId,username,carpetaActiva.id);

        closeModal();
      }

      function afterOpenModal() {

        const fechaInicial = format(parseISO(carpetaActiva.fechaInicial), 'yyyy-MM-dd');
        const fechaFinal = format(parseISO(carpetaActiva.fechaFinal), 'yyyy-MM-dd');

        const newValues = {
          dependencia: {
            label: carpetaActiva.dependencia.descripcion,
            value: carpetaActiva.dependencia.id
          },
          oficina: {
            label: carpetaActiva.oficina.descripcion,
            value: carpetaActiva.oficina.id
          },
          numeroCaja: carpetaActiva.numeroCaja,
          serie: {
            label: carpetaActiva.serie.descripcion,
            value: carpetaActiva.serie.id
          },
          subserie: {
            label: carpetaActiva.subserie.descripcion,
            value: carpetaActiva.subserie.id
          },
          
          fechaExtremaInicial: fechaInicial, 
          fechaExtremaFinal:  fechaFinal, 
          tomoActual: carpetaActiva.tomoInicial,
          tomoFinal: carpetaActiva.tomoFinal,
          folioInicial: carpetaActiva.folioInicial,
          folioFinal: carpetaActiva.folioFinal,
          codigo: carpetaActiva.codigo, // expediente
          cargo: carpetaActiva.cargo,
          notas: carpetaActiva.descripcion,
          cedulaCatastral: carpetaActiva.cedulaCatastral, // nombres
          duplicidad:carpetaActiva.duplicidad,
          fechaPosesion: format(parseISO(carpetaActiva.fechaPosesion), 'yyyy-MM-dd')
        };
        
        setFormValues({newValues});
      }
        
      function closeModal() {
        closeModalEditarCarpetaGobernacion();
      }

      const isValidFormForSave = (criteria = {}) => {

        const {
             numeroCaja, dependencia, oficina,
             serie, subserie, codigo, cedulaCatastral, 
             fechaPosesion, cargo, fechaExtremaInicial, fechaExtremaFinal } = criteria;

        const validationConditions = [];
        let isValid = true;
        let isValidFechas = true; 
        
        if( (fechaExtremaInicial == '' && fechaExtremaFinal != '')){
            isValidFechas = false;
        }

        if( (fechaExtremaInicial != '' && fechaExtremaFinal == '') ){
            isValidFechas = false;
        }

        if((fechaExtremaInicial != '' && fechaExtremaFinal != '') ){
            
            const fechaIni = new Date(parseISO(fechaExtremaInicial));
            const fechaFin = new Date(parseISO(fechaExtremaFinal));

            if(isAfter(fechaIni, fechaFin)){
                isValidFechas = false; 
            }else{
                isValidFechas = true; 
            }
        }  

        if (     typeof dependencia.value === 'undefined' || typeof oficina.value === 'undefined'
             || (typeof numeroCaja === 'undefined' || numeroCaja === 0 || numeroCaja === "" )
             || (typeof codigo === 'undefined' || numeroCaja === "" )
             || (typeof cedulaCatastral === 'undefined' || cedulaCatastral === "" )
             || (typeof fechaPosesion === 'undefined' || fechaPosesion === "" )
             || (typeof cargo === 'undefined' || cargo === "" )
             || typeof serie.value === 'undefined' || typeof  subserie.value   === 'undefined' 
             || !isValidFechas)
        {            
            
            if(typeof numeroCaja === 'undefined' || numeroCaja === 0 || numeroCaja === ""){
                validationConditions.push(' Número de Caja');
            }
            if(typeof dependencia.value === 'undefined'){
                validationConditions.push(' Dependencia');
            }
            if(typeof oficina.value === 'undefined'){
                validationConditions.push(' Sub Dependencia');
            }
            if(typeof serie.value === 'undefined'){
                validationConditions.push(' Serie');
            }
            if(typeof subserie.value === 'undefined'){
                validationConditions.push(' Subserie');
            }
            if(typeof codigo === 'undefined' || codigo === ""){
                validationConditions.push(' Número del expediente (Cédula)');
            }
            if(typeof cedulaCatastral === 'undefined' || cedulaCatastral === ""){
                validationConditions.push(' Apellidos y Nombres');
            }
            if(typeof fechaPosesion === 'undefined' || fechaPosesion === "" ){
                validationConditions.push(' Fecha de posesión');
            }
            if(typeof cargo === 'undefined' || cargo === "" ){
                validationConditions.push(' Cargo');
            }
            if(!isValidFechas){
                validationConditions.push(' Rango de fechas extremas');
            }
            isValid = false;
        }
       
        return {
            isValid,
            validationConditions
        };            
    } 

  return (
    <>
     <Modal
        isOpen={isOpenModalEditarCarpetaGobernacion}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.75)'
          },
          content: {
            position: 'absolute',
            top: '70px',
            left: '40px',
            right: '40px',
            bottom: '40px',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '10px'
          }
        }}
        contentLabel="Mover Carpeta"> 

          <div className="modal-header ">
            <h5 className="modal-title">Mover carpeta a otra caja</h5>
            <ul className="btn-toolbar">   
                <a href="#" onClick={closeModal} className="close">
                    <em className="icon ni ni-cross" />
                </a>
            </ul>
          </div>
          <div className="modal-body modal-body-lg pt-2">            
            <div className='row'>
              <div className=" row">
                    <div className='col-md-6'>
                        <label className='form-label'>Dependencia</label>
                        <Select
                            options={dependencias}    
                            value={dependencia}    
                            placeholder=''
                            onChange={(selectedOption) => handleSelectDependenciaChange(selectedOption)}
                        />
                    </div>
                    <div className='col-md-6'>
                        <label className='form-label'>Sub Dependencia</label>
                        <Select
                            options={oficinas}   
                            placeholder=''
                            value={oficina}    
                            onChange={(selectedOption) => handleSelectSubDependenciaChange(selectedOption)}
                        />
                    </div>
                    <div className='col-md-6 pt-2'>
                        <label className='form-label'>Serie</label>
                        <Select
                            options={series}   
                            value={serie}    
                            onChange={(selectedOption) => handleSelectSerieChange(selectedOption)}
                            placeholder='Series'
                            />
                    </div>
                    <div className='col-md-6 pt-2'>
                        <label className='form-label'>Subserie</label>
                        <Select
                            options={subseries}  
                            value={subserie}    
                            onChange={(selectedOption) => handleSelectSubserieChange(selectedOption)}
                            placeholder='Subseries'
                            />
                    </div>
                </div>

                <div className='row mt-2'>
                    <div className="col-md-3">
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
                    <div className="col-md-5">
                        <label className='form-label'>Apellidos y Nombres</label>
                            <input 
                                name="cedulaCatastral"
                                value={cedulaCatastral}
                                onChange={handleInputChange}
                                type="text" 
                                className="form-control" 
                                placeholder=''/>
                    </div>
                    <div className="col-md-4">
                        <label className='form-label'>Cargo</label>
                        <input 
                            name="cargo"
                            value={cargo}
                            onChange={handleInputChange}
                            type="text" 
                            className="form-control" 
                            placeholder=''/>
                    </div>
                </div>

                <div className='row mt-2'>
                    <div className='col-md-3'>
                        <label className='form-label'>Fecha de Posesión</label>
                        <input
                            name="fechaPosesion" 
                            onChange={handleInputChange} 
                            type="date" 
                            value={fechaPosesion}
                            className="form-control"
                        />
                    </div>
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
                </div>

                <div className='row mt-2'>
                    <div className='col-md-3'>
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
                            onClick={handleBtnEditar}
                            type="button"
                            disabled={isLoadingAddCarpeta}
                            className="btn btn-outline-primary btn-dim  mt-1 btn-block">
                                <LoadingInButton isLoading={isLoadingAddCarpeta} btnText="Editar" />
                        </button>
                    </div>
                </div>
            </div>
          </div>
     </Modal>
    </>
  )
}
