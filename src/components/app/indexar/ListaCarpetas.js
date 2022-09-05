import React, { useEffect } from 'react'
import { useAuthStore, useCarpetaStore } from '../../../hooks';
import { FiltrosCaja } from './../digitalizar/FiltrosCaja'
import { FiltroCajaByNumero } from './FiltroCajaByNumero';
import { TablaCarpetasAIndexar } from './TablaCarpetasAIndexar';
import { TablaCarpetasAIndexarGobernacion } from './TablaCarpetasAIndexarGobernacion';

export const ListaCarpetas = () => {
  
   const { setCarpetasByCajaId } = useCarpetaStore();
   const { proyectoId } = useAuthStore();

   useEffect(() => {
        setCarpetasByCajaId();
   }, []);
    
  return (
    <>
            <div className='row'>
                <div className='col-md-12'>
                    {proyectoId == 1 && <FiltrosCaja titulo="Indexar documentos"/>}
                    {proyectoId == 2 && <FiltroCajaByNumero titulo="Indexar documentos"/>}
                </div>
            </div>
            <div className='row pt-3'>
                <div className='col-md-12'>
                    {proyectoId == 1 && <TablaCarpetasAIndexar/>}
                    {proyectoId == 2 && <TablaCarpetasAIndexarGobernacion/>}
                </div>  
            </div>
        </>
  )
}
