import React from 'react'
import { useAuthStore, useCarpetaStore } from '../../../hooks';
import { LoadingInButton } from '../LoadingInButton';
import { TablaCarpetasConPDFAsociado } from './TablaCarpetasConPDFAsociado';

export const AsociarImagenes = () => {
  
  const { proyecto, proyectoId } = useAuthStore();

  const { putAsociarPdfACarpetas, carpetasConPdf, isLoadingAsignarPdf } = useCarpetaStore();

  const handleAsignarPdfaCarpetas = () => {
    putAsociarPdfACarpetas(proyectoId);
  }

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
                            <button onClick={handleAsignarPdfaCarpetas}  disabled={isLoadingAsignarPdf} className="btn btn-outline-primary btn-dim">
                                <LoadingInButton isLoading={isLoadingAsignarPdf} btnText="Asignar Masivamente" />
                            </button>
                        </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
        <div className='row pt-3'>
          <div className='col-md-12'>
              <div id="accordion" className="accordion">
                  <div className="accordion-item">
                      <a href="#" className="accordion-head" data-bs-toggle="collapse" data-bs-target="#accordion-item-1" aria-expanded="false">
                          <h6 className="title">Carpetas con imagen asignada</h6>
                          <span className="accordion-icon" />
                      </a>
                      <div className="accordion-body collapse show" id="accordion-item-1" data-bs-parent="#accordion" style={{}}>
                          <div className="accordion-inner">
                            <TablaCarpetasConPDFAsociado/>
                          </div>
                      </div>
                  </div>
              </div>
           </div>
        </div>
        <div className='row pt-3'>
          <div className='col-md-12'>
              <div id="accordion2" className="accordion">
                  <div className="accordion-item">
                      <a href="#" className="accordion-head" data-bs-toggle="collapse" data-bs-target="#accordion-item-2" aria-expanded="false">
                          <h6 className="title">Carpetas sin imagen asignada</h6>
                          <span className="accordion-icon" />
                      </a>
                      <div className="accordion-body collapse show" id="accordion-item-2" data-bs-parent="#accordion2" style={{}}>
                          <div className="accordion-inner">

                          </div>
                      </div>
                  </div>
              </div>
           </div>
        </div>
        <div className='row pt-3'>
          <div className='col-md-12'>
              <div id="accordion3" className="accordion">
                  <div className="accordion-item">
                      <a href="#" className="accordion-head" data-bs-toggle="collapse" data-bs-target="#accordion-item-3" aria-expanded="false">
                          <h6 className="title">Archivos PDF sin asignar</h6>
                          <span className="accordion-icon" />
                      </a>
                      <div className="accordion-body collapse show" id="accordion-item-3" data-bs-parent="#accordion2" style={{}}>
                          <div className="accordion-inner">

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
