import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

function SoftwareScaleDriver({ setScaleDrivers }) {
 const [precedentedness, setPrecedentedness] = useState('0');
 const [developmentFlexibility, setDevelopmentFlexibility] = useState('0');
 const [architectureRiskResolution, setArchitectureRiskResolution] = useState('0');
 const [teamCohesion, setTeamCohesion] = useState('0');
 const [processMaturity, setProcessMaturity] = useState('0');

 const resetClicked = () => {
  setPrecedentedness('0');
  setDevelopmentFlexibility('0');
  setArchitectureRiskResolution('0');
  setTeamCohesion('0');
  setProcessMaturity('0');
 };

 const saveClicked = () => {
  const data = {
   precedentedness,
   developmentFlexibility,
   architectureRiskResolution,
   teamCohesion,
   processMaturity,
  };
  setScaleDrivers(data);
  console.log(data);
 };

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
       <Form.Select value={precedentedness} onChange={(e) => setPrecedentedness(e.target.value)}>
        <option value="0">Very Low</option>
        <option value="1">Low</option>
        <option value="2">Nominal</option>
        <option value="3">High</option>
        <option value="4">Very High</option>
        <option value="5">Extra High</option>
       </Form.Select>
      </td>

      <td>
       <strong>Architecture / Risk Resolution</strong>
      </td>
      <td>
       <Form.Select
        value={architectureRiskResolution}
        onChange={(e) => setArchitectureRiskResolution(e.target.value)}
       >
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
       <Form.Select value={processMaturity} onChange={(e) => setProcessMaturity(e.target.value)}>
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
       <Form.Select
        value={developmentFlexibility}
        onChange={(e) => setDevelopmentFlexibility(e.target.value)}
       >
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
       <Form.Select value={teamCohesion} onChange={(e) => setTeamCohesion(e.target.value)}>
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
   <div className="w-100 alignCenter">
    <ButtonGroup className="w-100">
     <Button className="m-1" variant="outline-danger" onClick={resetClicked}>
      Reset
     </Button>
     <Button className="m-1" variant="outline-success" onClick={saveClicked}>
      Save
     </Button>
    </ButtonGroup>
   </div>
  </div>
 );
}

export default SoftwareScaleDriver;
