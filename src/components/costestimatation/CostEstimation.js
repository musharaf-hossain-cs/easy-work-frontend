/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetchBackendJSON from '../../actions/Fetch';
import ChooseEstimationModel from './ChooseEstimationModel';
import AdvancedFunctionalModel from './cocomo2/AdvancedFunctionalModel';
import AdvancedModel from './cocomo2/AdvancedModel';
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
 const [reload, setReload] = useState(true);
 const [backFromEstimation, setBackFromEstimation] = useState(3);

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
   setGroups(() => allgroups);
   setReload(false);
  }
  if (reload) fetchData();
 }, [reload]);

 return (
  <div>
   {step === 0 && <FunctionalDecomposition setReload={setReload} setStep={setStep} />}
   {step === 1 && <ChooseEstimationModel setStep={setStep} />}
   {step === 2 && <LocEstimation setStep={setStep} categories={groups} />}
   {step === 3 && (
    <EmployeeWage
     setStep={setStep}
     categories={groups}
     setBackFromEstimation={setBackFromEstimation}
    />
   )}
   {step === 4 && (
    <MakeEstimation setStep={setStep} categories={groups} backFromEstimation={backFromEstimation} />
   )}
   {step === 5 && <VisualizeEstimation setStep={setStep} categories={groups} spaceid={spaceid} />}
   {step === 6 && <MakeAllocation setStep={setStep} categories={groups} />}
   {step === 7 && <EstimationSummary setStep={setStep} categories={groups} />}

   {step === 10 && <AdvancedModel setStep={setStep} />}

   {step === 20 && (
    <AdvancedFunctionalModel
     setStep={setStep}
     categories={groups}
     setBackFromEstimation={setBackFromEstimation}
    />
   )}
  </div>
 );
}

export default CostEstimation;
