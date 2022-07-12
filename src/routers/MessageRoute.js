import React from 'react';
import { Routes } from 'react-router-dom';
import Messages from '../components/Messages';

function MessageRoute() {
 return (
  <>
   <Messages />
   <Routes>
    {/* <Route path="/*" element={} />
    <Route path="/*" element={} /> */}
   </Routes>
  </>
 );
}

export default MessageRoute;
