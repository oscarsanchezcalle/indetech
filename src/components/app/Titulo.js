import React from 'react'

export const Titulo = ({titulo, subtitulo}) => {
  return (
    <div className="nk-block-head">
        <div className="nk-block-head-content">
            <h4 className="title nk-block-title">{titulo}</h4>
            <div className="nk-block-des">
                <p>{subtitulo}</p>
            </div>
        </div>
        </div>
  )
}
