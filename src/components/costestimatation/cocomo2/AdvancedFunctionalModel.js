/* eslint-disable no-inner-declarations */
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import fetchBackendJSON from '../../../actions/Fetch';
import ResultOfCocomo2 from './ResultOfCocomo2';
import SoftwareCostDriver from './SoftwareCostDriver';
import SoftwareLaborRates from './SoftwareLaborRates';
import SoftwareScaleDriver from './SoftwareScaleDriver';
import SoftwareSize from './SoftwareSize';

function AdvancedFunctionalModel({ setStep, categories }) {
 const [laborRate, setLaborRate] = useState(null);
 const [softwareSize, setSoftwareSize] = useState(null);
 const [softwareCostDrivers, setSoftwareCostDrivers] = useState(null);
 const [softwareScaleDrivers, setSoftwareScaleDrivers] = useState(null);
 const [result, setResult] = useState(null);
 const [categoryid, setCategoryid] = useState('NoCat');
 const [category, setCategory] = useState({ id: 0, allocated_members: [] });
 // const [allWages, setAllWages] = useState([]);

 useEffect(() => {
  let fetchedData;
  async function fetchData() {
   fetchedData = await fetchBackendJSON(`costEstm/getCategoryData/${categoryid}`, 'GET', {});
   console.log(fetchedData);
   setCategory(() => {
    const newCat = JSON.parse(JSON.stringify(fetchedData.data));
    // newCat.allocated_members.forEach((mem, key) => {
    //  setAllWages([...allWages, { id: key, wage: mem.wage, count: mem.count }]);
    // });
    return newCat;
   });
  }
  if (categoryid !== 'NoCat') fetchData();
 }, [categoryid]);

 const calculate = () => {
  if (
   laborRate === null ||
   softwareSize === null ||
   softwareCostDrivers === null ||
   softwareScaleDrivers === null
  ) {
   // eslint-disable-next-line no-alert
   alert('All the parameter box has not been fulfilled');
  } else {
   setResult(null);
   const data = {
    laborRate,
    ...softwareSize,
    ...softwareCostDrivers,
    ...softwareScaleDrivers,
   };

   console.log('Cocomo2 Data: ', data);
   let fetchedData;
   async function sendData() {
    fetchedData = await fetchBackendJSON(`costEstm/calculateCostAdvanced`, 'POST', data);
    console.log(fetchedData);
    if (fetchedData.success) {
     setResult({
      devCost: fetchedData.devCost,
      time: fetchedData.time,
      effort: fetchedData.effort,
     });
    } else {
     console.log('Send data failed in cocomo2');
    }
   }
   sendData();
  }

  // calculateCostAdvanced
 };

 const discard = () => {
  setResult(null);
 };

 const saveEstimation = () => {
  console.log('Saving the result', result);
 };

 return (
  <div>
   <h2 align="center" style={{ color: 'green' }}>
    <strong>Advanced Functional Estimation Model</strong>
   </h2>
   <Form>
    <Form.Group className="mb-3">
     <Form.Label>
      <strong> Select a Category</strong>
     </Form.Label>
     <Form.Select size="lg" value={categoryid} onChange={(e) => setCategoryid(e.target.value)}>
      <option value="NoCat">Select Category</option>
      {categories.map(
       (cat, idx) =>
        cat.title !== 'Unlisted' && (
         <option value={cat.id} key={idx}>
          {cat.title}
         </option>
        )
      )}
     </Form.Select>
    </Form.Group>
   </Form>
   <hr />
   <SoftwareSize setSoftwareSize={setSoftwareSize} />
   <hr />
   <SoftwareScaleDriver setScaleDrivers={setSoftwareScaleDrivers} />
   <hr />
   <SoftwareCostDriver setCostDrivers={setSoftwareCostDrivers} />
   <hr />
   {category.allocated_members.length > 0 && (
    <>
     <SoftwareLaborRates
      setLaborRate={setLaborRate}
      allocatedMembers={category.allocated_members}
     />
     <hr />
    </>
   )}
   <Button variant="success" className="w-100" onClick={calculate}>
    Calculate
   </Button>
   <hr />
   {result !== null && (
    <ResultOfCocomo2 result={result} onSave={saveEstimation} onDiscard={discard} />
   )}
   <hr />

   <div className="w-100 alignCenter">
    <Button className="m-2" onClick={() => setStep(1)}>
     Back
    </Button>
    <Button className="m-2" onClick={() => setStep(21)}>
     Continue
    </Button>
   </div>
  </div>
 );
}

export default AdvancedFunctionalModel;
