import Autocomplete from '@mui/material/Autocomplete';
import { inputLabelClasses } from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import fetchBackendJSON from '../../actions/Fetch';

function AddUser() {
 const [job, setJob] = useState('');
 const [chosenMembers, setChosenMembers] = useState([]);
 const [jobFetch, setJobFetch] = useState(true);
 const [designations, setDesignations] = useState([]);
 const [members, setMembers] = useState([]);

 const navigate = useNavigate();
 const location = useLocation();

 const { spaceid } = useParams();
 let { taskid } = useParams();
 if (taskid === undefined) {
  taskid = -1;
 }

 useEffect(() => {
  const jobs = [];
  async function fetchDesignation() {
   const res = await fetchBackendJSON('user/getDesignation', 'GET', {});
   console.log(res);
   res.designation.forEach((item) => jobs.push({ label: item.job_name }));
   setDesignations(jobs);
  }
  fetchDesignation();
 }, []);

 useEffect(() => {
  const allMembers = [];
  async function fetchMembers() {
   const res = await fetchBackendJSON('user/getUsersUnderDesignation', 'POST', { job_name: job });
   console.log(res);
   res.members.forEach((item) =>
    allMembers.push({
     label: `${item.first_name} ${item.last_name}`,
     id: item.id,
     email: item.email,
     job_name: job,
    })
   );
   setJobFetch(true);
   setMembers(allMembers);
  }
  if (!jobFetch) fetchMembers();
 }, [jobFetch]);

 const chooseDesignation = (event, v) => {
  if (v !== null) {
   setJob(() => v.label);
   setJobFetch(false);
  }
  console.log(event, job);
 };

 const chooseMember = (event, v) => {
  if (v !== null) {
   setChosenMembers((old) => {
    let found = false;
    const oldMembers = JSON.parse(JSON.stringify(old));
    oldMembers.forEach((member, idx) => {
     if (member.id === v.id) {
      found = true;
      oldMembers.splice(idx, 1);
     }
    });
    if (!found) {
     const newMember = JSON.parse(JSON.stringify(v));
     newMember.job = job;
     oldMembers.push(newMember);
    }
    return oldMembers;
   });
  }
  console.log(event, chosenMembers);
 };

 const clearSelection = () => {
  setChosenMembers([]);
  setJobFetch(true);
  setJob('');
  setMembers([]);
 };

 const assignMembers = () => {
  const assignedMembers = [];
  chosenMembers.forEach((mem) => assignedMembers.push(mem.id));
  console.log('send data', assignedMembers);
  const data = {
   project_id: spaceid,
   task_id: taskid,
   members: assignedMembers,
  };
  console.log('send data', data);
  async function sendMemberAssignment() {
   const res = await fetchBackendJSON('taskmgmt/assignUser', 'POST', data);
   console.log(res);
   if (res.success) {
    console.log('member assignment successful');
    let path = location.pathname;
    const start = path.lastIndexOf('/');
    let size;
    if (start >= 0) {
     size = path.length - start;
    }
    path = path.splice(start, size);
    navigate(path, { replace: false });
   } else {
    console.log('member assingment failed');
   }
  }
  sendMemberAssignment();
 };

 return (
  <div className="row">
   <h2>Add user</h2>
   <hr />
   <Form className="col-6">
    <Form.Group className="mb-3" controlId="chooseJob">
     {/* <Form.Label>Choose Job:</Form.Label> */}
     <Autocomplete
      disablePortal
      id="combo-box-demo"
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
        sx={{ input: { color: 'white' } }}
        InputLabelProps={{
         sx: {
          // set the color of the label when not shrinked
          color: 'aliceblue',
          [`&.${inputLabelClasses.shrink}`]: {
           // set the color of the label when shrinked (usually when the TextField is focused)
           color: 'aliceblue',
          },
         },
        }}
        label="Job"
       />
      )}
     />
    </Form.Group>
    {jobFetch && (
     <Form.Group className="mb-3" controlId="chooseMember">
      <Autocomplete
       disablePortal
       id="combo-box-demo"
       options={members}
       onChange={(event, v) => chooseMember(event, v)}
       onKeyPress={(e) => {
        if (e.key === 'Enter') e.preventDefault();
       }}
       renderInput={(params) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <TextField
         // eslint-disable-next-line react/jsx-props-no-spreading
         {...params}
         sx={{ input: { color: 'white' } }}
         InputLabelProps={{
          sx: {
           // set the color of the label when not shrinked
           color: 'aliceblue',
           [`&.${inputLabelClasses.shrink}`]: {
            // set the color of the label when shrinked (usually when the TextField is focused)
            color: 'aliceblue',
           },
          },
         }}
         label="Member"
        />
       )}
      />
     </Form.Group>
    )}
    <div className="row">
     <span className="col-1" />
     <Button className="col-4" variant="dark" onClick={assignMembers}>
      Assign Members
     </Button>
     <span className="col-1" />
     <Button className="col-4" variant="dark" onClick={clearSelection}>
      Clear Members
     </Button>
     <span className="col-1" />
    </div>
   </Form>

   <div className="col-6">
    <h4>Project ID: {spaceid}</h4>
    <h4>Task ID: {taskid >= 0 ? taskid : ''}</h4>
    <h3>Selected Members</h3>
    <ul>
     {chosenMembers.map((member, key) => (
      <li key={key}>
       {member.label} - {member.job}
      </li>
     ))}
    </ul>
   </div>
  </div>
 );
}

export default AddUser;
