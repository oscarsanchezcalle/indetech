import React, { useEffect } from 'react'
import 
{ 
    useAuthStore, useForm
} from '../../hooks';

export const LoginScreen = () => {

  const { startLogIn, authenticated } = useAuthStore();

  const [formValues, handleInputChange] = useForm({
    username:'',
    password:''
  });
 
  const {username, password} = formValues;

  const handleBtnLogin = () => {
    startLogIn(username,password);
  }

  return (
    <>
    <div className="nk-main ">
      {/* wrap @s */}
      <div className="nk-wrap nk-wrap-nosidebar">
        {/* content @s */}
        <div className="nk-content ">
          <div className="nk-block nk-block-middle nk-auth-body  wide-xs">
            <div className="brand-logo pb-4 text-center">
              <a href="html/index.html" className="logo-link">
                <img
                  className="logo-light logo-img logo-img-lg"
                  src="./images/logo.png"
                  srcSet="./images/logo2x.png 2x"
                  alt="logo"
                />
                {/* <img
                  className="logo-dark logo-img logo-img-lg"
                  src="./images/logo-dark.png"
                  srcSet="./images/logo-dark2x.png 2x"
                  alt="logo-dark"
                /> */}
              </a>
            </div>
            <div className="card card-bordered">
              <div className="card-inner card-inner-lg">
                <div className="nk-block-head">
                  <div className="nk-block-head-content">
                    <h4 className="nk-block-title">Iniciar Sesión</h4>
                    <div className="nk-block-des">
                      <p>
                        Acceso a Indetech Sistema de Gestión Documental
                      </p>
                    </div>
                  </div>
                </div>
                
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
                        value={username}
                        autoComplete="off"
                        placeholder='Ingresa el nombre de usuario'
                        name='username'
                        className='form-control'
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="password">
                        Clave
                      </label>
                      
                    </div>
                    <div className="form-control-wrap">                  
                      <input
                        type='password'
                        onChange={handleInputChange}
                        value={password}
                        autoComplete="off"
                        placeholder='Ingresa la clave de acceso'
                        name='password'
                        className='form-control'
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <button  onClick={handleBtnLogin} className="btn btn-lg btn-primary btn-block">
                      Entrar
                    </button>
                  </div>
                
              
                
              </div>
            </div>
          </div>
        
        </div>
        {/* wrap @e */}
      </div>
      {/* content @e */}
    </div>
      
    </>
  )
}


