import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EditProfile from '../components/users/EditProfile';
import UserProfile from '../components/users/UserProfile';

function UserRoute() {
 return (
  <Routes>
   <Route path="*" element={<UserProfile />} />
   <Route path=":userid/view-profile/*" element={<UserProfile />} />
   <Route path="edit-profile/:userid/*" element={<EditProfile />} />
  </Routes>
 );
}

export default UserRoute;
