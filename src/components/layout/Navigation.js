import React from 'react'
import { Link } from "react-router-dom"
import 
{ 
    useAuthStore, useForm
} from '../../hooks';

export const Navigation = () => {

  const { startLogout } = useAuthStore();
 
  const handleLogOut = () => {
    console.log("salir");
    startLogout();
  }

  return (
    <div className="nk-header nk-header-fluid is-theme">
      <div className="container-xl wide-xl">
        <div className="nk-header-wrap">
          <div className="nk-menu-trigger me-sm-2 d-lg-none">
            <a href="#" className="nk-nav-toggle nk-quick-nav-icon" data-target="headerNav"><em className="icon ni ni-menu" /></a>
          </div>
          <div className="nk-header-brand">
              <div className="user-avatar">
                <h4 className='text-white'><em className="icon ni ni-file-docs"></em></h4>
              </div>
            {/* <a href="#"  className="logo-link">
              <img className="logo-light logo-img" src="~/images/logo.png" srcSet="~/images/logo2x.png 2x" />             
            </a> */}
          </div>
          <div className="nk-header-menu" data-content="headerNav">
            <div className="nk-header-mobile">
              <div className="nk-header-brand">
                <a href="#"  className="logo-link">
                  <img className="logo-light logo-img" src="~/images/logo.png" srcSet="~/images/logo2x.png 2x"  />
                  <img className="logo-dark logo-img" src="~/images/logo-dark.png" srcSet="~/images/logo-dark2x.png 2x"  />
                </a>
              </div>
              <div className="nk-menu-trigger me-n2">
                <a href="#" className="nk-nav-toggle nk-quick-nav-icon" data-target="headerNav"><em className="icon ni ni-arrow-left" /></a>
              </div>
            </div>
            <ul className="nk-menu nk-menu-main ui-s2">
              {/* <li className="nk-menu-item has-sub">
                <a href="#" className="nk-menu-link nk-menu-toggle">
                  <span className="nk-menu-text">Dashboards</span>
                </a>
                <ul className="nk-menu-sub">
                  <li className="nk-menu-item">
                    <a href="#"  className="nk-menu-link">
                      <span className="nk-menu-text">Default Dashboard</span>
                    </a>
                  </li>
                  <li className="nk-menu-item">
                    <a href="#" className="nk-menu-link">
                      <span className="nk-menu-text">Sales Dashboard</span>
                    </a>
                  </li>
                  <li className="nk-menu-item">
                    <a href="#"  className="nk-menu-link">
                      <span className="nk-menu-text">Crypto Dashboard</span>
                    </a>
                  </li>
                  <li className="nk-menu-item">
                    <a href="#"  className="nk-menu-link">
                      <span className="nk-menu-text">Analytics Dashboard</span>
                    </a>
                  </li>
                  <li className="nk-menu-heading">
                    <h6 className="overline-title text-primary">Use-Case Concept</h6>
                  </li>
                  <li className="nk-menu-item">
                    <a href="#"  className="nk-menu-link" target="_blank">
                      <span className="nk-menu-text">Investment Panel</span>
                      <span className="nk-menu-badge">HOT</span>
                    </a>
                  </li>
                </ul>
              </li> */}
              <li className="nk-menu-item has-sub">
                <a href="#" className="nk-menu-link nk-menu-toggle">
                  <span className="nk-menu-text">FUID</span>
                </a>
                <ul className="nk-menu-sub">
                  <li className="nk-menu-item">
                  <Link 
                    className="nk-menu-link"
                    to="/administrarFuid">
                      <span className="nk-menu-text">Gestionar FUID</span> 
                  </Link>  
                  </li>
                </ul>
              </li>
              {/* <li className="nk-menu-item has-sub">
                <a href="#" className="nk-menu-link nk-menu-toggle">
                  <span className="nk-menu-text">Digitalización</span>
                </a>
                <ul className="nk-menu-sub">
                  <li className="nk-menu-item">
                  <Link 
                    className="nk-menu-link"
                    to="/CargueMasivo">
                      <span className="nk-menu-text">Cargue Masivo</span> 
                  </Link>  
                  </li>
                  <li className="nk-menu-item">
                    <a href="html/apps-messages.html" className="nk-menu-link"><span className="nk-menu-text">Administrar Cargas</span></a>
                  </li>
                </ul>
              </li>
              <li className="nk-menu-item has-sub">
                <a href="#" className="nk-menu-link nk-menu-toggle">
                  <span className="nk-menu-text">Asignación</span>
                </a>
                <ul className="nk-menu-sub">
                  <li className="nk-menu-item">
                    <a href="#"  className="nk-menu-link"><span className="nk-menu-text">Asignar Documentos</span></a>
                  </li>
                </ul>
              </li>
              <li className="nk-menu-item has-sub">
                <a href="#" className="nk-menu-link nk-menu-toggle">
                  <span className="nk-menu-text">Indexación</span>
                </a>
                <ul className="nk-menu-sub">
                  <li className="nk-menu-item">
                    <Link to="/tareasAnalista" className="nk-menu-link"><span className="nk-menu-text">Tareas Asignadas</span> </Link>
                  </li>
                  <li className="nk-menu-item">
                    <a href="#"  className="nk-menu-link"><span className="nk-menu-text">Documentos Indexados</span></a>
                  </li>
                </ul>
              </li>
              <li className="nk-menu-item has-sub">
                <a href="#" className="nk-menu-link nk-menu-toggle">
                  <span className="nk-menu-text">Reportes</span>
                </a>
                <ul className="nk-menu-sub">
                  <li className="nk-menu-item">
                    <a href="#" className="nk-menu-link"><span className="nk-menu-text">Reportes 1</span></a>
                  </li>
                  <li className="nk-menu-item">
                    <a href="#" className="nk-menu-link"><span className="nk-menu-text">Reporte 2</span></a>
                  </li>
                </ul>
              </li>
              <li className="nk-menu-item has-sub">
                <a href="#" className="nk-menu-link nk-menu-toggle">
                  <span className="nk-menu-text">Administrar</span>
                </a>
                <ul className="nk-menu-sub">
                  <li className="nk-menu-item has-sub">
                    <a href="#" className="nk-menu-link nk-menu-toggle">
                      <span className="nk-menu-text">Proyecto</span>
                    </a>
                    <ul className="nk-menu-sub">
                      <li className="nk-menu-item">
                        <a href="#"  className="nk-menu-link" target="_blank"><span className="nk-menu-text">Tabla de retención documental</span></a>
                      </li>
                      <li className="nk-menu-item">
                        <a href="#"  className="nk-menu-link" target="_blank"><span className="nk-menu-text">Campos personalizados</span></a>
                      </li>
                    </ul>
                  </li>
                  <li className="nk-menu-item">
                    <a href="#" className="nk-menu-link"><span className="nk-menu-text">Usuarios</span></a>
                  </li>
                </ul>
              </li> */}
            </ul>
          </div>
          <div className="nk-header-tools">
            <ul className="nk-quick-nav">
              {/* <li className="dropdown notification-dropdown">
                <a href="#" className="dropdown-toggle nk-quick-nav-icon" data-bs-toggle="dropdown">
                  <div className="icon-status icon-status-info"><em className="icon ni ni-bell" /></div>
                </a>
                <div className="dropdown-menu dropdown-menu-xl dropdown-menu-end dropdown-menu-s1">
                  <div className="dropdown-head">
                    <span className="sub-title nk-dropdown-title">Notifications</span>
                    <a href="#">Mark All as Read</a>
                  </div>
                  <div className="dropdown-body">
                    <div className="nk-notification">
                      <div className="nk-notification-item dropdown-inner">
                        <div className="nk-notification-icon">
                          <em className="icon icon-circle bg-warning-dim ni ni-curve-down-right" />
                        </div>
                        <div className="nk-notification-content">
                          <div className="nk-notification-text">You have requested to <span>Widthdrawl</span></div>
                          <div className="nk-notification-time">2 hrs ago</div>
                        </div>
                      </div>
                      <div className="nk-notification-item dropdown-inner">
                        <div className="nk-notification-icon">
                          <em className="icon icon-circle bg-success-dim ni ni-curve-down-left" />
                        </div>
                        <div className="nk-notification-content">
                          <div className="nk-notification-text">Your <span>Deposit Order</span> is placed</div>
                          <div className="nk-notification-time">2 hrs ago</div>
                        </div>
                      </div>
                      <div className="nk-notification-item dropdown-inner">
                        <div className="nk-notification-icon">
                          <em className="icon icon-circle bg-warning-dim ni ni-curve-down-right" />
                        </div>
                        <div className="nk-notification-content">
                          <div className="nk-notification-text">You have requested to <span>Widthdrawl</span></div>
                          <div className="nk-notification-time">2 hrs ago</div>
                        </div>
                      </div>
                      <div className="nk-notification-item dropdown-inner">
                        <div className="nk-notification-icon">
                          <em className="icon icon-circle bg-success-dim ni ni-curve-down-left" />
                        </div>
                        <div className="nk-notification-content">
                          <div className="nk-notification-text">Your <span>Deposit Order</span> is placed</div>
                          <div className="nk-notification-time">2 hrs ago</div>
                        </div>
                      </div>
                      <div className="nk-notification-item dropdown-inner">
                        <div className="nk-notification-icon">
                          <em className="icon icon-circle bg-warning-dim ni ni-curve-down-right" />
                        </div>
                        <div className="nk-notification-content">
                          <div className="nk-notification-text">You have requested to <span>Widthdrawl</span></div>
                          <div className="nk-notification-time">2 hrs ago</div>
                        </div>
                      </div>
                      <div className="nk-notification-item dropdown-inner">
                        <div className="nk-notification-icon">
                          <em className="icon icon-circle bg-success-dim ni ni-curve-down-left" />
                        </div>
                        <div className="nk-notification-content">
                          <div className="nk-notification-text">Your <span>Deposit Order</span> is placed</div>
                          <div className="nk-notification-time">2 hrs ago</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-foot center">
                    <a href="#">View All</a>
                  </div>
                </div>
              </li> */}
              <li className="dropdown user-dropdown order-sm-first">
                <a href="#" className="dropdown-toggle" data-bs-toggle="dropdown">
                  <div className="user-toggle">
                    <div className="user-avatar sm">
                      <em className="icon ni ni-user-alt" />
                    </div>
                    <div className="user-info d-none d-xl-block">
                      <div className="user-status">Usuario test</div>
                      <div className="user-name dropdown-indicator">Analista documental</div>
                    </div>
                  </div>
                </a>
                <div className="dropdown-menu dropdown-menu-md dropdown-menu-end dropdown-menu-s1 is-light">
                  <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
                    <div className="user-card">
                      <div className="user-avatar">
                        <span>AD</span>
                      </div>
                      <div className="user-info">
                        <span className="lead-text">Analista Documental</span>
                        <span className="sub-text">Rol del usuario</span>
                      </div>
                    </div>
                  </div>
                  {/* <div className="dropdown-inner user-account-info">
                    <h6 className="overline-title-alt">Folios Indexados</h6>
                    <div className="user-balance">1,494</div>
                    <div className="user-balance-sub">Folios por indexar <span>15,495</span></div>
                    
                  </div> */}
                  <div className="dropdown-inner">
                    <ul className="link-list">
                      {/* <li><a href="html/user-profile-regular.html"><em className="icon ni ni-user-alt" /><span>Administrar Usuario</span></a></li> */}
                      <li>
                        <a onClick={handleLogOut} className="dark-mode-switch" >
                          <em className="icon ni ni-signout" />
                          <span>Salir</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
