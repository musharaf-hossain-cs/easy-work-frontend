/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import fetchBackendJSON from '../../actions/Fetch';

function EmployeeWage({ setStep, categories }) {
 const { spaceid } = useParams();
 const [categoryid, setCategoryid] = useState(0);
 const [category, setCategory] = useState({ id: 0 });

 useEffect(() => {
  let fetchedData;
  async function fetchData() {
   fetchedData = await fetchBackendJSON(`costEstm/getCategoryData/${categoryid}`, 'GET', {});
   console.log(fetchedData);
   setCategory(() => {
    const newCat = JSON.parse(JSON.stringify(fetchedData.data));
    return newCat;
   });
   // setBudget(() => fetchedData.data.allocated_budget);
   // setExpectedTime(() => fetchedData.data.expected_time);
   // setManHourPerWeek(() => fetchedData.data.man_hour_per_week);
   // setMembers(() => fetchedData.data.allocated_members);
  }
  fetchData();
 }, [categoryid]);

 return (
  <div>
   <h4 className="alignCenter">Employee Wage</h4>
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
   <Button onClick={() => setStep(4)}>Continue</Button>
   <Button onClick={() => setStep(2)}>Back</Button>
  </div>
 );
}

export default EmployeeWage;
