import React, { useState } from 'react'
import { CajaCard } from './CajaCard';

export const CargueMasivo = () => {

  // toDo pasa para el estado global
  const [cardCajas, setCardCajas] = useState([1,2]); 

  const handleNewCaja = () => {
    const i = cardCajas[cardCajas.length-1] + 1;
    setCardCajas([...cardCajas, i]);
  }


  return (
    <>
    <div className="nk-block-head nk-block-head-sm">
      <div className="nk-block-between">
        <div className="nk-block-head-content">
          <h3 className="nk-block-title page-title">Cargue Masivo</h3>
          <div className="nk-block-des text-soft">
            <p>Subir masivamente las carpetas que contienen la(s) caja(s)</p>
          </div>
        </div>
        <div className="nk-block-head-content">
          <div className="toggle-wrap nk-block-tools-toggle">
            <a
              href="#"
              className="btn btn-icon btn-trigger toggle-expand me-n1"
              data-target="pageMenu"
            >
              <em className="icon ni ni-menu-alt-r" />
            </a>
            <div className="toggle-expand-content" data-content="pageMenu">
              <ul className="nk-block-tools g-3">
                <li className="nk-block-tools-opt d-none d-sm-block">
                  <button onClick={handleNewCaja} className="btn btn-primary">
                    <em className="icon ni ni-plus" />
                    <span>Agregar Caja</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className='row'>
      {
        cardCajas.map(cajaIndex => (
          <CajaCard key={cajaIndex} cardNumber={cajaIndex}/>
        ))
      }
    </div>
     {/* <input 
          id="fileSelector"
          type="file" 
          name="file"
          multiple
          onChange={handleFileChange}/> */}
    </>
  )
}
