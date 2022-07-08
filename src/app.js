import React from "react";
import { AppRouter } from "./routers/AppRouter";

export const App = () => {
    return (        
        <div className="nk-app-root">
             <div className="nk-wrap ">   
                <AppRouter />
            </div>
        </div>
        
    )
}