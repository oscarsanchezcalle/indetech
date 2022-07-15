import React from "react";
import { Provider } from "react-redux";
import { AppRouter } from "./routers/AppRouter";
import { store } from "./store";

export const App = () => {
    return (    
        <>
           <Provider store={ store }>
                <React.StrictMode>
                    <div className="nk-app-root">
                        <div className="nk-wrap ">   
                            <AppRouter />
                        </div>
                    </div>
                </React.StrictMode>
            </Provider>
        </>    
        
    )
}