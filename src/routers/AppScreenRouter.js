import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,   
    Redirect
  } from "react-router-dom";
import { Dashboard } from '../components/app/dashboard/Dashboard';
import { CargueMasivo } from '../components/app/digitalizar/CargueMasivo';
import { IndexarDocumento } from '../components/app/indexar/IndexarDocumento';
import { TareasAsignadas } from '../components/app/indexar/TareasAsignadas';
import { PageNotFound } from '../components/app/notFound/PageNotFound';
  
export const AppScreenRouter = () => {
  return (
        <div>
            <Switch>
                
                <Route 
                    exact
                    path="/"
                    component={ Dashboard }
                 />   

                <Route 
                    exact
                    path="/tareasAnalista"
                    component={TareasAsignadas}
                />  

                <Route 
                    exact
                    path="/indexar"
                    component={IndexarDocumento}
                /> 
                
                <Route
                    exact
                    path="/CargueMasivo"
                    component={CargueMasivo}
                />                    

                <Route 
                    exact 
                    path="/notFound" 
                    component={PageNotFound}
                />
                    
                <Redirect to="/notFound"/> 
                
            </Switch>
        </div>        
  )
}
