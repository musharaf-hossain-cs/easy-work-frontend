import * as React from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';

export default function PostAllocation(props) {
 // eslint-disable-next-line no-unused-vars
 const { children, empCount, effortCal } = props;
 const [effort, setEffort] = useState(0);
 const [wage, setWage] = useState();

 const effortChange = (value) => {
  setEffort(value);
  // let oldValue = 0;
  // let newValue = 0;
  // const count = parseInt(empCount, 10);
  // setEffort((old) => {
  //  if (Number.isNaN(old) || old === undefined) oldValue = 0;
  //  else oldValue = parseInt(old, 10);
  //  return value;
  // });

  // if (Number.isNaN(value) || value === undefined) newValue = 0;
  // else newValue = parseInt(value, 10);
  // console.log(count, newValue, oldValue);
  // effortCal(count * (newValue - oldValue));
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
      placeholder="Wages per week"
      value={wage}
      onChange={(e) => setWage(e.target.value)}
      onKeyPress={(e) => {
       if (e.key === 'Enter') e.preventDefault();
      }}
     />
    </Form.Group>
   </div>
  </div>
 );
}
