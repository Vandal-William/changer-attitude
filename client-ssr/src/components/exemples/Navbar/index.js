import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="Navbar">
     <ul>
        <li><Link to='/'>Acceuil</Link></li>
        <li><Link to='/fee'>Tarifs</Link></li>
        <li><Link to='/counter'>Compteur</Link></li>
        <li><Link to='/form'>Formulaire</Link></li>
        <li><Link to='/connect'>Test connect BDD</Link></li>
     </ul>
    </div>
  );
}

export default Navbar;