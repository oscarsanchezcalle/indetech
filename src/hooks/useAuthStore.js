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
           
            const {data} = await indetechApi.post('/auth/signInJwt', loginForm);

            const tokenPayload = parseJwt(data.token);
            
            const user = convertExternalAuthToInternal(tokenPayload);

            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            
            dispatch( setIsAuthenticated( true ) );
            dispatch( onLoadAuth( user ) );
            dispatch( setIsLoading(false) );

        } catch (error) {

            dispatch( setIsAuthenticated( false ) );
            dispatch( setIsLoading(false) );
            localStorage.clear();
            
            Swal.fire({
                //position: 'top-end',
                icon: 'warning',
                title: 'Datos incorrectos',
                text: 'Usuario o clave incorrectas',
                showConfirmButton: true,
                timer: 1500
            });
            localStorage.clear();

            console.log(error);
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
            
            localStorage.clear();
            dispatch( setIsAuthenticated( false ) );
            dispatch( onLoadAuth( user ) );
            dispatch( setIsLoading(false) );

        }
        catch (error) 
        {   
            dispatch( setIsAuthenticated( true ) );
            dispatch( setIsLoading(false) );
            Swal.fire({
                //position: 'top-end',
                icon: 'warning',
                title: 'Ooops!',
                text: 'Error de conexión al servidor.',
                showConfirmButton: true,
                timer: 1500
            });

             console.log(error);
        }
    }

    const checkAuthToken = async() => {

        dispatch( setIsLoading(true) );

        const token = localStorage.getItem('token');

        if ( !token ) return startLogout();

        dispatch( setIsAuthenticated( true ) );

        const tokenPayload = parseJwt(token);
        
        const tokenUserName = tokenPayload.unique_name;
        
        const date = new Date();
        const ahora = Math.floor(date.getTime() / 1000);
        const dif = (tokenPayload.exp - ahora);
        
        // console.log(dif);
        // console.log(tokenPayload.exp);
        // console.log(ahora);

        //si falta mas de una hora para expirar el token, no lo renuevo.
        if( dif > 3600 )
        {
            const internalUser = convertExternalAuthToInternal(tokenPayload);
            dispatch( onLoadAuth( internalUser ) );
            dispatch( setIsLoading(false) );

            return;
        }

        //si falta menos de 1 hora para que venza el token, lo renuevo.        
        try {
            const { data } = await indetechApi.get('/auth/renewJwt/'+tokenUserName);
            
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
           
            const tknPayload = parseJwt(data.token);
            const user = convertExternalAuthToInternal(tknPayload);

            dispatch( onLoadAuth( user ) );
            dispatch( setIsLoading(false) );

        } catch (error) {
            console.log(error);
            startLogout();
        }
    }

    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    };

    return {
        //* Propiedades
        persona, username, rol, proyecto, proyectoId, objetoContrato, isAuthenticated, identityId, isLoading,

        //* Métodos
        startLoadingAuth,
        startLogout,
        checkAuthToken
    }
}
