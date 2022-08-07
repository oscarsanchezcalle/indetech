import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { indetechApi } from '../api';
import { convertExternalAuthToInternal } from '../helpers/convertExternalAuthToInternal';
import { onLoadAuth, setIsAuthenticated, setIsLoading } from '../store';

export const useAuthStore = () => {
  
    const dispatch = useDispatch();

    const { persona, username, rol, proyecto, proyectoId, objetoContrato, identityId, isAuthenticated, isLoading } = useSelector( state => state.auth );
    
    const startLoadingAuth = async(userName, password) => {

        dispatch( setIsLoading(true) );

        try 
        {
            const loginForm = {
                "userName": userName,
                "password": password,
                "rememberMe": true
            }
           
            const {data} = await indetechApi.post('/auth/signIn', loginForm);
 
            const user = convertExternalAuthToInternal(data);
            
            dispatch( setIsAuthenticated( true ) );
            dispatch( onLoadAuth( user ) );

        } catch (error) {

                dispatch( setIsAuthenticated( false ) );
                dispatch( setIsLoading(false) );
                
                Swal.fire({
                    //position: 'top-end',
                    icon: 'warning',
                    title: 'Datos incorrectos',
                    text: 'Usuario o clave incorrectas',
                    showConfirmButton: true,
                    timer: 1500
                });

            //console.log(error?.response?.data);
        }
    }

    const startLogout = async() => {
        try
        {
            await indetechApi.post('/auth/signOut');

            const user = {
                persona:'',
                username: '',
                rol: '',
                proyectoId: 0,
                proyecto:'',
                objetoContrato: '',
                identityId: '',
            }
            
            dispatch( setIsAuthenticated( false ) );

            dispatch( onLoadAuth( user ) );

        }
        catch (error) 
        {   
            dispatch( setIsAuthenticated( true ) );
            Swal.fire({
                //position: 'top-end',
                icon: 'warning',
                title: 'OOPS',
                text: 'Error cerrando la sesión',
                showConfirmButton: true,
                timer: 1500
            });

             console.log(error);
        }
    }

    return {
        //* Propiedades
        persona, username, rol, proyecto, proyectoId, objetoContrato, isAuthenticated, identityId, isLoading,

        //* Métodos
        startLoadingAuth,
        startLogout
    }
}
