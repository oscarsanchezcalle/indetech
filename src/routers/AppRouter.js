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
import { AsociarImagenCarpeta } from '../components/app/digitalizar/AsociarImagenCarpeta';
import { AsociarImagenes } from '../components/app/digitalizar/AsociarImagenes';
import { ListaCarpetas } from '../components/app/indexar/ListaCarpetas';
import { FuidScreenSoacha } from '../components/app/organizar/FuidScreenSoacha';
import { FuidScreenGobernacion } from '../components/app/organizar/FuidScreenGobernacion';
import { FuidScreenPlaneacion } from '../components/app/organizar/FuidScreenPlaneacion';

  
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
                            <Route path="/administrarFuid" element={<FuidScreen/>}/>
                            <Route path="/administrarFuidPlaneacion" element={<FuidScreenPlaneacion/>}/>
                            <Route path="/administrarFuidSoacha" element={<FuidScreenSoacha />}/>  
                            <Route path="/administrarFuidGobernacion" element={<FuidScreenGobernacion />}/>  
                            <Route path="/asociarImagen" element={<AsociarImagenCarpeta />}/>                    
                            <Route path="/asociarImagenes" element={<AsociarImagenes/>}></Route>                  
                            <Route path="/listaCarpetas" element={<ListaCarpetas />} />  
                            <Route path="/indexar" element={<IndexarDocumento />} />  
                            <Route path="/tareasAnalista" element={<TareasAsignadas />} />  
                            <Route path="/cargueMasivo" element={<CargueMasivo />}/>  
                            <Route index element={<Dashboard/>}/>
                            
                            <Route path="/auth/login"  element={  <Navigate to="/" /> } />
                            <Route path="/*" element={ <PageNotFound/>} />
                            
                        </Route>
                    </>
                )
        }

    </Routes>
)}
