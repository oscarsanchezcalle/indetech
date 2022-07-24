import React from 'react'
import { RotuloLine } from './RotuloLine'
import 
{ 
   useCajaStore
} from '../../../hooks';

export const RotuloCaja = () => {

  const { rotuloCaja } = useCajaStore();

  return (
    <>
    <div className="code-block">
        <h6 className="overline-title title">Rótulo de caja</h6>
        <RotuloLine name="Serie" value={rotuloCaja.series} />
        <RotuloLine name="Subserie" value={rotuloCaja.subseries} />
        <RotuloLine name="Expediente" value={rotuloCaja.expedientes}/>
        <RotuloLine name="# Expediente" value={rotuloCaja.numeroExpedientes} />
        <RotuloLine name="Fechas" value={rotuloCaja.fechasExtremas} />
      </div>
    </>
  )
}
