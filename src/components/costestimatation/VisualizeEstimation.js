import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import BarChart from '../BarChart';

function VisualizeEstimation({ setStep, categories }) {
 const [categoryid, setCategoryid] = useState(0);
 return (
  <div>
   <h4>Visualize Estimation</h4>
   <Form>
    <Form.Select size="lg" value={categoryid} onChange={(e) => setCategoryid(e.target.value)}>
     {categories.map(
      (cat, idx) =>
       cat.title !== 'Unlisted' && (
        <option value={cat.id} key={idx}>
         {cat.title}
        </option>
       )
     )}
    </Form.Select>
   </Form>
   <BarChart />
   <Button onClick={() => setStep(6)}>Continue</Button>
   <Button onClick={() => setStep(4)}>Back</Button>
  </div>
 );
}

export default VisualizeEstimation;
