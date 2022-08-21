import Autocomplete from '@mui/material/Autocomplete';
import { inputLabelClasses } from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import SelectUser from './SelectUser';

import fetchBackendJSON from '../../actions/Fetch';

function AddUserForm(props) {
 const [job, setJob] = useState('');
 const [jobFetch, setJobFetch] = useState(true);
 const [members, setMembers] = useState([]);

 const { designations, setAddMore, selectedJobs, index, setChosenMembers } = props;

 useEffect(() => {
  const allMembers = [];
  async function fetchMembers() {
   const res = await fetchBackendJSON('user/getUsersUnderDesignation', 'POST', { job_name: job });
   console.log(res);
   res.members.forEach((item) => {
    allMembers.push({
     label: `${item.first_name} ${item.last_name}`,
     id: item.id,
     email: item.email,
     job_name: job,
     joiningDate: item.joining_date,
     assignedCount: item.assigned_count,
    });
   });
   setJobFetch(true);
   setMembers(allMembers);
   setAddMore(true);
  }
  if (!jobFetch) fetchMembers();
 }, [jobFetch]);

 const chooseDesignation = (event, v) => {
  if (v !== null) {
   setJob(() => v.label);
   setJobFetch(false);
   selectedJobs[index] = v.label;
   console.log(selectedJobs);
  }
  console.log(event, job);
 };

 const handleMemberChoice = (chosenMembers) => {
  setChosenMembers(index, chosenMembers);
 };

 return (
  <Form className="row">
   <Form.Group className="mb-3" controlId="chooseJob">
    {/* <Form.Label>Choose Job:</Form.Label> */}
    <Autocomplete
     disablePortal
     id="combo-box-demo"
     // disabled={isDisable}
     options={designations}
     onChange={(event, v) => chooseDesignation(event, v)}
     onKeyPress={(e) => {
      if (e.key === 'Enter') e.preventDefault();
     }}
     renderInput={(params) => (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <TextField
       // eslint-disable-next-line react/jsx-props-no-spreading
       {...params}
       sx={{ input: { color: 'black' } }}
       onKeyPress={(e) => {
        if (e.key === 'Enter') e.preventDefault();
       }}
       InputLabelProps={{
        sx: {
         // set the color of the label when not shrinked
         color: 'black',
         [`&.${inputLabelClasses.shrink}`]: {
          // set the color of the label when shrinked (usually when the TextField is focused)
          color: 'black',
         },
        },
       }}
       label="Job"
      />
     )}
    />
   </Form.Group>
   {jobFetch && <SelectUser rows={members} handleMemberChoice={handleMemberChoice} />}
  </Form>
 );
}

export default AddUserForm;
