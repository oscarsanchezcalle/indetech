import React, { useEffect } from 'react'

import { Filtros } from './Filtros';
import { RotuloCaja } from './RotuloCaja';
import { AddForm } from './AddForm';
import { TablaCarpetas } from './TablaCarpetas';
import { 
        useOficinaStore, useSerieStore, useAuthStore, 
        useDependieciaStore, useSubserieStore, useTipoDocumentoStore, useFormStore 
       } from '../../../hooks';


export const FUIDScreen = () => {
    
   const { resetOficina } = useOficinaStore();
   const { resetSerie } = useSerieStore();
   const { resetSubserie } = useSubserieStore();
   const { resetTipoDocumento } = useTipoDocumentoStore();
   const { resetFuidFormValues } = useFormStore();

   const { proyectoId } = useAuthStore();
   const { startLoadingDependencias } = useDependieciaStore();
   
   //Al refrescar mantener el estado.

   //cargo la primera vez
   useEffect(() => {
        resetFuidFormValues();
        console.log('resetear Fuid form store');
        startLoadingDependencias(1);
   }, [])

   const resetForm = () => {
    resetOficina();
    resetSerie();
    resetSubserie();
    resetTipoDocumento();
   }
    
  return (
    <>
    <div className='row'>
        <div className='col-md-7'>
            <Filtros />
        </div>
        <div className='col-md-5'>
            <RotuloCaja />
        </div>
    </div>
    <div className='row pt-3'>
        <div className='col-md-12'>
            <AddForm />
        </div>
    </div>
    <div className='row pt-3'>
        <div className='col-md-12'>
            <TablaCarpetas />
        </div>
    </div>
    </>
  )
}
