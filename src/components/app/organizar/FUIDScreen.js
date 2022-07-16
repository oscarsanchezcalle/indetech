import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Titulo } from '../Titulo';
import { useCajaStore } from '../../../hooks';
import { Filtros } from './Filtros';
import { RotuloCaja } from './RotuloCaja';


export const FUIDScreen = () => {
  
   // const dispatch = useDispatch();
    const { startLoadingCajas } = useCajaStore();
    const { cajas } = useCajaStore();

    //cargo la primera vez
    useEffect(() => {
        //startLoadingCajas();
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

    </>
  )
}
