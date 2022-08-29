import React, { useEffect } from 'react'
import Select from 'react-select';
import { useAuthStore, useCajaStore, useCarpetaStore, useDependieciaStore, useForm, useOficinaStore, useVigenciaStore } from '../../../hooks';
import { LoadingInButton } from '../LoadingInButton';
import Swal from 'sweetalert2';

export const FiltrosVigencia = () => {

    const { dependencias, startLoadingDependencias, setDependenciaSelected } = useDependieciaStore();
    const { startLoadingOficinas, oficinas, setOficinaSelected } = useOficinaStore();
    const { vigencias, startLoadingVigencias } = useVigenciaStore();
    const { proyectoId } = useAuthStore();
    const { isLoading, getCarpetasByCajaId, isLoadingBuscarEstadoAsignacionImagenes, buscarEstadoAsignacionArchivos } = useCarpetaStore();

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
            handleSelectSubDependenciaChange(oficinas[0]);
        }
    }, [oficinas]);
 
    const handleSelectDependenciaChange = ( selectedOption ) => {    
        startLoadingOficinas(selectedOption.value);
        handleSelectChange(selectedOption, "dependencia");
        setDependenciaSelected(selectedOption);
    }

    const handleSelectSubDependenciaChange = ( selectedOption ) => {           
        handleSelectChange(selectedOption, "oficina"); 
        setOficinaSelected(selectedOption);
    }

    const handleSelectVigenciaChange = ( selectedOption ) => {   
        handleSelectChange(selectedOption, "vigencia");
    }
    
    //useForm
    const documentoForm = {
        dependencia: {},
        oficina: {},
        vigencia: {}
    };

    const [formValues, handleInputChange, handleSelectChange] = useForm(documentoForm);

    const {
        dependencia,
        oficina,
        vigencia
    } = formValues;

    const handleBtnBuscarCarpetas = async () => {
        
        if(!formValues.vigencia.value){
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
        const criteria = {
            "proyectoId": proyectoId,
            "dependenciaId": formValues.dependencia.value,
            "oficinaId": formValues.oficina.value,
            "vigenciaId": formValues.vigencia.value,
        };

        await buscarEstadoAsignacionArchivos(criteria);
    }

    return (
        <>
            <div className='col-md-12 pt-3'>
                <div className=" row">
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
                    <div className="col-md-2">
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
                    <div className="col-md-2">
                        <div className="form-group">
                        <label className='form-label'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
                        <button onClick={handleBtnBuscarCarpetas} disabled={isLoadingBuscarEstadoAsignacionImagenes} 
                                className="btn btn-block btn-outline-primary btn-dim">
                                <LoadingInButton isLoading={isLoadingBuscarEstadoAsignacionImagenes} btnText="Buscar" /> 
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
