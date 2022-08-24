// import { useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import LocCard from './LocCard';

// const formData = [];

function LocEstimation({ groups, setStep }) {
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

 const nextPage = () => {
  console.log('Continue button clicked');
  setStep(3);
  // console.log(formData);
 };

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
   {groups.map(
    (group, grpI) =>
     group.title !== 'Unlisted' && (
      <>
       <LocCard
        key={grpI}
        group={group}
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
    <Button variant="success" onClick={nextPage} className="col-12">
     Continue
    </Button>
   </div>
   <hr />
  </div>
 );
}

export default LocEstimation;
