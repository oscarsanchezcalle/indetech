import React, { useEffect } from 'react'
import { Navigation } from '../layout/Navigation'
import { Footer } from '../layout/Footer'
import { AppScreenRouter } from '../../routers/AppScreenRouter'
import { useAuthStore } from '../../hooks'

export const AppScreen = () => {

  const { startLoadingAuth } = useAuthStore();

   //cargo la primera vez
  useEffect(() => {
    document.body.style.zoom = "90%";
    startLoadingAuth();
  }, [])

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
