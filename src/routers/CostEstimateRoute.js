import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Route, Routes, useNavigate } from 'react-router-dom';
import CategoryAllocation from '../components/costestimatation/CategoryAllocation';
import CostEstimation from '../components/costestimatation/CostEstimation';
import EstimationSummary from '../components/costestimatation/EstimationSummary';

function AuthRoute() {
 // eslint-disable-next-line no-unused-vars
 const navigate = useNavigate();
 const spaceid = 1;

 return (
  <div>
   <ButtonGroup>
    <Button
     variant="success"
     style={{ margin: '5px' }}
     onClick={() => {
      window.location.reload(true);
      // navigate(`/estimate-cost/${spaceid}/estimate`, { replace: false });
     }}
    >
     Reload
    </Button>
    <Button
     variant="success"
     style={{ margin: '5px' }}
     onClick={() => navigate(`/estimate-cost/${spaceid}/estimate`, { replace: false })}
    >
     Estimate
    </Button>
    <Button
     variant="success"
     style={{ margin: '5px' }}
     onClick={() => navigate(`/estimate-cost/${spaceid}/summary`, { replace: false })}
    >
     Summary
    </Button>
    <Button
     variant="success"
     style={{ margin: '5px' }}
     onClick={() => navigate(`/estimate-cost/${spaceid}/allocate`, { replace: false })}
    >
     Allocate
    </Button>
   </ButtonGroup>
   <Routes>
    <Route path=":spaceid/estimate/" element={<CostEstimation />} />
    <Route path=":spaceid/summary/" element={<EstimationSummary />} />
    <Route path=":spaceid/allocate/" element={<CategoryAllocation />} />
    <Route path=":spaceid/allocate/:categoryid/details/" element={<CategoryAllocation />} />
   </Routes>
  </div>
 );
}

export default AuthRoute;
