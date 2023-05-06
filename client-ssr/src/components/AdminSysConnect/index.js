import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import './styles.scss';
import logo from '../../images/Logo.svg';

function AdminSysConnect() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(state => state.admin.error);
  const token = useSelector(state => state.admin.token);

  if (token !== ""){
    navigate("/home-admin");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  const admin_connect = {
    username: e.target.username.value,
    password: e.target.password.value,
  };
  dispatch({ type: 'GET_USER', payload: admin_connect });
  }

  return (
    <div className='admin'>
      <form className='admin-connect' onSubmit={handleSubmit}>
        <div className='admin-connect-head'>
          <img className='admin-connect-logo'src={logo} alt="logo changez d'attitude"/>
          <h1 className='admin-connect-title' >Changez d'attitude</h1>
        </div>
        <input className='admin-connect-input' type="text" name="username" placeholder="nom d'utilisateur"/>
        <input className='admin-connect-input' type="password" name="password" placeholder="mot de passe"/>
        <button className='admin-connect-submit'>Se connecter</button>
        <p className='admin-connect-error'>{error}</p>
      </form>
    </div>
  );
}

export default AdminSysConnect;