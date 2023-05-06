import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';


import AdminSysConnect from '../AdminSysConnect';
import ErrorPage from '../ErrorPage';
import HomeAdmin from '../HomeAdmin';

function App() {

  const token = useSelector(state => state.admin.token);
  
  return (
    <>
      <main>
        <Routes>
            <Route path='/' element={<AdminSysConnect />}/>
            {/* {token && ( */}
              <Route path='/home-admin' element={<HomeAdmin />}/>
            {/* )} */}
            {/* {!token && (
              <Route path='/home-admin' element={<ErrorPage />}/>
            )} */}
        </Routes>
      </main>
    </>
  );
}

export default App;