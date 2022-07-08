
import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import Select from 'react-select'
import { useForm } from "../../../../hooks/useForm";
import { Titulo } from "../../Titulo";
//import { pdfjs } from 'react-pdf';
//pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
//pdfjs.GlobalWorkerOptions.workerSrc = '/pdf/pdf.worker.js';

export default function SinglePage(props) {

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page
    const [documentosIndexados, setDocumentosIndexados] = useState([]); 
    
    //useForm
    const documentoForm = {};
    const [formValues, handleInputChange, handleSelectChange, reset] = useForm(documentoForm);
    const {fecha, nombre, observaciones, folioInicial, folioFinal} = formValues;

    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
      setPageNumber(1);
    }

    function changePage(offset) {
      setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
      changePage(-1);
    }

    function nextPage() {
      changePage(1);
    }
    
    const handleIndexar = () => {
      
      setDocumentosIndexados(currentArray => [...currentArray, formValues]);

      console.log(documentosIndexados);
    }
   
    const { pdf } = props;
  
    const optionsSerie = [
      { value: '1', label: 'Serie 1' },
      { value: '2', label: 'Serie 2' },
      { value: '3', label: 'serie 3' }
    ]

    const optionsSubSerie = [
      { value: '1', label: 'Subserie 1' },
      { value: '2', label: 'Subserie 2' },
      { value: '3', label: 'Subserie 3' }
    ]

    const optionsOficinaProductora = [
      { value: '1', label: 'Oficina productora 1' },
      { value: '2', label: 'Oficina productora 2' },
      { value: '3', label: 'Oficina productora 3' }
    ]

    const optionsObjetos = [
      { value: '1', label: 'Objeto 1' },
      { value: '2', label: 'Objeto 2' },
      { value: '3', label: 'Objeto 3' }
    ]

    const optionsExpediente = [
      { value: '1', label: 'Expediente 1' },
      { value: '2', label: 'Expediente 2' },
      { value: '3', label: 'Expediente 3' }
    ]
    
  return (
   
    <>
    
    <div className="nk-chat">
        
        <div className="nk-chat-body profile-shown">
          <div className="nk-chat-head">
            <ul className="nk-chat-head-info">              
              <li className="nk-chat-head-user">
                <div className="user-card">
                  <div className="user-avatar">
                    <em class="icon ni ni-file-docs"></em>                   
                  </div>
                  <div className="user-info">
                    <div className="lead-text">Documento en progreso</div>
                    <div className="sub-text">
                        <span className="d-none d-sm-inline me-1">Pág {pageNumber || (numPages ? 1 : "--")} de {numPages || "--"} </span></div>
                  </div>
                </div>
              </li>
            </ul>
            <ul className="nk-chat-head-tools">
              <li>
                <button 
                  disabled={pageNumber <= 1} onClick={previousPage} 
                  className="btn btn-round btn-icon btn-sm btn-primary">
                  <em class="icon ni ni-chevron-left"></em>
                </button>
              </li>
              <li>
                <button 
                  disabled={pageNumber >= numPages} onClick={nextPage}
                  className="btn btn-round btn-icon btn-sm btn-primary">
                  <em class="icon ni ni-chevron-right"></em>
                </button>
              </li>
            </ul>          
          </div>{/* .nk-chat-head */}

          <div className="nk-chat-panel" data-simplebar>
              <Document
                file={pdf}  
                options={{ workerSrc: "/pdf.worker.js" }}     
                onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
              </Document>
          </div>{/* .nk-chat-panel */}

          <div className="nk-chat-profile visible" data-simplebar>
            <div className="card-inner">
              <div className="card-title-group align-start mb-2">
                <div className="card-title">
                  <h6 className="title">Creación de documento</h6>
                  <p>Métadatos del documento</p>
                </div>
              </div>{/* .card-title-group */}
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="default-01">Folio Inicial</label>
                    <div className="form-control-wrap">
                    <input 
                      type="number"
                      min="0"
                      max={numPages}
                      className="form-control"
                      name="folioInicial"
                      value={folioInicial}
                      onChange={handleInputChange}/>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="default-01">Folio Final</label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                          className="form-control"
                          name="folioFinal"
                          min="0"
                          max={numPages}
                          value={folioFinal}
                          onChange={handleInputChange}
                        />
                    </div>
                  </div>
                </div>
              </div> 
              <br />
              <div className="row">
                <div className="col-sm-12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="default-01">Oficina Productora</label>
                      <div className="form-control-wrap">
                        <Select                         
                          options={optionsOficinaProductora} 
                          //value={oficinaProductora}                        
                          onChange={(e) => handleSelectChange(e,"oficinaProductora")}
                        />
                      </div>
                    </div>
                  </div>
              </div>
              <br />
              <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                      <label className="form-label" htmlFor="default-01">Serie</label>
                      <div className="form-control-wrap">
                        <Select 
                          options={optionsSerie}
                          //value={serie}
                          onChange={(name) => handleSelectChange(name,"serie")}
                           />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="form-label" htmlFor="default-01">Subserie</label>
                      <div className="form-control-wrap">
                        <Select 
                          options={optionsSubSerie} 
                          //value={subserie}
                          onChange={(name) => handleSelectChange(name,"subserie")}
                          />
                      </div>
                    </div>
                  </div>
              </div> 
              <br />
              <div className="row">
                <div className="col-sm-12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="default-01">Nombre del expediente</label>
                      <div className="form-control-wrap">
                        <Select 
                          options={optionsExpediente}                         
                          onChange={(name) => handleSelectChange(name,"expediente")}
                          />
                      </div>
                    </div>
                  </div>
              </div>
              <br />
              <div className="row">
                <div className="col-sm-12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="default-01">Objeto</label>
                      <div className="form-control-wrap">
                        <Select 
                          options={optionsObjetos}                          
                          onChange={(name) => handleSelectChange(name,"objeto")}
                          />
                      </div>
                    </div>
                  </div>
              </div>
              <br />
              <div className="row">
                <div className="col-sm-12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="default-01">Fecha del documento</label>
                      <div className="form-control-wrap">
                        <input  
                          type="date" 
                          className="form-control"
                          name="fecha"
                          value={fecha}
                          onChange={handleInputChange}
                          />
                      </div>
                    </div>
                  </div>
              </div>  
              <br />
              <div className="row">
                <div className="col-sm-12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="default-01">Nombre</label>
                      <div className="form-control-wrap">
                        <input  
                          type="text" 
                          className="form-control"
                          name="nombre"
                          value={nombre}
                          onChange={handleInputChange}
                          autocomplete="off"
                          />
                      </div>
                    </div>
                  </div>
              </div>   
              <br />
              <div className="row">
                <div className="col-sm-12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="default-01">Observaciones</label>
                      <div className="form-control-wrap">
                      <textarea 
                        class="form-control no-resize"
                        name="observaciones"
                        value={observaciones}
                        onChange={handleInputChange}></textarea>
                      </div>
                    </div>
                  </div>
              </div>  
              <br/>
              <button type="button"  onClick={handleIndexar} className="btn btn-outline-primary btn-lg btn-block">Indexar</button>
                      
            </div>            
          </div>{/* .nk-chat-profile */}
        </div>{/* .nk-chat-body */}
      </div>{/* .nk-chat */}

      {/* aqui  */}
      <br/>
      <div className="nk-block">
              <div className="card card-bordered card-stretch">
                <div className="card-inner-group">
                    
                    <div className="card-inner">
                        <div className="card-title-group">
                            <div className="card-title">
                            <h5 className="title">
                                <Titulo
                                    titulo="Documentos generados" 
                                    subtitulo="Lista de documentos indexados"/>
                            </h5>
                            </div>
                            <div className="card-tools me-n1">
                                <ul className="btn-toolbar">                           
                                    {/* todo: dropdown aqui */}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="card-inner p-0">
                        <table className="table table-sm table-hover">
                            <thead className="tb-odr-head">
                                <tr>
                                    <th className='col-md-2'>
                                        <span>Folio Inicial</span>
                                    </th>
                                    <th className='col-md-3'>
                                        <span>Folio Final</span>
                                    </th>
                                    <th className="col-md-2">
                                        <span>Oficina Productora</span>
                                    </th>
                                    <th className="col-md-2">
                                        <span>Serie</span>
                                    </th>
                                    <th className="col-md-2">
                                        <span>SubSerie</span>
                                    </th>
                                    <th className="col-md-1">
                                        &nbsp;
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {documentosIndexados.map( tarea => (
                                    <tr key={tarea.folioInicial }>
                                        <td>
                                               {tarea.folioInicial}                                            
                                        </td>
                                        <td>
                                               {tarea.folioFinal}                                            
                                        </td>
                                        <td>
                                               {tarea.oficinaProductora}                                            
                                        </td>
                                        <td>
                                               {tarea.serie}                                            
                                        </td>
                                        <td>
                                               {tarea.subserie}                                            
                                        </td>                                       
                                        <td className="tb-odr-action">
                                        <button 
                                            className='btn btn-dim btn-xs btn-primary'>
                                            <em class="icon ni ni-file-docs"></em>&nbsp;Ver
                                        </button>
                                        </td>                                       
                                     </tr>         
                                ))}
                                            
                            </tbody>
                        </table>
                    </div>{/* .card-inner */}
                </div>{/* .card-inner-group */}
              </div>{/* .card */}
            </div>{/* .nk-block */}


    </>
  );
}