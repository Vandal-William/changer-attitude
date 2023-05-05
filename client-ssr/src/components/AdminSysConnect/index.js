import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './styles.scss'

function AdminSysConnect() {
  const dispatch = useDispatch();
  const error = useSelector(state => state.admin.error);
  console.log(error)

  const handleSubmit = (e) => {

    e.preventDefault();

  const admin_connect = {
    username: e.target.username.value,
    password: e.target.password.value,
  };

  dispatch({ type: 'GET_USER', payload: admin_connect });

  }
  return (
    <>
    <form className='admin-connect' onSubmit={handleSubmit}>
      <input className='admin-connect-input' type="text" name="username" placeholder="nom d'utilisateur"/>
      <input className='admin-connect-input' type="password" name="password" placeholder="mot de passe"/>
      <button className='admin-connect-submit'>Se connecter</button>
    </form>
    <p>{error}</p>
    </>
  );
}

export default AdminSysConnect;