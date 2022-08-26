// import { useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import LocCard from './LocCard';

// const formData = [];

function LocEstimation({ categories, setStep }) {
 // useEffect(() => {
 //  groups.forEach((group) => {
 //   formData.push({
 //    id: group.id,
 //    loc: '',
 //    cost: '',
 //    locPm: '',
 //   });
 //  });
 // }, []);

 // const locSet = (idx, value) => {
 //  console.log('locset: ', value);
 //  formData[idx].loc = value;
 //  console.log('locset: ', formData[idx].loc);
 // };

 // const costSet = (idx, value) => {
 //  formData[idx].cost = value;
 // };

 // const locPmSet = (idx, value) => {
 //  formData[idx].locPm = value;
 // };

 return (
  <div className="container">
   <h2 className="alignCenter">LOC Estimate</h2>
   {categories.map(
    (category, grpI) =>
     category.title !== 'Unlisted' && (
      <>
       <LocCard
        key={grpI}
        category={category}
        // grpI={grpI}
        // locSet={locSet}
        // costSet={costSet}
        // locPmSet={locPmSet}
       />
       <hr />
      </>
     )
   )}
   <div className="row">
    <div className="col-6">
     <Button variant="success" onClick={() => setStep(1)} className="m-1 w-100">
      Back
     </Button>
    </div>

    <div className="col-6">
     <Button variant="success" onClick={() => setStep(3)} className="m-1 w-100">
      Continue
     </Button>
    </div>
   </div>
   <hr />
  </div>
 );
}

export default LocEstimation;
