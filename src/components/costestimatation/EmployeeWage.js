/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import fetchBackendJSON from '../../actions/Fetch';
import PostAllocation from './PostAllocation';

function EmployeeWage({ setStep, categories }) {
 const { spaceid } = useParams();
 const [categoryid, setCategoryid] = useState('NoCat');
 const [category, setCategory] = useState({ id: 0, allocated_members: [] });
 const [effort, setEffort] = useState(0);
 const [totalWage, setTotalWage] = useState(0);

 const [allEfforts, setAllEfforts] = useState([]);
 const [allWages, setAllWages] = useState([]);

 const updateWage = () => {
  let wage = 0;
  allWages.forEach((val, idx) => {
   wage += allEfforts[idx].effort * val.wage;
   // console.log('wage and effort: ', val.wage, allEfforts[idx]);
  });
  // console.log('wage to set: ', wage);
  setTotalWage(wage);
  // console.log('total wage: ', totalWage);
 };

 useEffect(() => {
  let manhour = 0;
  allEfforts.forEach((val) => {
   manhour += val.effort;
  });
  setEffort(manhour);
  updateWage();
 }, [allEfforts]);

 useEffect(() => {
  updateWage();
 }, [allWages]);

 const editEffort = (key, v, count) => {
  let value = 0;
  console.log('check nan: ', v, count);
  if (!(Number.isNaN(v) || v === undefined || v === '')) {
   value = parseInt(v, 10);
  } else {
   console.log('undefined or NaN');
  }
  setAllEfforts((old) => {
   const newList = JSON.parse(JSON.stringify(old));
   let idx = -1;
   newList.forEach((val, i) => {
    if (val.id === key) idx = i;
   });
   if (idx >= 0) {
    newList[idx].effort = value * count;
   } else {
    newList.push({ id: key, effort: value * count });
   }
   // console.log('effortlist', newList, key);
   return newList;
  });
 };

 const editWage = (key, v) => {
  let value = 0;
  // console.log('check nan: ', v);
  if (!(Number.isNaN(v) || v === undefined || v === '')) {
   value = parseInt(v, 10);
  } else {
   console.log('undefined or NaN');
  }
  setAllWages((old) => {
   const newList = JSON.parse(JSON.stringify(old));
   let idx = -1;
   newList.forEach((val, i) => {
    if (val.id === key) idx = i;
   });
   if (idx >= 0) {
    newList[idx].wage = value;
   } else {
    newList.push({ id: key, wage: value });
   }
   // console.log('wagelist', newList);
   return newList;
  });
 };

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

 const newCategoryChosen = (cat) => {
  setCategoryid(cat);
  setAllEfforts([]);
  setAllWages([]);
 };

 const saveData = () => {
  const users = [];

  category.allocated_members.forEach((job, idx) => {
   job.users.forEach((id) => {
    const user = {
     user_id: id,
     effort: allEfforts[idx].effort / job.count,
     wage: allWages[idx].wage,
    };
    users.push(user);
   });
  });

  const data = {
   category_id: categoryid,
   total_wage_per_week: totalWage,
   total_effort_per_week: effort,
   users,
  };
  console.log('Data to save: ', data);
 };

 return (
  <div>
   <h4 className="alignCenter">Employee Wage</h4>
   <Form>
    <Form.Group className="mb-3">
     <Form.Label>
      <strong> Select a Category</strong>
     </Form.Label>
     <Form.Select size="lg" value={categoryid} onChange={(e) => newCategoryChosen(e.target.value)}>
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
   <Form className="row">
    <Form.Group className="mb-3 w-50" controlId="PredictedBudgetField">
     <Form.Label>
      <strong> Total Effort (mh/week)</strong>
     </Form.Label>
     <Form.Control type="text" value={effort} disabled />
     {/* <Form.Control type="text" value={category.predicted_budget} disabled /> */}
    </Form.Group>
    <Form.Group className="mb-3 w-50" controlId="PredictedBudgetField">
     <Form.Label>
      <strong> Total Wage ($/week)</strong>
     </Form.Label>
     <Form.Control type="text" value={totalWage} disabled />
    </Form.Group>
   </Form>
   <h3>All Posts</h3>
   {category.allocated_members.map((member, memberIdx) => (
    <PostAllocation
     id={memberIdx}
     empCount={member.count}
     editEffort={editEffort}
     editWage={editWage}
    >
     {member.post}
    </PostAllocation>
   ))}
   <div className="w-100 alignCenter">
    <Button className="m-2" onClick={() => setStep(2)}>
     Back
    </Button>
    <Button className="m-2" onClick={saveData}>
     Save
    </Button>
    <Button className="m-2" onClick={() => setStep(4)}>
     Continue
    </Button>
   </div>
  </div>
 );
}

export default EmployeeWage;
