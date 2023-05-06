import React from 'react';
import {NavLink} from 'react-router-dom'

import './styles.scss';
import logoPetit from '../../images/LogoPetit.svg';

function NavAdmin() {

  return (
    <div className='nav-admin'>

      <div className='nav-admin-content'>
        <img className='nav-admin-logo' src={logoPetit} alt="logo de changez d'attitude"/>
        <h2 className='nav-admin-title'>Changer d'attitude</h2>
      </div>

      <div className='nav-admin-div'>
        <h3 className='nav-admin-subtitle'>Gestion clients</h3>
        <ul className='nav-admin-ul'>
          <NavLink className='nav-admin-link' to=""><li className='nav-admin-li'>Voir les contacts</li></NavLink>
          <NavLink className='nav-admin-link' to=""><li className='nav-admin-li'>Gerer les rendez-vous</li></NavLink>
          <NavLink className='nav-admin-link' to=""><li className='nav-admin-li'>Gérer les contrats</li></NavLink>
          <NavLink className='nav-admin-link' to=""><li className='nav-admin-li'>Gérer les devis</li></NavLink>
        </ul>

        <h3 className='nav-admin-subtitle'>Gestion du site</h3>
        <ul className='nav-admin-ul'>
          <NavLink className='nav-admin-link' to=""><li className='nav-admin-li'>Gérer les publications</li></NavLink>
          <NavLink className='nav-admin-link' to=""><li className='nav-admin-li'>Gérer les formations</li></NavLink>
          <NavLink className='nav-admin-link' to=""><li className='nav-admin-li'>Gérer les livres</li></NavLink> 
        </ul>
        
        <h3 className='nav-admin-subtitle'>Gestion des abonnements</h3>
        <ul className='nav-admin-ul'>
          <NavLink className='nav-admin-link' to=""><li className='nav-admin-li'>Voir les abonnements en cours</li></NavLink>
        </ul>
      </div>

    </div>
  );
}

export default NavAdmin;