import React from 'react'

export const NumeroCarpeta = ({numero}) => {
  
  if(numero === undefined){
    return(
        <>
        </>
    )
  } 

  return (
    <>
        <h6 className="title pt-1">
                Carpeta No. &nbsp;
        </h6>
        <div className="user-avatar sm bg-blue">
            <span>{numero}</span>
        </div>
    </>
  )
}
