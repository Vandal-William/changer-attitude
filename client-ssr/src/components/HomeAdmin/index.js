import React from 'react';
import './styles.scss';

import NavAdmin from '../NavAdmin';

function HomeAdmin() {
  return (
    <div className='home-admin'>
        <NavAdmin/>
        <div className='home-admin-content'>
          <h1>HomeAdmin</h1>
        </div>
    </div>
  );
}

export default HomeAdmin;