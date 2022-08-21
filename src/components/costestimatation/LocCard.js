/* eslint-disable no-unused-vars */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';

function LocCard({ group }) {
 const [loc, setLoc] = useState('');
 const [costPerLoc, setCostPerLoc] = useState('');
 const [locPerPm, setLocPerPm] = useState('');

 // const { locSet, costSet, locPmSet } = props;

 useEffect(() => {
  console.log('fetch information from server');
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
   id: group.id,
   loc,
   cost_per_loc: costPerLoc,
   loc_per_pm: locPerPm,
  };
  console.log('Send data: ', data);
 };

 const resetEstimation = () => {
  console.log('Estimation reset');
 };

 return (
  <Card>
   <Card.Header className="row">
    <h4 className="col-4">{group.title}</h4>
    <div className="col-8">
     {group.tasks.map((task) => (
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
