import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

function SoftwareSize() {
 return (
  <div>
   <strong style={{ color: 'green' }}>Software Size</strong>
   <Table>
    <thead>
     <tr>
      <th />
      <th>SLOC</th>
      <th>% Design Modified</th>
      <th>% Code Modified</th>
      <th>% Integration Required</th>
      <th>Assessment and Assimilation (0% - 8%)</th>
      <th>Software Understanding (0% - 50%)</th>
      <th>Unfamiliarity (0-1)</th>
     </tr>
    </thead>
    <tbody>
     <tr>
      <td>
       <strong>New</strong>
      </td>
      <td>
       <Form.Control />
      </td>
     </tr>

     <tr>
      <td>
       <strong>Reused</strong>
      </td>
      <td>
       <Form.Control />
      </td>
      <td>
       <Form.Control disabled />
      </td>
      <td>
       <Form.Control disabled />
      </td>
      <td>
       <Form.Control />
      </td>
      <td>
       <Form.Control />
      </td>
     </tr>

     <tr>
      <td>
       <strong>Modified</strong>
      </td>
      <td>
       <Form.Control />
      </td>
      <td>
       <Form.Control />
      </td>
      <td>
       <Form.Control />
      </td>
      <td>
       <Form.Control />
      </td>
      <td>
       <Form.Control />
      </td>
      <td>
       <Form.Control />
      </td>
      <td>
       <Form.Control />
      </td>
     </tr>
    </tbody>
   </Table>
  </div>
 );
}

export default SoftwareSize;
