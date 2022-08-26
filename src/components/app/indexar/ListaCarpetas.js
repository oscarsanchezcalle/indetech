import React, { useEffect } from 'react'
import { useCarpetaStore } from '../../../hooks';
import { FiltrosCaja } from './../digitalizar/FiltrosCaja'
import { TablaCarpetasAIndexar } from './TablaCarpetasAIndexar';

export const ListaCarpetas = () => {
  
   const { setCarpetasByCajaId } = useCarpetaStore();

   useEffect(() => {
        setCarpetasByCajaId();
   }, []);
    
  return (
    <>
            <div className='row'>
                <div className='col-md-12'>
                    <FiltrosCaja titulo="Indexar documentos"/>
                </div>
            </div>
            <div className='row pt-3'>
                <div className='col-md-12'>
                    <TablaCarpetasAIndexar/>
                </div>  
            </div>
        </>
  )
}
