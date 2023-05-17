import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import { useSelector } from 'react-redux';


import AdminSysConnect from '../Admin/AdminSysConnect';
import Dashboard from '../Admin/Dashboard';
import OneContactPage from '../Admin/oneContactPage'
import CreateMeetForm from '../Admin/CreateMeetForm';
// import ErrorPage from '../Admin/ErrorPage';

function App() {

  // const token = useSelector(state => state.admin.token);
  
  return (
    <>
      <main>
        <Routes>
            <Route path='/' element={<AdminSysConnect />}/>
            {/* {token && ( */}
              <Route path='/dashboard' element={<Dashboard />}/>
              <Route path='/contact/:id' element={<OneContactPage />}/>
              <Route path='/create/meet/:id' element={<CreateMeetForm />}/>
            {/* )} */}
            {/* {!token && (
              <Route path='/dashboard' element={<ErrorPage />}/>
            )} */}
        </Routes>
      </main>
    </>
  );
}

export default App;