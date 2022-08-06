import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppScreen } from '../components/app/AppScreen';
import { FuidScreen } from '../components/app/organizar/FuidScreen';
import { LoginScreen } from '../components/auth/LoginScreen';
import { TareasAsignadas } from '../components/app/indexar/TareasAsignadas';
import { IndexarDocumento } from '../components/app/indexar/IndexarDocumento';
import { CargueMasivo } from '../components/app/digitalizar/CargueMasivo';
import { Dashboard } from '../components/app/dashboard/Dashboard';
import { PageNotFound } from '../components/app/notFound/PageNotFound';

  
export const AppRouter = () => {
  
  const status = 'non-authenticated'; // 'authenticated'; // 'not-authenticated';
  
  return (
    
    <Routes>
        {
            ( status === 'non-authenticated')  
                ? (
                    <>
                        <Route path="/auth/*" element={ <LoginScreen /> } />
                        <Route path="/*" element={ <Navigate to="/auth/login" /> } />
                    </>
                )
                : (
                    <>
                        <Route path="/"  element={<AppScreen />}>
                            <Route index element={<Dashboard />} />
                            <Route path="/tareasAnalista" element={<TareasAsignadas />} />  
                            <Route path="/indexar" element={<IndexarDocumento />} />  
                            <Route path="/cargueMasivo" element={<CargueMasivo />}/>                    
                            <Route path="/administrarFuid" element={<FuidScreen/>}/>
                            <Route path="/*" element={ <PageNotFound/>} />
                            {/* esta bien que mande pal not found por que auth/login no existe, debo redireccionar en el login a / */}
                        </Route>
                    </>
                )
        }

    </Routes>
)}
