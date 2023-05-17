import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import './styles.scss';

import NavAdmin from '../NavAdmin';
import ContactConnect from './ContactConnect';

function Dashboard(props) {

  const { dispatch } = props;

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
      <h4 className='dashboard-parts-title'>Contacts({props.contactCount})</h4>
      <div className='dashboard-parts-content'>
        {props.contacts.map(contact => (
          <ContactConnect
          key={contact.id}
          id={contact.id}
          firstname={contact.firstname}
          lastname={contact.lastname}
          />
        ))}
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

const mapStateToProps = (state) => {
  return {
    contacts: state.contact.contact,
    contactCount: state.contact.contact.length
  };
};

export default connect(mapStateToProps)(Dashboard);
