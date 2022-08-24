import Button from 'react-bootstrap/Button';

function VisualizeEstimation({ setStep }) {
 return (
  <div>
   <h4>Visualize Estimation</h4>
   <Button onClick={() => setStep(6)}>Continue</Button>
   <Button onClick={() => setStep(4)}>Back</Button>
  </div>
 );
}

export default VisualizeEstimation;
