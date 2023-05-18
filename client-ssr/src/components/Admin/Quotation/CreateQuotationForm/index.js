import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';


import NavAdmin from '../../NavAdmin';
import './styles.scss'

function CreateQuotationForm() {
  

  return (
    <div className='default-home'>
      <NavAdmin/>
      <div className='default-style'>    
        <h2 className='default-style-title'>Créer un devis</h2>


      </div>
    </div>
  );
}


 export default CreateQuotationForm;
