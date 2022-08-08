import React from 'react'

export const RotuloCarpetaItem = ({nombre, valor, col}) => {
  return (
    <div className={col}>
        <div className="form-group">
            <label className="form-label" htmlFor="site-name">
                {nombre}
            </label>
            <span className="form-note">{valor}</span>
        </div>
    </div>
  )
}
