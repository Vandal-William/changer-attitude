import React from 'react';
import { useEffect } from 'react';
import './styles.scss';

import NavAdmin from '../NavAdmin';
import ContactConnect from './ContactConnect';
import { useDispatch, useSelector } from 'react-redux';

function Dashboard() {

  const dispatch = useDispatch()
  const contacts = useSelector(state => state.contact.contact);
  console.log(contacts)

  useEffect(() => {
    dispatch({
      type : 'FETCH_CONTACT'
    });
  }, [dispatch]);

  return (
  <div className='default-home'>
    <NavAdmin/>
    <div className='dashboard'>
      <h1 className='dashboard-title'>Dashboard</h1>
      <div className='dashboard-content'>
      <div className='dashboard-parts'>
      <h4 className='dashboard-parts-title'>Contacts({contacts.length})</h4>
      <div className='dashboard-parts-content'>
        {contacts !== undefined ? contacts.map(contact => (
          <ContactConnect
          key={contact.id}
          id={contact.id}
          firstname={contact.firstname}
          lastname={contact.lastname}
          />
        )) : 'Loading'}
      </div>
    </div>
    <div className='dashboard-parts'>
      <h4 className='dashboard-parts-title'>Rendez-vous</h4>
      <div className='dashboard-parts-content'></div>
    </div>
    <div className='dashboard-parts'>
      <h4 className='dashboard-parts-title'>Prélèvements</h4>
      <div className='dashboard-parts-content'></div>
      </div>
    <div className='dashboard-parts'>
      <h4 className='dashboard-parts-title'>Abonnements</h4>
      <div className='dashboard-parts-content'></div>
      </div>
    </div>
    </div>
  </div>
  );
}


export default Dashboard;
