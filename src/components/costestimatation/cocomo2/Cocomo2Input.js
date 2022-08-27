import Button from 'react-bootstrap/Button';
import SoftwareCostDriver from './SoftwareCostDriver';
import SoftwareLaborRates from './SoftwareLaborRates';
import SoftwareScaleDriver from './SoftwareScaleDriver';
import SoftwareSize from './SoftwareSize';

function Cocomo2Input() {
 return (
  <div>
   <h3 className="alignCenter">Cocomo II</h3>
   <hr />
   <SoftwareSize />
   <hr />
   <SoftwareScaleDriver />
   <hr />
   <SoftwareCostDriver />
   <hr />
   <SoftwareLaborRates />
   <hr />
   <Button variant="success" className="w-100">
    Calculate
   </Button>
   <hr />
  </div>
 );
}

export default Cocomo2Input;
