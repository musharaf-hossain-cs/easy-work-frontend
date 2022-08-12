import React from 'react';
import { Routes } from 'react-router-dom';
import DashBoard from '../components/DashBoard';

function DashBoardRoute() {
 return (
  <>
   <DashBoard />
   <Routes>
    {/* <Route path="/*" element={} />
    <Route path="/*" element={} /> */}
   </Routes>
  </>
 );
}

export default DashBoardRoute;
