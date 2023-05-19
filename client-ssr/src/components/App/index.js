import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import { useSelector } from 'react-redux';


import AdminSysConnect from '../Admin/AdminSysConnect';
import Dashboard from '../Admin/Dashboard';
import OneContactPage from '../Admin/Contact/oneContactPage'
import CreateMeetForm from '../Admin/Meet/CreateMeetForm';
import UpdateMeetForm from '../Admin/Meet/UpdateMeetForm';
import CreateQuotationForm from '../Admin/Quotation/CreateQuotationForm';
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
              <Route path='/meet/update/:contact_id/:id' element={<UpdateMeetForm />}/>
              <Route path='/quotation/create/:id' element={<CreateQuotationForm />}/>
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