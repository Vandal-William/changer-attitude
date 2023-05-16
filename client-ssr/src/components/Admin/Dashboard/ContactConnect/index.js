import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function ContactConnect({id, firstname, lastname}) {

  return (
    <div className='connect'>
       <span>{firstname}</span>
       <span>{lastname}</span>
       <Link className='connect-link' to={`/contact/${id}`}>Détails</Link>
    </div>
  );
}

const mapStateToProps = (state) => ({
  contacts: state.contact.contact,
});

export default connect(mapStateToProps)(ContactConnect);
