import React, { useEffect } from 'react'
import Select from 'react-select'

import 
{ 
    useAuthStore, useDependieciaStore, useOficinaStore, 
    useSerieStore, useForm, useFormStore
} from '../../../hooks';


export const Filtros = () => {
   
    const { proyectoId, proyecto, objetoContrato } = useAuthStore();
    const { startLoadingDependencias, dependencias } = useDependieciaStore();
    const { startLoadingOficinas, oficinas } = useOficinaStore();
    const { startLoadingSeries } = useSerieStore();
    const { setFuidFormValues, resetFuidFormValues, fuidForm } = useFormStore();
    
    //useForm
    const documentoForm = {};
    const [formValues, handleInputChange, handleSelectChange, reset] = useForm(documentoForm);
    
    //cargo la primera vez
    useEffect(() => {
         startLoadingDependencias(proyectoId);
    }, [])

    const handleSelectDependenciaChange = ( selectedOption, name ) => {           
        startLoadingOficinas(selectedOption.value);
        handleSelectChange(selectedOption, name);
        
        // actualizo el storage
        setFuidFormValues({
            ...fuidForm,
            [ name ]: selectedOption.value
        });
    }

    const handleSelectSubDependenciaChange = ( selectedOption, name ) => {           
        startLoadingSeries(selectedOption.value);
        handleSelectChange(selectedOption, name);        

         // actualizo el storage
         setFuidFormValues({
            ...fuidForm,
            [ name ]: selectedOption.value
        });
    }

    const handleInputCajaChange = ( {target} ) => {           
        
        handleInputChange({target});        

         // actualizo el storage
         setFuidFormValues({
            ...fuidForm,
            [ target.name ]: target.value
        });
    }


    const handleBtnBuscarCaja = () => {
        // console.log(formValues);
        // console.log(proyectoId);
        //resetFuidFormValues();
    }

  return (
    <> 
        <h6 className="title pb-2">Formato Único de Inventario Documental</h6>
        <div className="row">
            <label className="col-sm-3 col-form-label form-label">Entidad</label>
            <div className="col-sm-9">
                <input type="text" className="form-control" disabled={true} value={ proyecto }/>
            </div>
        </div>
        <div className=" row">
            <label className="col-sm-3 col-form-label form-label">Dependecia</label>
            <div className="col-sm-9">
            <Select
                    options={dependencias}         
                    placeholder='Selecciona la dependencia'
                    onChange={(selectedOption) => handleSelectDependenciaChange(selectedOption, "dependecia")}
                    />
            </div>
        </div>
        <div className=" row">
            <label className="col-sm-3 col-form-label form-label">Sub Dependecia</label>
            <div className="col-sm-9">
            <Select
                    options={oficinas}   
                    placeholder='Selecciona la sub dependencia'
                    onChange={(selecteOption) => handleSelectSubDependenciaChange(selecteOption,"subDependencia")}
                    />
            </div>
        </div>
        <div className="row">
            <label className="col-sm-3 col-form-label form-label">Objeto</label>
            <div className="col-sm-9">
                <input type="text" className="form-control" disabled={true} value={objetoContrato}/>
            </div>
        </div>
        <div className=" row">
            <label className="col-sm-3 col-form-label form-label">Caja</label>
            <div className="col-sm-9">
                <div className="form-control-wrap">
                    <div className="input-group">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder='Número de la caja'  
                            name="numeroCaja"                            
                            onChange={handleInputCajaChange}/>
                        <div className="input-group-append">
                            <button onClick={handleBtnBuscarCaja} className="btn btn-outline-primary btn-dim">Buscar Caja</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
