import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

function SoftwareScaleDriver() {
 return (
  <div>
   <strong style={{ color: 'green' }}>Software Scale Driver</strong>
   <Table>
    <tbody>
     <tr>
      <td>
       <strong>Precedentedness</strong>
      </td>
      <td>
       <Form.Select>
        <option value="0">Very Low</option>
        <option value="1">Low</option>
        <option value="2">Nominal</option>
        <option value="3">High</option>
        <option value="4">Very High</option>
        <option value="5">Extra High</option>
       </Form.Select>
      </td>

      <td>
       <strong>Risk Resolution</strong>
      </td>
      <td>
       <Form.Select>
        <option value="0">Very Low</option>
        <option value="1">Low</option>
        <option value="2">Nominal</option>
        <option value="3">High</option>
        <option value="4">Very High</option>
        <option value="5">Extra High</option>
       </Form.Select>
      </td>

      <td>
       <strong>Process Maturity</strong>
      </td>

      <td>
       <Form.Select>
        <option value="0">Very Low</option>
        <option value="1">Low</option>
        <option value="2">Nominal</option>
        <option value="3">High</option>
        <option value="4">Very High</option>
        <option value="5">Extra High</option>
       </Form.Select>
      </td>
     </tr>

     <tr>
      <td>
       <strong>Development Flexibility</strong>
      </td>
      <td>
       <Form.Select>
        <option value="0">Very Low</option>
        <option value="1">Low</option>
        <option value="2">Nominal</option>
        <option value="3">High</option>
        <option value="4">Very High</option>
        <option value="5">Extra High</option>
       </Form.Select>
      </td>

      <td>
       <strong>Team Cohesion</strong>
      </td>
      <td>
       <Form.Select>
        <option value="0">Very Low</option>
        <option value="1">Low</option>
        <option value="2">Nominal</option>
        <option value="3">High</option>
        <option value="4">Very High</option>
        <option value="5">Extra High</option>
       </Form.Select>
      </td>
     </tr>
    </tbody>
   </Table>
  </div>
 );
}

export default SoftwareScaleDriver;
