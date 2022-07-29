import React from 'react'

export const NumeroCaja = ({numeroCaja}) => {
  
  if(numeroCaja === undefined){
    return(
        <>
        </>
    )
  } 

  return (
    <>
        <h6 className="title pt-1">
                Caja No. &nbsp;
        </h6>
        <div className="user-avatar sm bg-blue">
            <span>{numeroCaja}</span>
        </div>
    </>
  )
}
