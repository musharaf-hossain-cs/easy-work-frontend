/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetchBackendJSON from '../../actions/Fetch';
import ChooseEstimationModel from './ChooseEstimationModel';
import EmployeeWage from './EmployeeWage';
import EstimationSummary from './EstimationSummary';
import FunctionalDecomposition from './FunctionalDecomposition';
import LocEstimation from './LocEstimation';
import MakeAllocation from './MakeAllocation';
import MakeEstimation from './MakeEstimation';
import VisualizeEstimation from './VisualizeEstimation';

function CostEstimation() {
 const [groups, setGroups] = useState([{ title: 'Unlisted', tasks: [] }]);
 // eslint-disable-next-line no-unused-vars
 const [step, setStep] = useState(0);

 const { spaceid } = useParams();

 useEffect(() => {
  let fetchedData;
  async function fetchData() {
   fetchedData = await fetchBackendJSON(
    `costEstm/getAllCategoryWithTaskName/${spaceid}`,
    'GET',
    {}
   );
   console.log(fetchedData.data);
   const allgroups = [];
   fetchedData.data.forEach((cat) => {
    allgroups.push(cat);
   });
   setGroups(allgroups);
  }
  fetchData();
 }, []);

 return (
  <div>
   {step === 0 && <FunctionalDecomposition ExistingGroups={groups} setStep={setStep} />}
   {step === 1 && <ChooseEstimationModel setStep={setStep} />}
   {step === 2 && <LocEstimation setStep={setStep} categories={groups} />}
   {step === 3 && <EmployeeWage setStep={setStep} categories={groups} />}
   {step === 4 && <MakeEstimation setStep={setStep} categories={groups} />}
   {step === 5 && <VisualizeEstimation setStep={setStep} categories={groups} />}
   {step === 6 && <MakeAllocation setStep={setStep} categories={groups} />}
   {step === 7 && <EstimationSummary setStep={setStep} categories={groups} />}
  </div>
 );
}

export default CostEstimation;
