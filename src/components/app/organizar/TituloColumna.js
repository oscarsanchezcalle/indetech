import React from 'react'

export const TituloColumna = ({estado}) => {
   
  return (

    <>
        {(() => {
            switch(estado) {
                case 1:
                    return <span> Cédula Catastral</span>
                case 2:
                    return <span> Apellidos y Nombres</span>
                default:
                    return null
            }
            })()}
    </>    
  )
}
