import React from 'react'
import { AdminNavbar } from '../layout/AdminNavbar'
import { Footer } from '../layout/Footer'
import { Outlet } from 'react-router-dom'
import { useAuthStore } from '../../hooks'

export const AppScreen = () => {

  const { isLoading } = useAuthStore();

  return (
  
   <div className="nk-app-root">
     <div className="nk-wrap ">
        <AdminNavbar />
        <div className="nk-content nk-content-fluid">
          <div className="container-xl wide-xl">
            <div className="nk-content-inner">
              <div className="nk-content-body">
                {
                    ( isLoading )  
                    ? (
                        <>
                          <i className="fas fa-circle-notch fa-spin"></i>
                        </>
                    ): (
                        <>
                          {/* Rutas con el navbar */}
                          <Outlet />
                        </>
                    )
                }
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
