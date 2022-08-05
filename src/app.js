import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routers/AppRouter";
import { store } from "./store";

export const App = () => {
    return (    
        <>
           <Provider store={ store }>
                <BrowserRouter>
                    <div className="nk-app-root">
                        <div className="nk-wrap ">   
                            <AppRouter />
                        </div>
                    </div>
                </BrowserRouter>
            </Provider>
        </>    
        
    )
}