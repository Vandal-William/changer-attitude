import React from 'react';
import { Route, Routes } from 'react-router-dom';


import AdminSysConnect from '../AdminSysConnect';
import { useSelector } from 'react-redux';

function App() {
  const token = useSelector(state => state.admin.token)
  
  return (
    <>
      <main>
        <Routes>
            <Route path='/' element={<AdminSysConnect />}/>
        </Routes>
      </main>
    </>
  );
}

export default App;