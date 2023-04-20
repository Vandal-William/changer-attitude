import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Navbar from '../exemples/Navbar';
import Home from '../exemples/Home';
import Fee from '../exemples/Fee';
import Counter from '../exemples/Counter';
import Form from '../exemples/Form';
import Connect from '../exemples/Connect';

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/fee' element={<Fee />}/>
        <Route path='/counter' element={<Counter />}/>
        <Route path='/form' element={<Form />}/>
        <Route path='/connect' element={<Connect />}/>
        
      </Routes>
    </>
  );
}

export default App;