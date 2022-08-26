import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../components/NormalUser/Dashboard/dashboard';

function NormalUserRoute() {
 return (
  <Routes>
   <Route path="*" element={<Dashboard />} />
   <Route path="dashboard/*" element={<Dashboard />} />
  </Routes>
 );
}

export default NormalUserRoute;
