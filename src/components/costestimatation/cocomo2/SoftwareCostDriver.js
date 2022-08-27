import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

const verylow = '0';
const low = '1';
const nominal = '2';

function SoftwareCostDriver({ setCostDrivers }) {
 const [requiredSoftwareReliability, setRequiredSoftwareReliability] = useState(verylow);
 const [dataBaseSize, setDataBaseSize] = useState(low);
 const [productComplexity, setProductComplexity] = useState(verylow);
 const [developedForReusability, setDevelopedForReusability] = useState(low);
 const [documentationMatchToLifecycleNeeds, setDocumentationMatchToLifeCycleNeeds] =
  useState(verylow);
 const [analystCapability, setAnalystCapability] = useState(verylow);
 const [programmerCapability, setProgrammerCapability] = useState(verylow);
 const [personnelContinuity, setPersonnelContinuity] = useState(verylow);
 const [applicationExperience, setApplicationExperience] = useState(verylow);
 const [platformExperience, setPlatformExperience] = useState(verylow);
 const [languageAndToolsetExperience, setLanguageAndToolsetExperience] = useState(verylow);
 const [timeConstraint, setTimeConstraint] = useState(nominal);
 const [storageConstraint, setStorageConstraint] = useState(nominal);
 const [platformVolatility, setPlatformVolatility] = useState(low);
 const [useOfSoftwareTools, setUseOfSoftwareTools] = useState(verylow);
 const [multisiteDevelopment, setMultisiteDevelopment] = useState(verylow);
 const [requiredDevelopmentSchedule, setRequiredDevelopmentSchedule] = useState(verylow);

 const resetClicked = () => {
  setRequiredSoftwareReliability(verylow);
  setDataBaseSize(low);
  setProductComplexity(verylow);
  setDevelopedForReusability(low);
  setDocumentationMatchToLifeCycleNeeds(verylow);

  setAnalystCapability(verylow);
  setProgrammerCapability(verylow);
  setPersonnelContinuity(verylow);
  setApplicationExperience(verylow);
  setPlatformExperience(verylow);
  setLanguageAndToolsetExperience(verylow);

  setTimeConstraint(nominal);
  setStorageConstraint(nominal);
  setPlatformVolatility(low);

  setUseOfSoftwareTools(verylow);
  setMultisiteDevelopment(verylow);
  setRequiredDevelopmentSchedule(verylow);
 };

 const saveClicked = () => {
  const data = {
   requiredSoftwareReliability,
   dataBaseSize,
   productComplexity,
   developedForReusability,
   documentationMatchToLifecycleNeeds,
   analystCapability,
   programmerCapability,
   personnelContinuity,
   applicationExperience,
   platformExperience,
   languageAndToolsetExperience,
   timeConstraint,
   storageConstraint,
   platformVolatility,
   useOfSoftwareTools,
   multisiteDevelopment,
   requiredDevelopmentSchedule,
  };
  setCostDrivers(data);
  console.log(data);
 };

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
       <Form.Select
        value={requiredSoftwareReliability}
        onChange={(e) => setRequiredSoftwareReliability(e.target.value)}
       >
        <option value="0">Very Low</option>
        <option value="1">Low</option>
        <option value="2">Nominal</option>
        <option value="3">High</option>
        <option value="4">Very High</option>
       </Form.Select>
      </td>

      <td>
       <strong>Analyst Capability</strong>
      </td>
      <td>
       <Form.Select
        value={analystCapability}
        onChange={(e) => setAnalystCapability(e.target.value)}
       >
        <option value="0">Very Low</option>
        <option value="1">Low</option>
        <option value="2">Nominal</option>
        <option value="3">High</option>
        <option value="4">Very High</option>
       </Form.Select>
      </td>

      <td>
       <strong>Time Constraint</strong>
      </td>

      <td>
       <Form.Select value={timeConstraint} onChange={(e) => setTimeConstraint(e.target.value)}>
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
       <Form.Select
        value={useOfSoftwareTools}
        onChange={(e) => setUseOfSoftwareTools(e.target.value)}
       >
        <option value="0">Very Low</option>
        <option value="1">Low</option>
        <option value="2">Nominal</option>
        <option value="3">High</option>
        <option value="4">Very High</option>
       </Form.Select>
      </td>
     </tr>

     <tr>
      <td>
       <strong>Data Base Size</strong>
      </td>
      <td>
       <Form.Select value={dataBaseSize} onChange={(e) => setDataBaseSize(e.target.value)}>
        <option value="1">Low</option>
        <option value="2">Nominal</option>
        <option value="3">High</option>
        <option value="4">Very High</option>
       </Form.Select>
      </td>

      <td>
       <strong>Programmer Capability</strong>
      </td>
      <td>
       <Form.Select
        value={programmerCapability}
        onChange={(e) => setProgrammerCapability(e.target.value)}
       >
        <option value="0">Very Low</option>
        <option value="1">Low</option>
        <option value="2">Nominal</option>
        <option value="3">High</option>
        <option value="4">Very High</option>
       </Form.Select>
      </td>

      <td>
       <strong>Storage Constraint</strong>
      </td>
      <td>
       <Form.Select
        value={storageConstraint}
        onChange={(e) => setStorageConstraint(e.target.value)}
       >
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
       <Form.Select
        value={multisiteDevelopment}
        onChange={(e) => setMultisiteDevelopment(e.target.value)}
       >
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
       <Form.Select
        value={productComplexity}
        onChange={(e) => setProductComplexity(e.target.value)}
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
       <strong>Personnel Continuity</strong>
      </td>
      <td>
       <Form.Select
        value={personnelContinuity}
        onChange={(e) => setPersonnelContinuity(e.target.value)}
       >
        <option value="0">Very Low</option>
        <option value="1">Low</option>
        <option value="2">Nominal</option>
        <option value="3">High</option>
        <option value="4">Very High</option>
       </Form.Select>
      </td>

      <td>
       <strong>Platform Volatility</strong>
      </td>
      <td>
       <Form.Select
        value={platformVolatility}
        onChange={(e) => setPlatformVolatility(e.target.value)}
       >
        <option value="1">Low</option>
        <option value="2">Nominal</option>
        <option value="3">High</option>
        <option value="4">Very High</option>
       </Form.Select>
      </td>

      <td>
       <strong>Required Development Schedule</strong>
      </td>
      <td>
       <Form.Select
        value={requiredDevelopmentSchedule}
        onChange={(e) => setRequiredDevelopmentSchedule(e.target.value)}
       >
        <option value="0">Very Low</option>
        <option value="1">Low</option>
        <option value="2">Nominal</option>
        <option value="3">High</option>
        <option value="4">Very High</option>
       </Form.Select>
      </td>
     </tr>
     <tr>
      <td>
       <strong>Developed for Reusability</strong>
      </td>
      <td>
       <Form.Select
        value={developedForReusability}
        onChange={(e) => setDevelopedForReusability(e.target.value)}
       >
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
       <Form.Select
        value={applicationExperience}
        onChange={(e) => setApplicationExperience(e.target.value)}
       >
        <option value="0">Very Low</option>
        <option value="1">Low</option>
        <option value="2">Nominal</option>
        <option value="3">High</option>
        <option value="4">Very High</option>
       </Form.Select>
      </td>
     </tr>

     <tr>
      <td>
       <strong>Documentation Match to Lifecycle Needs</strong>
      </td>
      <td>
       <Form.Select
        value={documentationMatchToLifecycleNeeds}
        onChange={(e) => setDocumentationMatchToLifeCycleNeeds(e.target.value)}
       >
        <option value="0">Very Low</option>
        <option value="1">Low</option>
        <option value="2">Nominal</option>
        <option value="3">High</option>
        <option value="4">Very High</option>
       </Form.Select>
      </td>

      <td>
       <strong>Platform Experience</strong>
      </td>
      <td>
       <Form.Select
        value={platformExperience}
        onChange={(e) => setPlatformExperience(e.target.value)}
       >
        <option value="0">Very Low</option>
        <option value="1">Low</option>
        <option value="2">Nominal</option>
        <option value="3">High</option>
        <option value="4">Very High</option>
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
       <Form.Select
        value={languageAndToolsetExperience}
        onChange={(e) => setLanguageAndToolsetExperience(e.target.value)}
       >
        <option value="0">Very Low</option>
        <option value="1">Low</option>
        <option value="2">Nominal</option>
        <option value="3">High</option>
        <option value="4">Very High</option>
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
export default SoftwareCostDriver;
