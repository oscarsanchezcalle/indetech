import React, { useEffect, useState } from 'react'
import { useCarpetaStore } from '../../../hooks';
import VerPdfCompleto from '../pdf/VerPdfCompleto';

export const IndexarDocumento = () => {
  
  const [height, setheight] = useState("500px")

  useEffect(() => {
    
    setheight((window.innerHeight * 0.75) + 'px');
  }, [])
  
  const { 
    carpetaActiva
  } = useCarpetaStore();

  return (
    <>
      <div className='row'>
        <div className='col-md-8 pb-0' >
          <div className="nk-block">
            <div className="card card-bordered">
              <div className="card-aside-wrap">
                <div className="card-content">
                  <ul className="nav nav-tabs nav-tabs-mb-icon nav-tabs-card">
                    <h6 className="modal-title">
                      Serie: <small>{carpetaActiva?.serie?.descripcion}</small> - 
                      Subserie: <small>{carpetaActiva?.subserie?.descripcion}</small>
                      <br/>
                      Expediente: <small>{carpetaActiva?.codigo}</small> -
                      Cédula Catastral: <small>{carpetaActiva?.cedulaCatastral}</small>
                   
                    </h6>
                  </ul>
                  
                  <ul className="p-0 nav-tabs-card" style={{height: height}}>
                    <VerPdfCompleto pdf={"https://dl.dropboxusercontent.com/s/0wtf8q2jwbwteud/2014-0001.PDF"}/>   
                  </ul>
                </div>
               </div>
              </div>
            </div>
        </div>
        <div className='col-md-4'>
          <div className="nk-block nk-block-lg">
                <div className="nk-block-head">
                  <div className="nk-block-head-content">
                    <h4 className="title nk-block-title">Basic Form Style - S2</h4>
                    <div className="nk-block-des">
                      <p>You can alow display form in column as example below.</p>
                    </div>
                  </div>
                </div>
                <div className="card card-bordered">
                  <div className="card-inner">
                    <div className="card-head">
                      <h5 className="card-title">Customer Info S2</h5>
                    </div>
                    <form action="#">
                      <div className="row g-4">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-label" htmlFor="full-name-1">
                              Full Name
                            </label>
                            <div className="form-control-wrap">
                              <input type="text" className="form-control" id="full-name-1" />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-label" htmlFor="email-address-1">
                              Email address
                            </label>
                            <div className="form-control-wrap">
                              <input
                                type="text"
                                className="form-control"
                                id="email-address-1"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-label" htmlFor="phone-no-1">
                              Phone No
                            </label>
                            <div className="form-control-wrap">
                              <input type="text" className="form-control" id="phone-no-1" />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-label" htmlFor="pay-amount-1">
                              Amount
                            </label>
                            <div className="form-control-wrap">
                              <input type="text" className="form-control" id="pay-amount-1" />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-label">Communication</label>
                            <ul className="custom-control-group g-3 align-center">
                              <li>
                                <div className="custom-control custom-control-sm custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="com-email-1"
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="com-email-1"
                                  >
                                    Email
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="custom-control custom-control-sm custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="com-sms-1"
                                  />
                                  <label className="custom-control-label" htmlFor="com-sms-1">
                                    SMS
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="custom-control custom-control-sm custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="com-phone-1"
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="com-phone-1"
                                  >
                                    Phone
                                  </label>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-label">Payment Methods</label>
                            <ul className="custom-control-group g-3 align-center">
                              <li>
                                <div className="custom-control custom-control-sm custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="pay-card-1"
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="pay-card-1"
                                  >
                                    Card
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="custom-control custom-control-sm custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="pay-bitcoin-1"
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="pay-bitcoin-1"
                                  >
                                    Bitcoin
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="custom-control custom-control-sm custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="pay-cash-1"
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="pay-cash-1"
                                  >
                                    Cash
                                  </label>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group">
                            <button type="submit" className="btn btn-lg btn-primary">
                              Save Informations
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12'>

        </div>
      </div>
    </>
  )
}
