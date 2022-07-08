import React from 'react'

import { Titulo } from '../Titulo'
import { useLocation } from 'react-router-dom'

import SinglePagePdfViewer from './Pdf/SinglePage.js';

export const IndexarDocumento = () => {

  let location = useLocation();

  //console.log(location);

  return (
    <>
      <Titulo titulo="Indexar documento"  subtitulo="Divide el PDF en documentos para crear un folder "/>      
      
      <SinglePagePdfViewer pdf={location.documento.urlPdf} />
    </>
  )
}
