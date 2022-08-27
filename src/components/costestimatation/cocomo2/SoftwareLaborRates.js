import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

function SoftwareLaborRates() {
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
        <Form.Control />
       </td>
      </tr>
     </tbody>
    </Table>
   </div>
  </div>
 );
}

export default SoftwareLaborRates;
