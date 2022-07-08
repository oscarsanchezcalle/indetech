import React from 'react'

export const Estado = ({estado}) => {
   
  return (

    <>
        {(() => {
            switch(estado) {
                case 1:
                    return <span className="badge badge-dot bg-warning">Pendiente</span>
                case 2:
                    return <span className="badge badge-dot bg-success">En Proceso</span>
                default:
                    return null
            }
            })()}
    </>    
  )
}
