import React from 'react';
import Button from 'react-bootstrap/Button';
import { Route, Routes, useNavigate } from 'react-router-dom';
import CategoryAllocation from '../components/costestimatation/CategoryAllocation';
import EstimationSummary from '../components/costestimatation/EstimationSummary';

function AuthRoute() {
 // eslint-disable-next-line no-unused-vars
 const navigate = useNavigate();

 return (
  <div>
   <Button onClick={() => navigate(`/estimate-cost/summary`, { replace: false })}>Summary</Button>
   <Button onClick={() => navigate(`/estimate-cost/allocate`, { replace: false })}>Allocate</Button>
   <Routes>
    <Route path="summary/" element={<EstimationSummary />} />
    <Route path="allocate/" element={<CategoryAllocation />} />
   </Routes>
  </div>
 );
}

export default AuthRoute;
