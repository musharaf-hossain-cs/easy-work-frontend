import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

function SoftwareLaborRates({ setLaborRate }) {
 const [rate, setRate] = useState('');

 return (
  <div className="row">
   <strong style={{ color: 'green' }}>Software Labor Rates</strong>
   <div className="col-md-6 col-lg-4">
    <Table>
     <tbody>
      <tr>
       <td>
        <strong>Cost per Person-Month ($)</strong>
       </td>
       <td>
        <Form.Control type="text" value={rate} onChange={(e) => setRate(e.target.value)} />
       </td>
      </tr>
     </tbody>
    </Table>
   </div>
   <div className="col-4">
    <Button className="m-1" variant="outline-success" onClick={() => setLaborRate(rate)}>
     Save
    </Button>
   </div>
  </div>
 );
}

export default SoftwareLaborRates;
