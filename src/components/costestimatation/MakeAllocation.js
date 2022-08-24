import Button from 'react-bootstrap/Button';

function MakeAllocation({ setStep }) {
 return (
  <div>
   <h4>Make Allocation</h4>
   <Button onClick={() => setStep(7)}>Continue</Button>
   <Button onClick={() => setStep(5)}>Back</Button>
  </div>
 );
}

export default MakeAllocation;
