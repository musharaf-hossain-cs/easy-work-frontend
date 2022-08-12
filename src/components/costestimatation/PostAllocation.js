import * as React from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';

export default function PostAllocation(props) {
 const { children } = props;
 const [count, setCount] = useState();
 const [effort, setEffort] = useState();
 const [wage, setWage] = useState();
 return (
  <div>
   <div className={['mycontainer', 'container', 'row'].join(' ')}>
    <b className="mb-3 col-3">{children}</b>
    <Form.Group className="mb-3 col-3" controlId="countField">
     <Form.Control
      type="text"
      placeholder="Numbers"
      value={count}
      onChange={(e) => setCount(e.target.value)}
      onKeyPress={(e) => {
       if (e.key === 'Enter') e.preventDefault();
      }}
     />
    </Form.Group>
    <Form.Group className="mb-3 col-3" controlId="effortField">
     <Form.Control
      type="text"
      placeholder="Weekly Effort"
      value={effort}
      onChange={(e) => setEffort(e.target.value)}
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
