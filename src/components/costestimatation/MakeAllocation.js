/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import fetchBackendJSON from '../../actions/Fetch';

// need budget, already_allocated,
// new field : new allocation

function MakeAllocation({ setStep, categories }) {
 const [categoryid, setCategoryid] = useState('NoCat');
 const [category, setCategory] = useState({ id: 1, budget: 50000, allocated: 10000 });
 const [allocation, setAllocation] = useState('');

 useEffect(() => {
  // let fetchedData;
  console.log(category);
  async function fetchData() {
   // fetchedData = await fetchBackendJSON(`costEstm/getCategoryData/${categoryid}`, 'GET', {});
   // console.log(fetchedData);
   // setCategory(() => {
   //  const newCat = JSON.parse(JSON.stringify(fetchedData.data));
   //  return newCat;
   // });
  }
  if (categoryid !== 'NoCat') fetchData();
 }, [categoryid]);

 return (
  <div>
   <h2 align="center" style={{ color: 'green' }}>
    <strong>Make Allocation</strong>
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

   {category != null && (
    <Form className="row">
     <Form.Group className="mb-3 col-md-6">
      <Form.Label>
       <strong>Budget</strong>
      </Form.Label>
      <Form.Control type="text" value={category.budget} placeholder="Budget" disabled />
     </Form.Group>

     <Form.Group className="mb-3 col-md-6">
      <Form.Label>
       <strong>Already Allocated</strong>
      </Form.Label>
      <Form.Control type="text" value={category.allocated} placeholder="Budget" disabled />
     </Form.Group>

     <Form.Group className="mb-3">
      <Form.Label>
       <strong>New Allocation</strong>
      </Form.Label>
      <Form.Control
       type="text"
       value={allocation}
       onChange={(e) => setAllocation(e.target.value)}
       placeholder="Budget"
      />
     </Form.Group>
    </Form>
   )}

   <div className="alignCenter">
    <Button className="m-1" onClick={() => setStep(5)}>
     Back
    </Button>
    <Button className="m-1">Save</Button>
    <Button className="m-1" onClick={() => setStep(7)}>
     Continue
    </Button>
   </div>
  </div>
 );
}

export default MakeAllocation;
