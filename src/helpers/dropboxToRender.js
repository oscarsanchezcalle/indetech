import { dropboxApiKey } from "./getEnvVariables";

export const dropboxToRender = () => {

    const script = document.createElement("script");
    script.src = "/static/libs/your_script.js";
    script.async = true;
    script.onload = () => this.scriptLoaded();
  
    document.body.appendChild(script);
    // var element = document.getElementById("dropboxjs");
    
    // if(element == null){
    //     //const script = document.createElement("script");
    //     // script.src = "https://www.dropbox.com/static/api/2/dropins.js";
    //     // script.id="dropboxjs";
    //     // script.setAttribute("data-app-key", dropboxApiKey);
    //     // script.async = true;
    //     // document.body.appendChild(script);
    // }
    
};

export const removeDropboxToRender = () => {
    try{
        var element = document.getElementById("dropboxjs");
        if(element != null){
            console.log("remover");
            element.remove();
        }
    }catch(e){}
   
};

export const downloadURI = (uri, name) => {
    let link = document.createElement("a");
    link.download = name;
    link.href = uri;
    link.click();
  }

