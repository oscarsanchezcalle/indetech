import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppScreen } from '../components/app/AppScreen';
import { FuidScreen } from '../components/app/organizar/FuidScreen';
import { LoginScreen } from '../components/auth/LoginScreen';
import { TareasAsignadas } from '../components/app/indexar/TareasAsignadas';
import { IndexarDocumento } from '../components/app/indexar/IndexarDocumento';
import { CargueMasivo } from '../components/app/digitalizar/CargueMasivo';
import { Dashboard } from '../components/app/dashboard/Dashboard';
import { PageNotFound } from '../components/app/notFound/PageNotFound';
import { useAuthStore } from '../hooks';

  
export const AppRouter = () => {
  
  const { isAuthenticated, checkAuthToken } = useAuthStore();
  
    useEffect(() => {
        checkAuthToken();
    }, []);

  return (
    
    <Routes>
        {
            ( !isAuthenticated )  
                ? (
                    <>
                        <Route path="/auth/*" element={ <LoginScreen /> } />
                        <Route path="/*" element={ <Navigate to="/auth/login" /> } />
                    </>
                )
                : (
                    <>
                        <Route path="/" element={<AppScreen />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/tareasAnalista" element={<TareasAsignadas />} />  
                            <Route path="/indexar" element={<IndexarDocumento />} />  
                            <Route path="/cargueMasivo" element={<CargueMasivo />}/>                    
                            <Route path="/administrarFuid" element={<FuidScreen/>}/>
                            <Route index element={<FuidScreen/>}/>
                            
                            <Route path="/auth/login"  element={  <Navigate to="/" /> } />
                            <Route path="/*" element={ <PageNotFound/>} />
                            
                        </Route>
                    </>
                )
        }

    </Routes>
)}
