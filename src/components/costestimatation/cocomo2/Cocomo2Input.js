/* eslint-disable no-inner-declarations */
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import fetchBackendJSON from '../../../actions/Fetch';
import ResultOfCocomo2 from './ResultOfCocomo2';
import SoftwareCostDriver from './SoftwareCostDriver';
import SoftwareLaborRates from './SoftwareLaborRates';
import SoftwareScaleDriver from './SoftwareScaleDriver';
import SoftwareSize from './SoftwareSize';

function Cocomo2Input() {
 const [laborRate, setLaborRate] = useState(null);
 const [softwareSize, setSoftwareSize] = useState(null);
 const [softwareCostDrivers, setSoftwareCostDrivers] = useState(null);
 const [softwareScaleDrivers, setSoftwareScaleDrivers] = useState(null);
 const [result, setResult] = useState(null);

 const calculate = () => {
  if (
   laborRate === null ||
   softwareSize === null ||
   softwareCostDrivers === null ||
   softwareScaleDrivers === null
  ) {
   // eslint-disable-next-line no-alert
   alert('First Save all parameters');
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
   <h3 className="alignCenter">Cocomo II</h3>
   <hr />
   <SoftwareSize setSoftwareSize={setSoftwareSize} />
   <hr />
   <SoftwareScaleDriver setScaleDrivers={setSoftwareScaleDrivers} />
   <hr />
   <SoftwareCostDriver setCostDrivers={setSoftwareCostDrivers} />
   <hr />
   <SoftwareLaborRates setLaborRate={setLaborRate} />
   <hr />
   <Button variant="success" className="w-100" onClick={calculate}>
    Calculate
   </Button>
   <hr />
   {result !== null && (
    <ResultOfCocomo2 result={result} onSave={saveEstimation} onDiscard={discard} />
   )}

   <hr />
  </div>
 );
}

export default Cocomo2Input;
