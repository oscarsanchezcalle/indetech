import React from 'react';
import logo from './logoProtech.png';
import { LoadingInButton } from './../../components/app/LoadingInButton';
import 
{ 
    useAuthStore, useForm
} from '../../hooks';
import { SliderLogin } from './SliderLogin';

export const LoginScreen = () => {

  const { startLoadingAuth, isLoading } = useAuthStore();

  const [formValues, handleInputChange] = useForm({
    username:'',
    password:''
  });
 
  const {username, password} = formValues;
  
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      startLoadingAuth(username,password);
    }
  }

  const handleBtnLogin = () => {
    startLoadingAuth(username,password);
  }

  return (
    <>
      <div className="nk-app-root">
          {/* main @s */}
          <div className="nk-main ">
            {/* wrap @s */}
            <div className="nk-wrap nk-wrap-nosidebar">
              {/* content @s */}
              <div className="nk-content ">
                <div className="nk-split nk-split-page nk-split-md">
                  <div className="nk-split-content nk-block-area nk-block-area-column nk-auth-container bg-white">
                    <div className="nk-block nk-block-middle nk-auth-body">
                      <div className="brand-logo pb-5">
                        <a href="/" className="logo-link">
                          <img
                            className="logo-img logo-img-lg"
                            src={logo}
                            alt="logo-dark"
                          />
                        </a>
                      </div>
                      <div className="nk-block-head">
                        <div className="nk-block-head-content">
                          <h5 className="nk-block-title">Iniciar Sesión</h5>
                          <div className="nk-block-des">
                            <p>
                              Ingrese su credenciales de acceso
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* .nk-block-head */}
                      
                        <div className="form-group">
                          <div className="form-label-group">
                            <label className="form-label" htmlFor="default-01">
                              Usuario
                            </label>
                          </div>
                          <div className="form-control-wrap">
                          <input
                                type='text'
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                value={username}
                                autoComplete="off"
                                placeholder='Ingresa el nombre de usuario'
                                name='username'
                                className='form-control form-control-lg'
                              />
                          </div>
                        </div>
                        {/* .form-group */}
                        <div className="form-group">
                          <div className="form-label-group">
                            <label className="form-label" htmlFor="password">
                              Contraseña
                            </label>
                          </div>
                          <div className="form-control-wrap">
                            <input
                              type='password'
                              onChange={handleInputChange}
                              onKeyDown={handleKeyDown}
                              value={password}
                              autoComplete="off"
                              placeholder='Ingresa la clave de acceso'
                              name='password'
                              className='form-control form-control-lg'
                            />
                          </div>
                        </div>             
                        {/* .form-group */}
                        <div className="form-group">
                          <button onClick={handleBtnLogin}  disabled={isLoading} className="btn btn-lg btn-primary btn-block">
                          <LoadingInButton isLoading={isLoading} btnText="Ingresar" />
                          </button>
                        </div>
                      {/* form */}
                    </div>
                    {/* .nk-block */}
                    <div className="nk-block nk-auth-footer">
                      <div className="nk-block-between">
                       
                        {/* .nav */}
                      </div>
                      <div className="mt-3">
                         <p>© {new Date().getFullYear()} <a target="_blank" href="https://protechingenieria.com/">Protech Ingeniería</a> Todos los derechos reservados.</p>
                      </div>
                    </div>
                    {/* .nk-block */}
                  </div>
                  {/* .nk-split-content */}
                  
                  {/* .nk-split-content */}
                  <SliderLogin />
                  </div>
                {/* .nk-split */}
              </div>
              {/* wrap @e */}
            </div>
            {/* content @e */}
          </div>
          {/* main @e */}
        </div>   
    </>
  )
}


