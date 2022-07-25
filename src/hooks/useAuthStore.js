import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { onLoadAuth, setIsAuthenticated } from '../store';

export const useAuthStore = () => {
  
    const dispatch = useDispatch();

    const { persona, username, rol, proyecto, proyectoId, objetoContrato, authenticated } = useSelector( state => state.auth );
    
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

    const startLogIn = async(user, pass) => {
        
        try 
        {
             //get user from api
             if(user === "analista" && pass === "Indetech2022"){
                const user = {
                    persona:  'Moises Sánchez', 
                    username: 'moise', 
                    rol: 'Administrador', 
                    proyecto: 'ALCALDÍA MUNICIPAL DE SOACHA', 
                    proyectoId: 1, 
                    objetoContrato: 'Contrato PROTECH ingeniería'
                }
                
                dispatch( onLoadAuth(user) );
                dispatch( setIsAuthenticated(true) );

            }else{
                Swal.fire({
                    //position: 'top-end',
                    icon: 'warning',
                    title: 'Datos incorrectos',
                    text: 'Usuario y/o clave incorrectas',
                    showConfirmButton: true,
                    //timer: 1500
                });
                dispatch( setIsAuthenticated(false) );

            }

        } catch (error) 
        {
            console.log(error);
        }
    }

    const startLogout = async() => {
        dispatch( setIsAuthenticated(false) );
    }
    
    return {
        //* Propiedades
        persona, username, rol, proyecto, proyectoId, objetoContrato, authenticated,

        //* Métodos
        startLoadingAuth,
        startLogIn,
        startLogout
    }
}
