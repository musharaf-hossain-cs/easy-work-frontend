import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

function AuthRoute() {
 return (
  <>
   <SignIn />
   <Routes>
    <Route path="signin" element={<SignIn />} />
    <Route path="signup" element={<SignUp />} />
   </Routes>
  </>
 );
}

export default AuthRoute;
