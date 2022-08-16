import React, { useEffect } from 'react'
import { useCarpetaStore } from '../../../hooks';
import { FiltrosCaja } from './FiltrosCaja'
import { TablaCarpetasImagenes } from './TablaCarpetasImagenes'

export const AsociarImagenCarpeta = () => {
  
    const { setCarpetasByCajaId } = useCarpetaStore();

    useEffect(() => {
        setCarpetasByCajaId();
    }, []);

    return (
    <>
    <div className='row'>
        <div className='col-md-12'>
            <FiltrosCaja />
        </div>
    </div>
    <div className='row pt-3'>
        <div className='col-md-12'>
             <TablaCarpetasImagenes />
        </div>  
    </div>
    </>

  )
}
