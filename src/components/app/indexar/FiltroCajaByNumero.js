import React from 'react'
import Swal from 'sweetalert2';
import { useAuthStore, useCarpetaStore, useFormBasic } from '../../../hooks';
import { LoadingInButton } from '../LoadingInButton';

export const FiltroCajaByNumero = ({titulo}) => {

  const { proyecto, proyectoId } = useAuthStore();
  const { isLoadingAddCarpeta, getCarpetasByNumeroCaja } = useCarpetaStore();

   //useForm
   const documentoForm = { numeroCaja: '' };
   const [formValues, handleInputChange] = useFormBasic(documentoForm);
   const { numeroCaja } = formValues;
 
   const handleBtnBuscarCajas = async () => {
     if(numeroCaja === ""){
        Swal.fire({
            icon: 'warning',
            title: 'Campos incompletos',
            text: `Diligencia el número de la caja`,
            showConfirmButton: true,
        });
        return;
     }

     await getCarpetasByNumeroCaja(numeroCaja, proyectoId);
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
                                Numero de la caja
                            </label>
                            <input 
                                value={numeroCaja}
                                name="numeroCaja"
                                onChange={handleInputChange}
                                type="text" 
                                className="form-control" 
                                placeholder=''
                                autoComplete="off"/>
                        </div>
                    </div>
                    <div className='col-md-2'>
                        <br />
                        <button 
                            onClick={() => handleBtnBuscarCajas()}
                            type="button"
                            disabled={isLoadingAddCarpeta}
                            className="btn btn-outline-primary btn-dim  mt-1 btn-block">
                                <LoadingInButton isLoading={isLoadingAddCarpeta} btnText="Buscar" />
                        </button>
                    </div>
                    
                    
                </div>
                
            </div>
        </div>
    </div>
</>
  )

}
