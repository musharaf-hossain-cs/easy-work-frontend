import * as React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PostAllocation from './PostAllocation';

const categories = [
 { id: 0, title: 'Cat-A' },
 { id: 1, title: 'Cat-B' },
];

export default function CategoryAllocation() {
 const [category, setCategory] = useState();
 const [budget, setBudget] = useState();
 const [expectedTime, setExpectedTime] = useState();
 const [manHourPerWeek, setManHourPerWeek] = useState();

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
      <Form.Select
       aria-label="Select Category"
       value={category}
       onChange={(e) => setCategory(e.target.value)}
      >
       {categories.map((cat, key) => (
        <option key={key} value={cat.id}>
         {cat.title}
        </option>
       ))}
      </Form.Select>
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
      <Form.Control
       type="text"
       placeholder="Expected Time (in week)"
       value={manHourPerWeek}
       onChange={(e) => setManHourPerWeek(e.target.value)}
       onKeyPress={(e) => {
        if (e.key === 'Enter') e.preventDefault();
       }}
      />
     </Form.Group>

     <h3>All Posts</h3>

     <PostAllocation>Project Leader</PostAllocation>
     <PostAllocation>Senior Backend Developer</PostAllocation>
     <PostAllocation>Senior Frontend Developer</PostAllocation>
     <PostAllocation>Junior Backend Designer</PostAllocation>
     <PostAllocation>Junior Frontend Designer</PostAllocation>

     <Button variant="primary" type="submit" onClick={submitForm}>
      Submit
     </Button>
    </Form>
   </div>
  </div>
 );
}
