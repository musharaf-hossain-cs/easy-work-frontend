/* eslint-disable no-unused-vars */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import fetchBackendJSON from '../../actions/Fetch';

function LocCard({ category }) {
 const [loc, setLoc] = useState('');
 const [costPerLoc, setCostPerLoc] = useState('');
 const [locPerPm, setLocPerPm] = useState('');
 const [categoryDetails, setCategoryDetails] = useState({ loc: 0, loc_per_pm: 0, cost_per_loc: 0 });

 console.log('category in loc: ', category);
 // const { locSet, costSet, locPmSet } = props;

 useEffect(() => {
  let fetchedData;
  async function fetchData() {
   fetchedData = await fetchBackendJSON(`costEstm/getCategoryData/${category.id}`, 'GET', {});
   console.log(fetchedData);
   setLoc(fetchedData.data.loc);
   setLocPerPm(fetchedData.data.loc_per_pm);
   setCostPerLoc(fetchedData.data.cost_per_loc);
   setCategoryDetails(fetchedData.data);
  }
  fetchData();
 }, []);

 const handleLocChange = (e) => {
  setLoc(e.target.value);
  // locSet(grpI, e.target.value);
 };

 const handleCostPerLocChange = (e) => {
  setCostPerLoc(e.target.value);
  // costSet(grpI, e.target.value);
 };

 const handleLocPerPmChange = (e) => {
  setLocPerPm(e.target.value);
  // locPmSet(grpI, e.target.value);
 };

 const saveEstimation = () => {
  const data = {
   loc,
   cost_per_loc: costPerLoc,
   loc_per_pm: locPerPm,
  };

  let fetchedData;

  async function commandEstimate() {
   fetchedData = await fetchBackendJSON(`costEstm/calculateCost`, 'POST', {
    category_id: category.id,
   });
   console.log(fetchedData);
  }

  async function updateCategory() {
   console.log('Data to update Category: ', data);
   fetchedData = await fetchBackendJSON(`costEstm/updateFuncCat/${category.id}`, 'PATCH', data);
   console.log('updateCategory: ', fetchedData);
   if (fetchedData.loc === parseInt(data.loc, 10)) {
    console.log('Category Update Successful');
    commandEstimate();
   } else {
    console.log('Category Update Failed', fetchedData.loc, data.loc);
   }
  }
  updateCategory();
 };

 const resetEstimation = () => {
  setLoc(categoryDetails.loc);
  setCostPerLoc(categoryDetails.cost_per_loc);
  setLocPerPm(categoryDetails.loc_per_pm);
 };

 return (
  <Card>
   <Card.Header className="row">
    <h4 className="col-4">{category.title}</h4>
    <div className="col-8">
     {category.tasks !== undefined &&
      category.tasks !== null &&
      category.tasks.map((task) => (
       <>
        <Badge key={task.id} bg="secondary">
         {task.title}
        </Badge>
        <span className="whitetext">.</span>
       </>
      ))}
    </div>
   </Card.Header>
   <Card.Body>
    <Box
     component="form"
     sx={{
      '& .MuiTextField-root': { m: 1 },
     }}
     autoComplete="off"
    >
     <div className="row">
      <TextField
       id="loc"
       label="Enter LOC"
       className="col-4"
       // maxRows={4}
       value={loc}
       onChange={(e) => handleLocChange(e)}
      />
      <TextField
       id="cost-loc"
       label="Enter $/loc"
       className="col-4"
       value={costPerLoc}
       onChange={(e) => handleCostPerLocChange(e)}
      />
      <TextField
       id="loc-pm"
       label="Enter LOC/pm"
       className="col-3"
       value={locPerPm}
       onChange={(e) => handleLocPerPmChange(e)}
      />
     </div>
    </Box>
   </Card.Body>
   <Card.Footer>
    <div className="row">
     <ButtonGroup>
      <Button variant="contained" color="success" className="col-6" onClick={saveEstimation}>
       Save
      </Button>
      <Button variant="contained" color="secondary" className="col-6" onClick={resetEstimation}>
       Reset
      </Button>
     </ButtonGroup>
    </div>
   </Card.Footer>
  </Card>
 );
}

export default LocCard;
