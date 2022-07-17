import { useDispatch, useSelector } from 'react-redux';
import { onLoadAuth } from '../store';

export const useAuthStore = () => {
  
    const dispatch = useDispatch();

    const { persona, username, rol, proyecto, proyectoId, objetoContrato } = useSelector( state => state.auth );
    
    const startLoadingAuth = async() => {
       
        try 
        {
            //get user from api

            const user = {
                persona:  'Moises Sánchez', 
                username: 'moise', 
                rol: 'Administrador', 
                proyecto: 'ALCALDÍA MUNICIPAL DE SOACHA', 
                proyectoId: 1, 
                objetoContrato: 'Contrato PROTECH ingeniería'
            }
            
            dispatch( onLoadAuth(user) );

        } catch (error) 
        {
            console.log(error);
        }
    }
    
    return {
        //* Propiedades
        persona, username, rol, proyecto, proyectoId, objetoContrato,

        //* Métodos
        startLoadingAuth
    }
}
