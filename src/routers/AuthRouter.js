import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';


export const AuthRouter = () => {
  return (
    <div className='auth__main'>
      <div className='auth__box-container'>
        <Switch>
              <Route 
                  exact
                  path="/auth/login"
                  component={ LoginScreen }
              />
              <Route 
                  exact
                  path="/auth/register"
                  component={ RegisterScreen }
              />

              {/* en caso que no sea una de las rutas anteriores, va al login  */}
              <Redirect to="/auth/login" />
              
          </Switch>
      </div>
    </div>
  )
}
