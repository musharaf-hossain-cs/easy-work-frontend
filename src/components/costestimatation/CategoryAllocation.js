import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import fetchBackendJSON from '../../actions/Fetch';
import PostAllocation from './PostAllocation';

export default function CategoryAllocation() {
 const [category, setCategory] = useState({ id: 0 });
 const [budget, setBudget] = useState(0);
 const [expectedTime, setExpectedTime] = useState(0);
 const [manHourPerWeek, setManHourPerWeek] = useState(0);
 const [totalWage, setTotalWage] = useState(0);

 // eslint-disable-next-line no-unused-vars
 const [allEfforts, setAllEfforts] = useState([]);
 const [allWages, setAllWages] = useState([]);

 // eslint-disable-next-line no-unused-vars
 const [members, setMembers] = useState([]);

 const { categoryid } = useParams();

 useEffect(() => {
  let fetchedData;
  async function fetchData() {
   fetchedData = await fetchBackendJSON(`costEstm/getCategoryData/${categoryid}`, 'GET', {});
   console.log(fetchedData);
   setCategory(() => {
    const newCat = JSON.parse(JSON.stringify(fetchedData.data));
    return newCat;
   });
   setBudget(() => fetchedData.data.allocated_budget);
   setExpectedTime(() => fetchedData.data.expected_time);
   setManHourPerWeek(() => fetchedData.data.man_hour_per_week);
   setMembers(() => fetchedData.data.allocated_members);
  }
  fetchData();
 }, []);

 useEffect(() => {
  let manhour = 0;
  allEfforts.forEach((val) => {
   manhour += val.effort;
  });
  setManHourPerWeek(manhour);
 }, [allEfforts]);

 useEffect(() => {
  let wage = 0;
  allWages.forEach((val) => {
   wage += val.wage;
  });
  setTotalWage(wage);
 }, [allWages]);

 // eslint-disable-next-line no-unused-vars
 const calculateEffort = (value) => {
  console.log(value);
 };

 const submitForm = (e) => {
  e.preventDefault();
  console.log('Submitted');
 };

 const editEffort = (key, v, count) => {
  let value = 0;
  if (!(Number.isNaN(v) || v === undefined)) {
   value = parseInt(v, 10);
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

 const editWage = (key, v, v2, count) => {
  let value = 0;
  let hour = 0;
  if (!(Number.isNaN(v) || v === undefined)) {
   value = parseInt(v, 10);
  }
  if (!(Number.isNaN(v2) || v2 === undefined)) {
   hour = parseInt(v2, 10);
  }
  setAllWages((old) => {
   const newList = JSON.parse(JSON.stringify(old));
   let idx = -1;
   newList.forEach((val, i) => {
    if (val.id === key) idx = i;
   });
   if (idx >= 0) {
    newList[idx].wage = value * count * hour;
   } else {
    newList.push({ id: key, wage: value * count * hour });
   }
   // console.log('wagelist', newList, key);
   return newList;
  });
 };

 return (
  <div>
   <div className={['mycontainer', 'container'].join(' ')}>
    <h1>Category Allocation</h1>
    <Form className={['row'].join(' ')}>
     <Form.Group className="mb-3 col-6" controlId="selectCategoryField">
      <Form.Label>Category </Form.Label>
      <Form.Control type="text" value={category.category_name} disabled />
     </Form.Group>

     <Form.Group className="mb-3 col-6" controlId="allocateBudgetField">
      <Form.Label>Allocate Budget</Form.Label>
      <Form.Control
       type="text"
       placeholder="Enter Budget"
       value={budget}
       onChange={(e) => setBudget(e.target.value)}
       onKeyPress={(e) => {
        if (e.key === 'Enter') e.preventDefault();
       }}
      />
     </Form.Group>

     <Form.Group className="mb-3 col-6" controlId="expectedTimeField">
      <Form.Label>Expected Time</Form.Label>
      <Form.Control
       type="text"
       placeholder="Expected Time (in week)"
       value={expectedTime}
       onChange={(e) => setExpectedTime(e.target.value)}
       onKeyPress={(e) => {
        if (e.key === 'Enter') e.preventDefault();
       }}
      />
     </Form.Group>

     <Form.Group className="mb-3 col-3" controlId="manHourPerWeekField">
      <Form.Label>Man-hour Per Week</Form.Label>
      <Form.Control type="text" placeholder="Man hour per week" value={manHourPerWeek} disabled />
     </Form.Group>
     <Form.Group className="mb-3 col-3" controlId="total Wage">
      <Form.Label>Wage per week</Form.Label>
      <Form.Control type="text" placeholder="Wage per week" value={totalWage} disabled />
     </Form.Group>

     <h3>All Posts</h3>
     {members.map((member, memberIdx) => (
      <PostAllocation
       id={memberIdx}
       empCount={member.count}
       editEffort={editEffort}
       editWage={editWage}
      >
       {member.post}
      </PostAllocation>
     ))}

     <Button variant="primary" type="submit" onClick={submitForm}>
      Submit
     </Button>
    </Form>
   </div>
  </div>
 );
}
