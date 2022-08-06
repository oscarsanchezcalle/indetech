import React from 'react'

export const Footer = () => {
  return (
     <div className="nk-footer nk-footer-fluid bg-lighter">
     <div className="container-xl">
       <div className="nk-footer-wrap">
         <div className="nk-footer-copyright"> © {new Date().getFullYear()}  Indetech. por <a target="_blank" href="https://protechingenieria.com/">Protech Ingeniería</a>
         </div>
         <div className="nk-footer-links">
           <ul className="nav nav-sm">
             <li className="nav-item">
               <div className="nav-link">Software de Indexación Documental</div>
             </li>
           </ul>
         </div>
       </div>
     </div>
   </div>
  )
}
