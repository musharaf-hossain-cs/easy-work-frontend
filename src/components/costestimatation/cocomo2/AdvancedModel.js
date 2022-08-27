/* eslint-disable no-inner-declarations */
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import fetchBackendJSON from '../../../actions/Fetch';
import ResultOfCocomo2 from './ResultOfCocomo2';
import SoftwareCostDriver from './SoftwareCostDriver';
import SoftwareLaborRates from './SoftwareLaborRates';
import SoftwareScaleDriver from './SoftwareScaleDriver';
import SoftwareSize from './SoftwareSize';

function AdvancedModel({ setStep }) {
 const [laborRate, setLaborRate] = useState(null);
 const [softwareSize, setSoftwareSize] = useState(null);
 const [softwareCostDrivers, setSoftwareCostDrivers] = useState(null);
 const [softwareScaleDrivers, setSoftwareScaleDrivers] = useState(null);
 const [result, setResult] = useState(null);
 const [project, setProject] = useState({ id: 0, allocated_members: [] });
 // const [allWages, setAllWages] = useState([]);

 const categoryid = 5;

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

 useEffect(() => {
  let fetchedData;
  async function fetchData() {
   fetchedData = await fetchBackendJSON(`costEstm/getCategoryData/${categoryid}`, 'GET', {});
   console.log(fetchedData);
   setProject(() => {
    const newProj = JSON.parse(JSON.stringify(fetchedData.data));
    // newProj.allocated_members.forEach((mem, key) => {
    //  setAllWages([...allWages, { id: key, wage: mem.wage, count: mem.count }]);
    // });
    // setTotalWage(newWage);
    return newProj;
   });
  }
  if (categoryid !== 'NoCat') fetchData();
 }, [categoryid]);

 return (
  <div>
   <h2 align="center" style={{ color: 'green' }}>
    <strong>Advanced Estimation Model (Cocomo II)</strong>
   </h2>
   <hr />
   <SoftwareSize setSoftwareSize={setSoftwareSize} />
   <hr />
   <SoftwareScaleDriver setScaleDrivers={setSoftwareScaleDrivers} />
   <hr />
   <SoftwareCostDriver setCostDrivers={setSoftwareCostDrivers} />
   <hr />
   {project.allocated_members.length && (
    <>
     <SoftwareLaborRates setLaborRate={setLaborRate} allocatedMembers={project.allocated_members} />
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
    <Button className="m-2" onClick={() => setStep(11)}>
     Continue
    </Button>
   </div>
   <hr />
  </div>
 );
}

export default AdvancedModel;
