import React, { useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { useCajaStore } from '../../../hooks';

import { Filtros } from './Filtros';
import { RotuloCaja } from './RotuloCaja';
import { AddForm } from './AddForm';
import { TablaCarpetas } from './TablaCarpetas';

export const FUIDScreen = () => {
  
    // const dispatch = useDispatch();
    const { startLoadingCajas } = useCajaStore();
    const { cajas } = useCajaStore();

    //cargo la primera vez
    useEffect(() => {
        //startLoadingCajas();
        document.body.style.zoom = "90%";
    }, [])
    
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
