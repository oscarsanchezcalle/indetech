import React from "react";

import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export default function VerPdfCompleto(props) {

  const { pdf } = props;
  
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  
  return (
    <div
        style={{
            border: '0px solid rgba(0, 0, 0, 0.3)',
            height: '100%',
        }}
      >
      <Worker workerUrl="/pdf.worker.2.15.349.js">
        <Viewer fileUrl={pdf} plugins={[defaultLayoutPluginInstance]}/>
      </Worker>
    </div>
  );
}