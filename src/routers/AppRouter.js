import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,   
    Redirect
  } from "react-router-dom";
import { AppScreen } from '../components/app/AppScreen';
//import { getEnvVariables } from '../helpers';
import { AuthRouter } from './AuthRouter';
  
export const AppRouter = () => {

  //const authStatus = 'authenticated'; // 'authenticated'; // 'not-authenticated';
  
  return (
    <Router>      
        <div>
            <Switch>
                <Route 
                    path="/auth/*"
                    component={AuthRouter}
                />
                <Route 
                    path="/"
                    component={AppScreen}
                />
                <Redirect to="/notFound"/>
            </Switch>
        </div>        
    </Router>
  )
}
