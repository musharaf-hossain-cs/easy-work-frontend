import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

function SoftwareCostDriver() {
 return (
  <div>
   <strong style={{ color: 'green' }}>Software Cost Driver</strong>
   <Table>
    <thead>
     <tr className="alignCenter">
      <th colSpan={2}>Product</th>
      <th colSpan={2}>Personnel</th>
      <th colSpan={2}>Platform</th>
      <th colSpan={2}>Project</th>
     </tr>
    </thead>

    <tbody>
     <tr>
      <td>
       <strong>Required Software Reliability</strong>
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
       <strong>Analyst Capability</strong>
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
       <strong>Time Constraint</strong>
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
       <strong>Use of Software Tools</strong>
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
       <strong>Data Base Size</strong>
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
       <strong>Programmer Capability</strong>
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
       <strong>Storage Constraint</strong>
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
       <strong>Multisite Development</strong>
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
       <strong>Product Complexity</strong>
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
       <strong>Personnel Continuity</strong>
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
       <strong>Platform Volatility</strong>
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
       <strong>Required Development Schedule</strong>
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
       <strong>Developed for Reusability</strong>
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
       <strong>Application Experience</strong>
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
       <strong>Documentation Match to Lifecycle Needs</strong>
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
       <strong>Platform Experience</strong>
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
      <td />
      <td />

      <td>
       <strong>Language and Toolset Experience</strong>
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
export default SoftwareCostDriver;
