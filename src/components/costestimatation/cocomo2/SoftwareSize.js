import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

function SoftwareSize({ setSoftwareSize }) {
 const [newSLOC, setNewSLOC] = useState('');
 const [reusedSLOC, setReusedSLOC] = useState('');
 const [modifiedSLOC, setModifiedSLOC] = useState('');
 const [modifiedDesignModifed, setModifiedDesignModified] = useState('');
 const [modifiedCodeModified, setModifiedCodeModified] = useState('');
 const [reusedIntegrationRequired, setReusedIntegrationRequired] = useState('');
 const [modifiedIntegrationRequired, setModifiedIntegrationRequired] = useState('');
 const [reusedAssessmentAndAssimilation, setReusedAssessmentAndAssimilation] = useState('');
 const [modifiedAssessmentAndAssimilation, setModifiedAssessmentAndAssimilation] = useState('');
 const [modifiedSoftwareUnderstanding, setModifiedSoftwareUnderstanding] = useState('');
 const [modifiedUnfamiliarity, setModifiedUnfamiliarity] = useState('');

 const resetClicked = () => {
  setNewSLOC('0');
  setReusedSLOC('0');
  setModifiedSLOC('0');
  setModifiedDesignModified('0');
  setModifiedCodeModified('0');
  setReusedIntegrationRequired('0');
  setModifiedIntegrationRequired('0');
  setReusedAssessmentAndAssimilation('0');
  setModifiedAssessmentAndAssimilation('0');
  setModifiedSoftwareUnderstanding('0');
  setModifiedUnfamiliarity('0');
 };

 const saveClicked = () => {
  const data = {
   newSLOC,
   reusedSLOC,
   modifiedSLOC,
   modifiedDesignModifed,
   modifiedCodeModified,
   reusedIntegrationRequired,
   modifiedIntegrationRequired,
   reusedAssessmentAndAssimilation,
   modifiedAssessmentAndAssimilation,
   modifiedSoftwareUnderstanding,
   modifiedUnfamiliarity,
  };
  console.log(data);
  setSoftwareSize(data);
 };

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
       <Form.Control value={newSLOC} onChange={(e) => setNewSLOC(e.target.value)} />
      </td>
     </tr>

     <tr>
      <td>
       <strong>Reused</strong>
      </td>
      <td>
       <Form.Control value={reusedSLOC} onChange={(e) => setReusedSLOC(e.target.value)} />
      </td>
      <td>
       <Form.Control value="0" disabled />
      </td>
      <td>
       <Form.Control value="0" disabled />
      </td>
      <td>
       <Form.Control
        value={reusedIntegrationRequired}
        onChange={(e) => setReusedIntegrationRequired(e.target.value)}
       />
      </td>
      <td>
       <Form.Control
        value={reusedAssessmentAndAssimilation}
        onChange={(e) => setReusedAssessmentAndAssimilation(e.target.value)}
       />
      </td>
     </tr>

     <tr>
      <td>
       <strong>Modified</strong>
      </td>
      <td>
       <Form.Control value={modifiedSLOC} onChange={(e) => setModifiedSLOC(e.target.value)} />
      </td>
      <td>
       <Form.Control
        value={modifiedDesignModifed}
        onChange={(e) => setModifiedDesignModified(e.target.value)}
       />
      </td>
      <td>
       <Form.Control
        value={modifiedCodeModified}
        onChange={(e) => setModifiedCodeModified(e.target.value)}
       />
      </td>
      <td>
       <Form.Control
        value={modifiedIntegrationRequired}
        onChange={(e) => setModifiedIntegrationRequired(e.target.value)}
       />
      </td>
      <td>
       <Form.Control
        value={modifiedAssessmentAndAssimilation}
        onChange={(e) => setModifiedAssessmentAndAssimilation(e.target.value)}
       />
      </td>
      <td>
       <Form.Control
        value={modifiedSoftwareUnderstanding}
        onChange={(e) => setModifiedSoftwareUnderstanding(e.target.value)}
       />
      </td>
      <td>
       <Form.Control
        value={modifiedUnfamiliarity}
        onChange={(e) => setModifiedUnfamiliarity(e.target.value)}
       />
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

export default SoftwareSize;
