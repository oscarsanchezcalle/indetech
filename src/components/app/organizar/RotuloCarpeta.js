import React from 'react'
import { useCarpetaStore } from '../../../hooks';
import { RotuloCarpetaItem } from './RotuloCarpetaItem';

export const RotuloCarpeta = () => {

  const { carpetaActiva } = useCarpetaStore();

  return (
    <>
     <div className="code-block">
        <h6 className="overline-title title">Rótulo de carpeta</h6>
        
            <div className='row'>
                <RotuloCarpetaItem nombre="# Carpeta" valor={carpetaActiva?.numero} col="col-md-2"/>
                <RotuloCarpetaItem nombre="Serie" valor={carpetaActiva?.serie?.descripcion} col="col-md-3"/>
                <RotuloCarpetaItem nombre="Subserie" valor={carpetaActiva?.subserie?.descripcion} col="col-md-3"/>
                <RotuloCarpetaItem nombre="# Expediente" valor={carpetaActiva?.codigo} col="col-md-2"/>
                <RotuloCarpetaItem nombre="Cédula Catastral" valor={carpetaActiva?.cedulaCatastral} col="col-md-2"/>
            </div>
        
    </div>
    </>
  )
}
