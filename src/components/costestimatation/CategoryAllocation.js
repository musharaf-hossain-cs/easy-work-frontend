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

 const calculateEffort = (value) => {
  console.log(value);
 };

 const submitForm = (e) => {
  e.preventDefault();
  console.log('Submitted');
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

     <Form.Group className="mb-3 col-6" controlId="manHourPerWeekField">
      <Form.Label>Man-hour Per Week</Form.Label>
      <Form.Control type="text" placeholder="Man hour per week" value={manHourPerWeek} disabled />
     </Form.Group>

     <h3>All Posts</h3>
     {members.map((member, memberIdx) => (
      <PostAllocation key={memberIdx} empCount={member.count} effortCal={calculateEffort}>
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
