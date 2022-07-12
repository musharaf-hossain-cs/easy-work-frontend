import React from 'react';
import { Routes } from 'react-router-dom';
import Home from '../components/Home';

function HomeRoute() {
 return (
  <>
   <Home />
   <Routes>
    {/* <Route path="/*" element={} />
    <Route path="/*" element={} /> */}
   </Routes>
  </>
 );
}

export default HomeRoute;
