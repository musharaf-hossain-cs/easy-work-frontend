/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import fetchBackendJSON from '../../actions/Fetch';

function MakeEstimationUtil({ category }) {
 const [miscellaneousCost, setMiscellaneousCost] = useState([]);
 const [weeklyWage, setWeeklyWage] = useState(0);
 const [totalMiscell, setTotalMiscell] = useState(0);

 const addMiscellaneousClicked = () => {
  setMiscellaneousCost((old) => {
   const newList = JSON.parse(JSON.stringify(old));
   newList.push({
    type: '',
    cost: '',
   });
   return newList;
  });
 };

 useEffect(() => {
  if (category === null) {
   setWeeklyWage(0);
  } else {
   let value = 0;
   category.allocated_members.forEach((post) => {
    value += post.count * post.weekly_effort * post.wage;
   });
   setWeeklyWage(category.allocated_members.length ? value : 0);
  }
 }, []);

 const calculateTotalMiscell = (newCosts) => {
  let value;
  let total = 0;
  newCosts.forEach((mis) => {
   value = 0;
   if (!(Number.isNaN(mis.cost) || mis.cost === undefined || mis.cost === '')) {
    value = parseInt(mis.cost, 10);
   } else {
    console.log('undefined or NaN');
   }
   total += value;
   console.log('total: ', total);
  });
  setTotalMiscell(() => total);
 };

 const editCost = (idx, value) => {
  setMiscellaneousCost((old) => {
   const newCosts = JSON.parse(JSON.stringify(old));
   newCosts[idx].cost = value;
   calculateTotalMiscell(newCosts);
   return newCosts;
  });
 };

 const editType = (idx, value) => {
  setMiscellaneousCost((old) => {
   const newCosts = JSON.parse(JSON.stringify(old));
   newCosts[idx].type = value;
   return newCosts;
  });
 };

 return (
  <div>
   {category !== null && (
    <>
     <Form className="row">
      <Form.Group className="mb-3 col-lg-4 col-md-6">
       <Form.Label>
        <strong>Wage per Week</strong>
       </Form.Label>
       <Form.Control type="text" value={weeklyWage} placeholder="Wage per Week" disabled />
      </Form.Group>

      <Form.Group className="mb-3 col-lg-4 col-md-6">
       <Form.Label>
        <strong>Estimated Time</strong>
       </Form.Label>
       <Form.Control
        type="text"
        value={category.expected_time}
        placeholder="Expected Time (in week)"
        disabled
       />
      </Form.Group>

      <Form.Group className="mb-3 col-lg-4 col-md-6">
       <Form.Label>
        <strong>Predicted Budget</strong>
       </Form.Label>
       <Form.Control
        type="text"
        value={category.estimated_cost}
        placeholder="Predicted Budget"
        disabled
       />
      </Form.Group>

      <Form.Group className="mb-3 col-lg-4 col-md-6">
       <Form.Label>
        <strong>Total Wage</strong>
       </Form.Label>
       <Form.Control
        type="text"
        value={weeklyWage * category.expected_time}
        placeholder="Total Wage"
        disabled
       />
      </Form.Group>

      <Form.Group className="mb-3 col-lg-4 col-md-6">
       <Form.Label>
        <strong>Total Miscellaneous Costs</strong>
       </Form.Label>
       <Form.Control
        type="text"
        value={totalMiscell}
        placeholder="Total Miscellaneous Costs"
        disabled
       />
      </Form.Group>

      <Form.Group className="mb-3 col-lg-4 col-md-6">
       <Form.Label>
        <strong>Final Budget</strong>
       </Form.Label>
       <Form.Control
        type="text"
        value={weeklyWage * category.expected_time + totalMiscell}
        placeholder="Final Budget"
        disabled
       />
      </Form.Group>

      <strong>Miscellaneous Costs:</strong>
      {miscellaneousCost.length > 0 && (
       <div className="col-12 row">
        <strong className="col-6 alignCenter">Cost Field</strong>
        <strong className="col-6 alignCenter">Cost</strong>
       </div>
      )}

      {miscellaneousCost.map((mis, idx) => (
       <>
        <Form.Group className="mb-3 col-md-6">
         <Form.Control
          type="text"
          value={mis.type}
          placeholder="Enter Cost Field"
          onChange={(e) => editType(idx, e.target.value)}
         />
        </Form.Group>

        <Form.Group className="mb-3 col-md-6">
         <Form.Control
          type="text"
          value={mis.cost}
          placeholder="Enter Cost"
          onChange={(e) => editCost(idx, e.target.value)}
         />
        </Form.Group>
       </>
      ))}
     </Form>

     <div className="move-right cursor-pointer">
      <Button variant="light" size="sm" onClick={addMiscellaneousClicked}>
       Add Miscellaneous Cost
      </Button>
     </div>
    </>
   )}
  </div>
 );
}

function MakeEstimation({ setStep, categories }) {
 const [categoryid, setCategoryid] = useState('NoCat');
 const [category, setCategory] = useState(null);

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

 return (
  <div>
   <h4 className="alignCenter">Make Estimation</h4>
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

   {categories.length > 0 && <MakeEstimationUtil category={category} />}

   <div className="alignCenter">
    <Button className="m-1" onClick={() => setStep(3)}>
     Back
    </Button>
    <Button className="m-1">Save</Button>
    <Button className="m-1" onClick={() => setStep(5)}>
     Continue
    </Button>
   </div>
  </div>
 );
}

export default MakeEstimation;
