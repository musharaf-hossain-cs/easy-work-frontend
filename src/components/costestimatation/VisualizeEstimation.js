import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import fetchBackendJSON from '../../actions/Fetch';
// eslint-disable-next-line import/no-cycle
import BarChart from './BarChart';

function VisualizeEstimation({ setStep, categories, spaceid }) {
 const [categoryid, setCategoryid] = React.useState(0);
 const [showBarChart, setShowBarChart] = React.useState(false);
 const [barChartData, setBarChartData] = React.useState(null);
 let allCategoriesPresent = false;

 useEffect(() => {
  let allCategoriesSelected = false;
  if (categoryid === '0') {
   allCategoriesSelected = true;
  }
  const data = {
   all: allCategoriesSelected,
   project_id: spaceid,
   category_id: Number(categoryid),
  };
  async function sendData() {
   const fetchedData = await fetchBackendJSON('costEstm/getCostMonthGraph', 'POST', data);
   const dataSource = [];
   fetchedData.data.forEach((dt) => {
    dataSource.push({ day: `${dt[0]} to ${dt[1]}`, cost: parseInt(dt[2], 10) });
   });
   setBarChartData(dataSource);
  }
  sendData();
 }, [categoryid]);

 // eslint-disable-next-line no-restricted-syntax, no-unused-vars
 for (const [key, value] of Object.entries(categories)) {
  if (value.title === 'All Categories') {
   allCategoriesPresent = true;
   break;
  }
 }
 if (!allCategoriesPresent) {
  categories.push({ id: 0, title: 'All Categories' });
 }
 const submitCategory = (e) => {
  e.preventDefault();
  setCategoryid(e.target.value);
  setShowBarChart(true);
 };

 return (
  <div>
   <h4>Visualize Estimation</h4>
   <Form className="col-6">
    <Form.Select size="lg" value={categoryid} onChange={submitCategory}>
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
   {showBarChart ? <BarChart barChartData={barChartData} /> : null}
   <Button onClick={() => setStep(6)}>Continue</Button>
   <Button onClick={() => setStep(4)}>Back</Button>
  </div>
 );
}

export default VisualizeEstimation;
