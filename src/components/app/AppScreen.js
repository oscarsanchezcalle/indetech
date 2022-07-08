import React from 'react'
import { Navigation } from '../layout/Navigation'
import { Footer } from '../layout/Footer'
import { AppScreenRouter } from '../../routers/AppScreenRouter'

export const AppScreen = () => {
  return (
   <div className="nk-app-root">
     <div className="nk-wrap ">
      <Navigation />
      <div className="nk-content nk-content-fluid">
        <div className="container-xl wide-xl">
          <div className="nk-content-inner">
            <div className="nk-content-body">
              
              {/* Rutas con el navbar */}
              <AppScreenRouter />
             
            </div>
          </div>
        </div>
      </div>
      <Footer />
  </div>
</div>
  )
}
