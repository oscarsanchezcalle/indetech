// import React, { useState } from 'react'
// import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import Container from 'react-bootstrap/Container';

export const Navigation = () => {

  return (
    <div className="nk-header nk-header-fluid is-theme">
      <div className="container-xl wide-xl">
        <div className="nk-header-wrap">
          <div className="nk-menu-trigger me-sm-2 d-lg-none">
            <a href="#" className="nk-nav-toggle nk-quick-nav-icon" data-target="headerNav"><em className="icon ni ni-menu" /></a>
          </div>
          <div className="nk-header-brand">
            <a href="html/index.html" className="logo-link">
              <img className="logo-light logo-img" src="~/images/logo.png" srcSet="~/images/logo2x.png 2x" />             
            </a>
          </div>{/* .nk-header-brand */}
          <div className="nk-header-menu" data-content="headerNav">
            <div className="nk-header-mobile">
              <div className="nk-header-brand">
                <a href="html/index.html" className="logo-link">
                  <img className="logo-light logo-img" src="~/images/logo.png" srcSet="~/images/logo2x.png 2x"  />
                  <img className="logo-dark logo-img" src="~/images/logo-dark.png" srcSet="~/images/logo-dark2x.png 2x"  />
                </a>
              </div>
              <div className="nk-menu-trigger me-n2">
                <a href="#" className="nk-nav-toggle nk-quick-nav-icon" data-target="headerNav"><em className="icon ni ni-arrow-left" /></a>
              </div>
            </div>
            <ul className="nk-menu nk-menu-main ui-s2">
              <li className="nk-menu-item has-sub">
                <a href="#" className="nk-menu-link nk-menu-toggle">
                  <span className="nk-menu-text">Dashboards</span>
                </a>
                <ul className="nk-menu-sub">
                  <li className="nk-menu-item">
                    <a href="html/index.html" className="nk-menu-link">
                      <span className="nk-menu-text">Default Dashboard</span>
                    </a>
                  </li>{/* .nk-menu-item */}
                  <li className="nk-menu-item">
                    <a href="html/index-sales.html" className="nk-menu-link">
                      <span className="nk-menu-text">Sales Dashboard</span>
                    </a>
                  </li>{/* .nk-menu-item */}
                  <li className="nk-menu-item">
                    <a href="html/index-crypto.html" className="nk-menu-link">
                      <span className="nk-menu-text">Crypto Dashboard</span>
                    </a>
                  </li>{/* .nk-menu-item */}
                  <li className="nk-menu-item">
                    <a href="html/index-analytics.html" className="nk-menu-link">
                      <span className="nk-menu-text">Analytics Dashboard</span>
                    </a>
                  </li>{/* .nk-menu-item */}
                  <li className="nk-menu-heading">
                    <h6 className="overline-title text-primary">Use-Case Concept</h6>
                  </li>{/* .nk-menu-item */}
                  <li className="nk-menu-item">
                    <a href="html/invest/index.html" className="nk-menu-link" target="_blank">
                      <span className="nk-menu-text">Investment Panel</span>
                      <span className="nk-menu-badge">HOT</span>
                    </a>
                  </li>{/* .nk-menu-item */}
                </ul>{/* .nk-menu-sub */}
              </li>{/* .nk-menu-item */}
              <li className="nk-menu-item has-sub">
                <a href="#" className="nk-menu-link nk-menu-toggle">
                  <span className="nk-menu-text">Digitalización</span>
                </a>
                <ul className="nk-menu-sub">
                  <li className="nk-menu-item">
                    <a href="html/apps-messages.html" className="nk-menu-link"><span className="nk-menu-text">Cargue Masivo</span></a>
                  </li>
                  <li className="nk-menu-item">
                    <a href="html/apps-messages.html" className="nk-menu-link"><span className="nk-menu-text">Administrar Cargas</span></a>
                  </li>
                </ul>{/* .nk-menu-sub */}
              </li>{/* .nk-menu-item */}
              <li className="nk-menu-item has-sub">
                <a href="#" className="nk-menu-link nk-menu-toggle">
                  <span className="nk-menu-text">Asignación</span>
                </a>
                <ul className="nk-menu-sub">
                  <li className="nk-menu-item">
                    <a href="html/apps-messages.html" className="nk-menu-link"><span className="nk-menu-text">Asignar Documentos</span></a>
                  </li>
                </ul>{/* .nk-menu-sub */}
              </li>{/* .nk-menu-item */}
              <li className="nk-menu-item has-sub">
                <a href="#" className="nk-menu-link nk-menu-toggle">
                  <span className="nk-menu-text">Indexación</span>
                </a>
                <ul className="nk-menu-sub">
                  <li className="nk-menu-item">
                    <a href="html/_blank.html" className="nk-menu-link"><span className="nk-menu-text">Tareas Asignadas</span></a>
                  </li>
                  <li className="nk-menu-item">
                    <a href="html/pages/terms-policy.html" className="nk-menu-link"><span className="nk-menu-text">Documentos Indexados</span></a>
                  </li>
                </ul>{/* .nk-menu-sub */}
              </li>{/* .nk-menu-item */}
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
                </ul>{/* .nk-menu-sub */}
              </li>{/* .nk-menu-item */}
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
                        <a href="html/pages/auths/auth-login.html" className="nk-menu-link" target="_blank"><span className="nk-menu-text">Tabla de retención documental</span></a>
                      </li>
                      <li className="nk-menu-item">
                        <a href="html/pages/auths/auth-login.html" className="nk-menu-link" target="_blank"><span className="nk-menu-text">Campos personalizados</span></a>
                      </li>
                    </ul>{/* .nk-menu-sub */}
                  </li>{/* .nk-menu-item */}
                  <li className="nk-menu-item">
                    <a href="#" className="nk-menu-link"><span className="nk-menu-text">Usuarios</span></a>
                  </li>
                </ul>{/* .nk-menu-sub */}
              </li>{/* .nk-menu-item */}
            </ul>{/* .nk-menu */}
          </div>{/* .nk-header-menu */}
          <div className="nk-header-tools">
            <ul className="nk-quick-nav">
              <li className="dropdown notification-dropdown">
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
                    </div>{/* .nk-notification */}
                  </div>{/* .nk-dropdown-body */}
                  <div className="dropdown-foot center">
                    <a href="#">View All</a>
                  </div>
                </div>
              </li>{/* .dropdown */}
              <li className="dropdown user-dropdown order-sm-first">
                <a href="#" className="dropdown-toggle" data-bs-toggle="dropdown">
                  <div className="user-toggle">
                    <div className="user-avatar sm">
                      <em className="icon ni ni-user-alt" />
                    </div>
                    <div className="user-info d-none d-xl-block">
                      <div className="user-status">Administrador</div>
                      <div className="user-name dropdown-indicator">Moises Sánchez</div>
                    </div>
                  </div>
                </a>
                <div className="dropdown-menu dropdown-menu-md dropdown-menu-end dropdown-menu-s1 is-light">
                  <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
                    <div className="user-card">
                      <div className="user-avatar">
                        <span>AB</span>
                      </div>
                      <div className="user-info">
                        <span className="lead-text">Nombre del Usuario</span>
                        <span className="sub-text">Rol del usuario</span>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-inner user-account-info">
                    <h6 className="overline-title-alt">Folios Indexados</h6>
                    <div className="user-balance">1,494</div>
                    <div className="user-balance-sub">Folios por indexar <span>15,495</span></div>
                    
                  </div>
                  <div className="dropdown-inner">
                    <ul className="link-list">
                      <li><a href="html/user-profile-regular.html"><em className="icon ni ni-user-alt" /><span>Administrar Usuario</span></a></li>
                      <li><a className="dark-mode-switch" href="#"><em className="icon ni ni-signout" /><span>Salir</span></a></li>
                    </ul>
                  </div>
                </div>
              </li>{/* .dropdown */}
            </ul>{/* .nk-quick-nav */}
          </div>{/* .nk-header-tools */}
        </div>{/* .nk-header-wrap */}
      </div>{/* .container-fliud */}
    </div>
  )
}
