import React from 'react'
import { useAuthStore } from '../../../hooks';

export const AsociarImagenes = () => {
  
  const { proyecto } = useAuthStore();

  return (
    <>
      <div className='col-md-12'>
        <h6 className="title pb-2"><em className="icon ni ni-file-text-fill"></em> Asignación masiva de PDFs a Carpetas</h6>
        <div className="card card-bordered h-100">
            <div className="card-inner">
                <div className="row">
                  <div className="form-control-wrap">
                    <div className="input-group">
                        <input disabled={true} type="text" value={proyecto} className="form-control"/>
                        <div className="input-group-append">
                            <button className="btn btn-outline-primary btn-dim">Asignar Masivamente</button>
                        </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}
