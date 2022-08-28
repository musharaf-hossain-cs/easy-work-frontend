import { useState } from 'react';
import Form from 'react-bootstrap/Form';

function EmployeeWage({ afterChoice, projects }) {
 const [spaceid, setSpaceid] = useState('NoProj');

 const newProjectChosen = (proj) => {
  setSpaceid(proj);
  afterChoice(proj);
 };

 return (
  <div>
   <h2 align="center" style={{ color: 'green' }}>
    <strong>Choose a Project</strong>
   </h2>
   <Form>
    <Form.Group className="mb-3">
     <Form.Label>
      <strong> Select a Projcet</strong>
     </Form.Label>
     <Form.Select size="lg" value={spaceid} onChange={(e) => newProjectChosen(e.target.value)}>
      <option value="NoProj">Select Project</option>
      {projects !== null &&
       projects !== undefined &&
       projects.map((proj, idx) => (
        <option value={proj.id} key={idx}>
         {proj.title}
        </option>
       ))}
     </Form.Select>
    </Form.Group>
   </Form>
  </div>
 );
}

export default EmployeeWage;
