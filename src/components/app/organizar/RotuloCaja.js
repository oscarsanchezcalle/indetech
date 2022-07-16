import React from 'react'
import { RotuloLine } from './RotuloLine'

export const RotuloCaja = () => {
  return (
    <>
    <div className="code-block">
        <h6 className="overline-title title">Rótulo de caja</h6>
        <RotuloLine name="Serie" value={'7.2 EQUIPO DE TRABAJO GESTION FJKHSDFKJHSDLFJKSHDLFKJSDHLFKJHSDLKFJHSDLKJFHSDLKJFHLSKDJHFLKJSDHF'} />
        <RotuloLine name="Subserie" value={'7.2.1 SUBSERIE'} />
        <RotuloLine name="Expediente" value={'EXPEDIENTE EJEMPLO'}/>
        <RotuloLine name="# Expediente" value={'2013-c-0001'} />
        <RotuloLine name="Fechas" value={'20/12/2012 - 03/02/2014'} />
      </div>
    </>
  )
}
