import React from 'react'

export const ArchivoProgreso = ({nombre, porcentaje}) => {
  return (
    <>
        <div className="progress-list gy-3">
            <div className="progress-wrap">
                <div className="progress-text">
                    <div className="progress-label">{ nombre }</div>
                        <div className="progress-amount">{porcentaje}%</div>
                </div>
                <div className="progress progress-md">
                    <div
                        className="progress-bar"
                        data-progress={porcentaje}
                        style={{ width: porcentaje+"%" }}
                    />
                </div>
            </div>
        </div>
    </>
  )
}
