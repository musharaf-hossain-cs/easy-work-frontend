import React from 'react';
import { Routes } from 'react-router-dom';
import Notification from '../components/Notification';

function NotificationRoute() {
 return (
  <>
   <Notification />
   <Routes>
    {/* <Route path="/*" element={} />
    <Route path="/*" element={} /> */}
   </Routes>
  </>
 );
}

export default NotificationRoute;
