import Button from 'react-bootstrap/Button';

function MakeEstimation({ setStep }) {
 return (
  <div>
   <h4>Make Estimation</h4>
   <Button onClick={() => setStep(5)}>Continue</Button>
   <Button onClick={() => setStep(3)}>Back</Button>
  </div>
 );
}

export default MakeEstimation;
