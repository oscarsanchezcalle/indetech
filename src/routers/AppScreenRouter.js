import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,   
    Redirect
  } from "react-router-dom";
import { IndexarDocumento } from '../components/app/indexar/IndexarDocumento';
import { TareasAsignadas } from '../components/app/indexar/TareasAsignadas';
  
export const AppScreenRouter = () => {
  return (
    <Router>
        <div>
            <Switch>
                <Route 
                    exact path="/"
                    //component={AuthRouter}
                >
                    home
                </Route>

                <Route 
                    exact
                    path="/tareasanalista"
                    component={TareasAsignadas}>                    
                </Route>

                <Route 
                    exact
                    path="/indexar"
                    component={IndexarDocumento}>                    
                </Route>

                <Route exact path="/notFound" 
                    //component={AppScreen}
                >
                    404 not found
                </Route>
                    
                <Redirect to="/notFound"/> 
                
            </Switch>
        </div>        
    </Router>
  )
}
