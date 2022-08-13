import React from 'react';
import Button from 'react-bootstrap/Button';
import { Route, Routes, useNavigate } from 'react-router-dom';
import CategoryAllocation from '../components/costestimatation/CategoryAllocation';
import EstimationSummary from '../components/costestimatation/EstimationSummary';
import FunctionalDecomposition from '../components/costestimatation/FunctionalDecomposition';

function AuthRoute() {
 // eslint-disable-next-line no-unused-vars
 const navigate = useNavigate();
 const spaceid = 1;

 return (
  <div>
   <Button onClick={() => navigate(`/estimate-cost/${spaceid}/summary`, { replace: false })}>
    Summary
   </Button>
   <Button onClick={() => navigate(`/estimate-cost/${spaceid}/allocate`, { replace: false })}>
    Allocate
   </Button>
   <Button onClick={() => navigate(`/estimate-cost/${spaceid}/decompose`, { replace: false })}>
    Decompose
   </Button>
   <Routes>
    <Route path=":spaceid/summary/" element={<EstimationSummary />} />
    <Route path=":spaceid/allocate/" element={<CategoryAllocation />} />
    <Route path=":spaceid/allocate/:categoryid/details/" element={<CategoryAllocation />} />
    <Route path=":spaceid/decompose/" element={<FunctionalDecomposition />} />
   </Routes>
  </div>
 );
}

export default AuthRoute;
