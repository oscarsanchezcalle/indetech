import React, { useEffect, useState } from 'react'
import { ArchivoProgreso } from './ArchivoProgreso';

const {
    AnonymousCredential,
    ShareServiceClient,
    newPipeline,
  } = require("@azure/storage-file-share");
  
/*
  [
    {
        nombre: dsfjksdhfkjsdf.pdf
        porcentaje: 40
    }
  ]
*/
export const CajaCard = (cardNumber) => {

    const indexCaja = cardNumber;
    
    const [archivos, setArchivos] = useState([]);

    // Fill in following settings before running this sample
    const account = process.env.ACCOUNT_NAME || "indetechstorage";
    const accountSas = process.env.ACCOUNT_SAS || "?sv=2021-06-08&ss=f&srt=sco&sp=rwdlc&se=2023-07-09T13:03:55Z&st=2022-07-09T05:03:55Z&spr=https&sig=QncaMFN7BQ44GIJkIyQAhHuMp98oPQUv9ZtkKUc3n8U%3D";

    const shareName = "proyectoa";
    const directoryName = "cargue";
    
    const  uploadFile = async (browserFile, index) => {
        const fileName = browserFile.name;
        const pipeline = newPipeline(new AnonymousCredential(), {
            // httpClient: MyHTTPClient, // A customized HTTP client implementing IHttpClient interface
            retryOptions: { maxTries: 4 },
            userAgentOptions: { userAgentPrefix: "AdvancedSample V1.0.0" },
            keepAliveOptions: {
            // Keep alive is enabled by default, disable keep alive by setting false
            enable: false,
            },
        });
        
        const serviceClient = new ShareServiceClient(
            `https://${account}.file.core.windows.net${accountSas}`,
            pipeline
        );
        
        //indico el share
        const shareClient = serviceClient.getShareClient(shareName);
        
        //indico el directorio
        const directoryClient = shareClient.getDirectoryClient(directoryName);
        
        //indico en que carpeta cargo el archivo
        const fileClient = directoryClient.getFileClient(fileName);
       
        await fileClient.uploadData(browserFile, {
            rangeSize: 4 * 1024 * 1024, // 4MB range size
            concurrency: 20, // 20 concurrency
            onProgress: ev => {
                //console.log(fileName);
                //console.log(ev);
                const porcentajeCargado = (ev.loadedBytes/browserFile.size) * 100;
                
                //PAra modificar el estado, lo recorro con el map
                setArchivos(archivos => (
                    archivos.map(archivo => 
                        archivo.nombre === fileName ? { ...archivo, porcentaje: porcentajeCargado } : archivo
                    )
                ));

                if(porcentajeCargado === 100){
                    //llamo las api para guardar en la base de datos el archivo
                    
                }
            }
        });
    }

    const handleFileChange = (e) => {
        //ToDo: validar si el nombre ya esta en la lista de archivos(state), mostrar una alerta diciendo que hay alguno repetido
        e.target.files.forEach((file, index) =>  {
        
            setArchivos(archivos => [...archivos, {
                nombre: file.name,
                porcentaje: 0
            }]);

            uploadFile(file, index);
        });
    }

    const handleSubirArchivos = (indexCard) => {
        document.querySelector('#fileSelector'+indexCard).click();
    }
    
    useEffect(() => {
        //console.log(archivos);
    }, [archivos])

  return (
    <>
        <div className='col-md-6 pt-2'>
            <div className="card card-bordered h-100">
                <div className="card-inner">
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className="form-group">
                                <label className="form-label" htmlFor="default-01">
                                    Número de la caja
                                </label>
                                <div className="form-control-wrap">
                                    <input
                                    type="number"
                                    min="0"
                                    className="form-control"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="form-group">
                                <label className="form-label">Seleccione las carpetas</label>
                                <div className="form-control-wrap">
                                    <button 
                                        className="btn btn-outline-primary btn-md btn-block"
                                        onClick={() => handleSubirArchivos(indexCaja.cardNumber)}
                                    >
                                        <span>Seleccionar Archivos</span>
                                        <em className="icon ni ni-setting" />
                                    </button>

                                    <input
                                        id={"fileSelector"+indexCaja.cardNumber}
                                        type="file"
                                        accept=".pdf,.pdfa"
                                        multiple={true}
                                        style={{display: 'none'}}
                                        onChange={handleFileChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row pt-3'>
                        <div className='col-md-12'>
                            <div className="card card-bordered card-full">
                                <div className="card-inner d-flex flex-column h-100">
                                    <div className="card-title-group mb-3">
                                        <div className="card-title">
                                            <h6 className="title">Porcentaje de carga</h6>
                                        </div>
                                        <div className="card-tools mt-n4 me-n1">
                                            <div className="drodown">
                                                <button
                                                    className="dropdown-toggle btn btn-icon btn-trigger"
                                                    data-bs-toggle="dropdown"
                                                >
                                                    <em className="icon ni ni-cross"></em>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        archivos.map( archivo => (
                                            <ArchivoProgreso 
                                            key = { archivo.nombre } 
                                            nombre = { archivo.nombre }
                                            porcentaje = { archivo.porcentaje }
                                            />
                                        ))
                                    }
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
