import * as React from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';

export default function PostAllocation(props) {
 // eslint-disable-next-line no-unused-vars
 const { children, empCount, editEffort, editWage, id } = props;
 const [effort, setEffort] = useState();
 const [wage, setWage] = useState();

 const effortChange = (value) => {
  setEffort(value);
  editEffort(id, value, empCount);
 };

 const wageChange = (value) => {
  setWage(value);
  editWage(id, value);
 };

 return (
  <div>
   <div className={['mycontainer', 'container', 'row'].join(' ')}>
    <b className="mb-3 col-3">{children}</b>
    <Form.Group className="mb-3 col-3" controlId="countField">
     <Form.Control
      type="number"
      placeholder="Numbers"
      value={empCount}
      disabled
      // onChange={(e) => setCount(e.target.value)}
      // onKeyPress={(e) => {
      //  if (e.key === 'Enter') e.preventDefault();
      // }}
     />
    </Form.Group>
    <Form.Group className="mb-3 col-3" controlId="effortField">
     <Form.Control
      type="text"
      placeholder="Weekly Effort"
      value={effort}
      onChange={(e) => effortChange(e.target.value)}
      onKeyPress={(e) => {
       if (e.key === 'Enter') e.preventDefault();
      }}
     />
    </Form.Group>
    <Form.Group className="mb-3 col-3" controlId="wageField">
     <Form.Control
      type="text"
      placeholder="Wage per hour"
      value={wage}
      onChange={(e) => wageChange(e.target.value)}
      onKeyPress={(e) => {
       if (e.key === 'Enter') e.preventDefault();
      }}
     />
    </Form.Group>
   </div>
  </div>
 );
}
