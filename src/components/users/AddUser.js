import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import AddUserForm from './AddUserForm';

import fetchBackendJSON from '../../actions/Fetch';

let count = 0;
// let memberList = [];
let selectedJobs = [''];
let chosenMembers = [[]];

function AddUser() {
 // const [chosenMembers, setChosenMembers] = useState([]);
 const [designations, setDesignations] = useState([]);
 const [addMore, setAddMore] = useState(false);
 const [fields, setFields] = useState([count]);
 const [title, setTitle] = useState('');
 const [taskTitle, setTaskTitle] = useState('');

 const navigate = useNavigate();
 const location = useLocation();

 const { spaceid } = useParams();
 let { taskid } = useParams();
 if (taskid === undefined) {
  taskid = -1;
 }

 useEffect(() => {
  let fetchedData;
  async function fetchData() {
   fetchedData = await fetchBackendJSON(`project/getproject/${spaceid}`, 'GET', {});
   console.log('In Assign User: ', fetchedData);
   setTitle(fetchedData[0].title);
  }
  fetchData();
 }, []);

 useEffect(() => {
  let fetchedData;
  async function fetchData() {
   fetchedData = await fetchBackendJSON(`taskmgmt/gettaskdetails`, 'POST', { task_id: taskid });
   console.log('In Assign User: ', fetchedData);
   // setTitle(fetchedData[0].title);
   setTaskTitle(` (${fetchedData.task_info.title})`);
  }
  if (taskid !== -1) fetchData();
 }, []);

 // gettaskdetails

 useEffect(() => {
  const jobs = [];
  async function fetchDesignation() {
   const res = await fetchBackendJSON('user/getDesignation', 'GET', {});
   console.log(res);
   res.designation.forEach((item) => jobs.push({ label: item.job_name }));
   setDesignations([jobs]);
   // designations.push(jobs);
  }
  fetchDesignation();
 }, []);

 const clearSelection = () => {
  // setChosenMembers([]);
  setAddMore(false);
  setFields([0]);
  setDesignations([designations[0]]);
  selectedJobs = [''];
  count = 0;
  chosenMembers = [[]];
  // memberList = [];
 };

 const assignMembers = () => {
  const assignedMembers = [];
  const tempMembers = [];
  // chosenMembers.forEach((mem) => assignedMembers.push(mem.id));
  chosenMembers.forEach((members) => {
   members.forEach((m) => tempMembers.push(m));
  });
  tempMembers.forEach((m) => {
   if (!assignedMembers.includes(m)) {
    assignedMembers.push(m);
   }
  });
  console.log('send data', assignedMembers);
  if (assignedMembers.length === 0) {
   // eslint-disable-next-line no-alert
   alert('No member chosen');
   return;
  }
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
    path = path.slice(0, -14);
    navigate(path, { replace: false });
   } else {
    console.log('member assingment failed');
   }
  }
  sendMemberAssignment();
 };

 const addMoreClicked = () => {
  count += 1;
  console.log(count);
  const newDesignation = [];
  let found;
  designations[0].forEach((job) => {
   found = false;
   selectedJobs.forEach((selJob) => {
    if (selJob === job.label) found = true;
   });
   if (!found) newDesignation.push({ label: job.label });
  });
  setDesignations([...designations, newDesignation]);
  selectedJobs.push('');
  chosenMembers.push([]);
  setFields((old) => {
   const newList = JSON.parse(JSON.stringify(old));
   newList.push(count);
   return newList;
  });
  setAddMore(false);
 };

 const setChosenMembers = (idx, members) => {
  chosenMembers[idx] = members;
 };

 // const addMember = (idx, id, name, job) => {
 //  memberList[idx] = { id, name, job };
 //  console.log(memberList);
 // };

 return (
  <div className="container">
   <h2 align="center" style={{ color: 'green' }}>
    <strong>
     {title}
     {taskTitle} - Add User
    </strong>
   </h2>
   <hr />
   {fields.map((item, idx) => (
    <AddUserForm
     key={item.id}
     designations={designations[idx]}
     setAddMore={setAddMore}
     index={idx}
     selectedJobs={selectedJobs}
     setChosenMembers={setChosenMembers}
    />
   ))}

   {addMore && (
    <div className="move-right color-blue cursor-pointer">
     <Button variant="light" size="sm" onClick={addMoreClicked}>
      Add More
     </Button>
    </div>
   )}

   <div className="addUserBtn">
    <Button className="m-2" variant="success" onClick={assignMembers}>
     Assign Members
    </Button>
    <Button className="m-2" variant="danger" onClick={clearSelection}>
     Clear Members
    </Button>
   </div>
  </div>
 );
}

export default AddUser;
