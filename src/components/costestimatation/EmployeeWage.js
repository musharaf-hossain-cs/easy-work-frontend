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
    setEffort(newCat.man_hour_per_week);
    // let newWage = 0;
    let newEffort = 0;
    // let newTotalWage = 0;
    newCat.allocated_members.forEach((mem, key) => {
     // newWage = mem.wage;
     newEffort = mem.count * mem.weekly_effort;
     setAllWages([...allWages, { id: key, wage: mem.wage }]);
     setAllEfforts([...allEfforts, { id: key, effort: newEffort }]);
     // newTotalWage += newWage;
    });
    // setTotalWage(newWage);
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
  let fetchedData;
  let data = {
   man_hour_per_week: effort,
  };

  async function updateUserTaskMap(sendData) {
   console.log('Data to update UserTaskMap: ', sendData);
   fetchedData = await fetchBackendJSON(`costEstm/updateUserTaskMap`, 'POST', data);
   console.log('updateCategory: ', fetchedData);
   if (fetchedData.success) {
    console.log('Successfully updated UserTaskMap');
   } else {
    console.log('UserTaskMap Update failed!');
   }
  }

  async function updateCategory() {
   console.log('Data to update Category: ', data);
   fetchedData = await fetchBackendJSON(`costEstm/updateFuncCat/${categoryid}`, 'PATCH', data);
   console.log('updateCategory: ', fetchedData);
   if (fetchedData.man_hour_per_week === data.man_hour_per_week) {
    const users = [];
    console.log('allocated_members: ', category.allocated_members, allEfforts, allWages);
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

    data = {
     category_id: categoryid,
     users,
    };
    updateUserTaskMap(data);
   } else {
    console.log('Category Update Failed');
   }
  }
  updateCategory();
 };

 return (
  <div>
   <h2 align="center" style={{ color: 'green' }}>
    <strong>Employee Wage Setup</strong>
   </h2>
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
      <strong> Total Effort (mh / per month)</strong>
     </Form.Label>
     <Form.Control type="text" value={effort * 4} disabled />
     {/* <Form.Control type="text" value={category.predicted_budget} disabled /> */}
    </Form.Group>

    <Form.Group className="mb-3 w-50" controlId="PredictedBudgetField">
     <Form.Label>
      <strong> Total Wage ($/month)</strong>
     </Form.Label>
     <Form.Control type="text" value={totalWage * 4} disabled />
    </Form.Group>
   </Form>
   <h3>All Posts</h3>
   {category.allocated_members.map((member, memberIdx) => (
    <PostAllocation
     id={memberIdx}
     empCount={member.count}
     prevWage={member.wage}
     prevEffort={member.weekly_effort}
     editEffort={editEffort}
     editWage={editWage}
     onlyWage={false}
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
