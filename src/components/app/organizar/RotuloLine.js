import React from 'react'

export const RotuloLine = ({name, value}) => {
  return (
    <div className='row'>
        <label className='col-sm-4 form-label'>{name}</label>
        <div className='col-sm-8'>
            <input className='form-control form-control-sm' value={value} disabled/>
        </div>
    </div>
  )
}
