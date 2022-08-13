import React from 'react';
import Button from 'react-bootstrap/Button';
import { Route, Routes, useNavigate } from 'react-router-dom';
import CategoryAllocation from '../components/costestimatation/CategoryAllocation';
import EstimationSummary from '../components/costestimatation/EstimationSummary';
import FunctionalDecomposition from '../components/costestimatation/FunctionalDecomposition';

function AuthRoute() {
 // eslint-disable-next-line no-unused-vars
 const navigate = useNavigate();

 return (
  <div>
   <Button onClick={() => navigate(`/estimate-cost/summary`, { replace: false })}>Summary</Button>
   <Button onClick={() => navigate(`/estimate-cost/allocate`, { replace: false })}>Allocate</Button>
   <Button onClick={() => navigate(`/estimate-cost/decompose`, { replace: false })}>
    Decompose
   </Button>
   <Routes>
    <Route path="summary/" element={<EstimationSummary />} />
    <Route path="allocate/" element={<CategoryAllocation />} />
    <Route path="allocate/:categoryid/details/" element={<CategoryAllocation />} />
    <Route path="decompose/" element={<FunctionalDecomposition />} />
   </Routes>
  </div>
 );
}

export default AuthRoute;
