/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import fetchBackendJSON from '../../actions/Fetch';
import MakeEstimationUtil from './MakeEstimationUtil';

function MakeEstimation({ setStep, categories }) {
 const [categoryid, setCategoryid] = useState('NoCat');
 const [category, setCategory] = useState(null);
 const [miscell, setMiscell] = useState(0);

 useEffect(() => {
  let fetchedData;
  async function fetchData() {
   fetchedData = await fetchBackendJSON(`costEstm/getCategoryData/${categoryid}`, 'GET', {});
   console.log(fetchedData);
   setCategory(() => {
    const newCat = JSON.parse(JSON.stringify(fetchedData.data));
    return newCat;
   });
  }
  if (categoryid !== 'NoCat') fetchData();
 }, [categoryid]);

 const saveEstimation = () => {
  let weeklyWage = 0;
  category.allocated_members.forEach((post) => {
   weeklyWage += post.count * post.weekly_effort * post.wage;
  });
  const totalWage = Math.round(((weeklyWage * category.expected_time) / 7) * 1000) / 1000;
  const finalCost = totalWage + miscell;
  const data = {
   estimated_cost: finalCost,
   misc_cost: miscell,
  };
  let fetchedData;
  async function updateCategory() {
   console.log('Data to update Category: ', data);
   fetchedData = await fetchBackendJSON(`costEstm/updateFuncCat/${category.id}`, 'PATCH', data);
   console.log('updateCategory: ', fetchedData);
   if (fetchedData.estimated_cost === finalCost) {
    console.log('Category Update Successful');
   } else {
    console.log('Category Update Failed', fetchedData.loc, data.loc);
   }
  }
  updateCategory();
 };

 return (
  <div>
   <h2 align="center" style={{ color: 'green' }}>
    <strong>Make Estimation</strong>
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

   {categories.length > 0 && category !== null && (
    <MakeEstimationUtil category={category} setMiscell={setMiscell} />
   )}

   <div className="alignCenter">
    <Button className="m-1" onClick={() => setStep(3)}>
     Back
    </Button>
    <Button className="m-1" onClick={saveEstimation}>
     Save
    </Button>
    <Button className="m-1" onClick={() => setStep(5)}>
     Continue
    </Button>
   </div>
  </div>
 );
}

export default MakeEstimation;
