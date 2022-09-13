import React, { useEffect } from 'react'
import Select from 'react-select';
import { useAuthStore, useCajaStore, useCarpetaStore, useDependieciaStore, useForm, useOficinaStore, useVigenciaStore } from '../../../hooks';
import { LoadingInButton } from '../LoadingInButton';
import Swal from 'sweetalert2';


export const FiltrosCaja = ({titulo}) => {

    const { dependencias, dependenciaActiva, startLoadingDependencias, setDependenciaSelected } = useDependieciaStore();
    const { startLoadingOficinas, oficinas, oficinaActiva, setOficinaSelected } = useOficinaStore();
    const { vigencias, vigenciaActiva, setVigenciaSelected, startLoadingVigencias } = useVigenciaStore();
    const { cajas, startLoadingCajas } = useCajaStore();
    const { proyectoId, proyecto } = useAuthStore();
    const { isLoading, getCarpetasByCajaId } = useCarpetaStore();

    useEffect(() => {
        if(proyectoId > 0){
            startLoadingDependencias(proyectoId);
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
            if(typeof oficinaActiva != "undefined"){
                handleSelectSubDependenciaChange(oficinaActiva);
                return;    
            }
            handleSelectSubDependenciaChange(oficinas[0]);
        }
    }, [oficinas]);

    useEffect(() => {
        if(vigencias?.length > 0 && proyectoId == 1){
            handleSelectVigenciaChange(vigenciaActiva);
        }
    }, [vigencias]);

    const handleSelectDependenciaChange = ( selectedOption ) => {    
        startLoadingOficinas(selectedOption.value);
        handleSelectChange(selectedOption, "dependencia");
        setDependenciaSelected(selectedOption);

        if(dependenciaActiva && oficinaActiva && vigenciaActiva && proyectoId){
            const criteria = 
            {
                "proyectoId": parseInt(proyectoId),
                "dependenciaId": selectedOption.value,
                "oficinaId": oficinaActiva.value,
                "vigenciaId": vigenciaActiva.value
            };
            buscarCajas(criteria);
        }
    }

    const handleSelectSubDependenciaChange = ( selectedOption ) => {           
        handleSelectChange(selectedOption, "oficina"); 
        setOficinaSelected(selectedOption);

        if(dependenciaActiva && oficinaActiva && vigenciaActiva && proyectoId){
            const criteria = 
            {
                "proyectoId": parseInt(proyectoId),
                "dependenciaId": dependenciaActiva.value,
                "oficinaId": selectedOption.value,
                "vigenciaId": vigenciaActiva.value
            };
            buscarCajas(criteria);
        }
    }

    const handleSelectVigenciaChange = ( selectedOption ) => {   
        handleSelectChange(selectedOption, "vigencia");
        setVigenciaSelected(selectedOption);
        
        if(dependenciaActiva && oficinaActiva && vigenciaActiva && proyectoId){
            const criteria = 
            {
                "proyectoId": parseInt(proyectoId),
                "dependenciaId": dependenciaActiva.value,
                "oficinaId": oficinaActiva.value,
                "vigenciaId": selectedOption.value
            };
            buscarCajas(criteria);
        }
    }
    
    const handleSelectCajaChange = ( selectedOption ) => {  
        handleSelectChange(selectedOption, "caja");
    }
   
    //useForm
    const documentoForm = {
        dependencia: {},
        oficina: {},
        vigencia: {},
        caja: {}
    };

    const [formValues, handleInputChange, handleSelectChange] = useForm(documentoForm);

    const {
        dependencia,
        oficina,
        vigencia,
        caja
    } = formValues;

    const buscarCajas = async (criteria) => { 
        await startLoadingCajas(criteria);
    }

    const handleBtnBuscarCarpetas = async () => {
        
        if(!formValues.caja.cajaId){
            Swal.fire({
                //position: 'top-end',
                icon: 'warning',
                title: 'Campos Incompletos',
                text: 'Por favor selecciona todos los campos',
                showConfirmButton: true,
                timer: 1500
            });
            return;
        }

        getCarpetasByCajaId(formValues.caja.cajaId);
    }

    return (
        <>
            <div className='col-md-12'>
            <h6 className="title pb-2"><em className="icon ni ni-file-text-fill"></em> {titulo}</h6>
                <div className="card card-bordered h-100">
                    <div className="card-inner">
                        <div className=" row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="site-name">
                                        Entidad
                                    </label>
                                    <input type="text" className="form-control" disabled={true} value={ proyecto }/>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="site-name">
                                        Dependencia
                                    </label>
                                    <Select
                                        options={dependencias}    
                                        value={dependencia}    
                                        placeholder=''
                                        onChange={(selectedOption) => handleSelectDependenciaChange(selectedOption)}
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="site-name">
                                        Sub Dependencia
                                    </label>
                                    <Select
                                        options={oficinas}   
                                        placeholder=''
                                        value={oficina}    
                                        onChange={(selectedOption) => handleSelectSubDependenciaChange(selectedOption)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="pt-2 row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="site-name">
                                        Vigencia
                                    </label>
                                    <Select
                                        options={vigencias}    
                                        placeholder=''
                                        value={vigencia}    
                                        onChange={(selectedOption) => handleSelectVigenciaChange(selectedOption)}
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="site-name">
                                        Caja
                                    </label>
                                    <Select
                                        options={cajas}    
                                        placeholder=''
                                        value={caja}    
                                        onChange={(selectedOption) => handleSelectCajaChange(selectedOption)}
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                <label className='form-label'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
                                <button onClick={handleBtnBuscarCarpetas} disabled={isLoading} 
                                        className="btn btn-block btn-outline-primary btn-dim">
                                        <LoadingInButton isLoading={isLoading} btnText="Buscar Carpetas" /> 
                                </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
