import React from 'react';
import { Routes } from 'react-router-dom';
import User from '../components/User';

function UserRoute() {
 return (
  <>
   <User />
   <Routes>
    {/* <Route path="/*" element={} />
    <Route path="/*" element={} /> */}
   </Routes>
  </>
 );
}

export default UserRoute;
