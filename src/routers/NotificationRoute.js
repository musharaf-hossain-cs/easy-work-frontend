import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Notification from '../components/Notification';

function NotificationRoute() {
 return (
  <Routes>
   <Route path="*" element={<Notification />} />
  </Routes>
 );
}

export default NotificationRoute;
