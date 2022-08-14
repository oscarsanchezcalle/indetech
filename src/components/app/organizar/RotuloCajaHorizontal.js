import React from 'react'
import { RotuloCarpetaItem } from './RotuloCarpetaItem';
import 
{ 
   useCajaStore
} from '../../../hooks';

export const RotuloCajaHorizontal = () => {

  const { rotuloCaja } = useCajaStore();

  return (
    <>
    <div className="code-block">
        <h6 className="overline-title title">Rótulo de caja</h6>
        
            <div className='row'>
                <RotuloCarpetaItem nombre="Serie" valor = {rotuloCaja.series} col="col-md-2"/>
                <RotuloCarpetaItem nombre="Subserie" valor = {rotuloCaja.subseries} col="col-md-3"/>
                <RotuloCarpetaItem nombre="Expediente"  valor = {rotuloCaja.expedientes} col="col-md-3"/>
                <RotuloCarpetaItem nombre="# Expediente" valor = {rotuloCaja.numeroExpedientes} col="col-md-2"/>
                <RotuloCarpetaItem nombre="Fechas" valor = {rotuloCaja.fechasExtremas} col="col-md-2"/>
            </div>
        
    </div>
    </>
  )
}
