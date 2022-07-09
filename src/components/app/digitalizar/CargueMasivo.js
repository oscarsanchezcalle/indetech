import React from 'react'
const {
    AnonymousCredential,
    ShareServiceClient,
    newPipeline,
  } = require("@azure/storage-file-share");

export const CargueMasivo = () => {

  // Fill in following settings before running this sample
  const account = process.env.ACCOUNT_NAME || "indetechstorage";
  const accountSas = process.env.ACCOUNT_SAS || "?sv=2021-06-08&ss=f&srt=sco&sp=rwdlc&se=2023-07-09T13:03:55Z&st=2022-07-09T05:03:55Z&spr=https&sig=QncaMFN7BQ44GIJkIyQAhHuMp98oPQUv9ZtkKUc3n8U%3D";

  const shareName = "proyectoa";
  const directoryName = "cargue";
  
  const  uploadFile = async (browserFile) => {

    
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
    const fileClient = directoryClient.getFileClient(browserFile.name);
    
    console.log(browserFile);

    await fileClient.uploadData(browserFile, {
        rangeSize: 4 * 1024 * 1024, // 4MB range size
        concurrency: 20, // 20 concurrency
        onProgress: ev => {
            console.log(browserFile.name + ": ");
            console.log(ev);
        }
      });
  }

  const handleFileChange = (e) => {
    console.log(e.target.files);
    
    
    const file = e.target.files[0];
    // if(file){
    //     // uploading file
    //     uploadFile(file);
    // }

    e.target.files.forEach(file =>  {
        uploadFile(file)
    });


  }

  return (
    <>
    <div>CargueMasivo</div>

     <input 
          id="fileSelector"
          type="file" 
          name="file"
          multiple
          onChange={handleFileChange}/>
    </>
  )
}
