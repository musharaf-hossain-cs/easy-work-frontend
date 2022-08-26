/* eslint-disable no-alert */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-unused-vars */
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import Autocomplete from '@mui/material/Autocomplete';
import { inputLabelClasses } from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import fetchBackendJSON from '../../actions/Fetch';

const formatDate = (date) =>
 [date.getFullYear(), date.getMonth() + 1, date.getDate() + 1].join('-');
const formatDate2 = (date) =>
 [date.getFullYear(), date.getMonth() + 1, date.getDate() - 1].join('-');

function EditTask() {
 const [attachments, setAttachments] = useState([]);
 const [title, setTitle] = useState('');
 const [priority, setPriority] = useState('');
 const [status, setStatus] = useState('');
 const [description, setDescription] = useState('');
 const [tasks, setTasks] = useState([]);
 const [dependencies, setDependencies] = useState([]);

 const navigate = useNavigate();

 let selectedFile;
 let prevStartDate;
 let prevEndDate;

 const { taskid, spaceid } = useParams();
 // eslint-disable-next-line no-unused-vars
 const [taskDetails, setTaskDetails] = useState({});

 const [startDate, setStartDate] = useState('');
 const [endDate, setEndDate] = useState('');

 useEffect(() => {
  // eslint-disable-next-line prettier/prettier
    let fetchedData;
  async function fetchData() {
   fetchedData = await fetchBackendJSON('taskmgmt/getproject_tasks', 'POST', {
    project_id: Number(spaceid),
   });
   console.log('In space');
   console.log(fetchedData);
   let temp = [];
   fetchedData.task_list.forEach((task) => {
    temp.push({
     id: task.id,
     parentId: task.parent_id,
     title: task.title,
     start: task.start,
     end: task.end,
     progress: 0,
    });
   });
   setTasks(temp);
   temp = [];
   fetchedData.dependency_list.forEach((dependency) => {
    console.log(dependency);
    setDependencies([
     ...dependencies,
     {
      dependencyId: dependency.dependency_id,
      predecessorId: dependency.predecessor_id,
      successorId: dependency.successor_id,
      type: 0,
     },
    ]);
   });
  }
  fetchData();
 }, []);

 useEffect(() => {
  let fetchedData;
  async function fetchData() {
   fetchedData = await fetchBackendJSON('taskmgmt/gettaskdetails', 'POST', { task_id: taskid });
   const task = fetchedData.task_info;
   console.log(task);
   setStartDate(formatDate(new Date(task.start)));
   setEndDate(formatDate(new Date(task.end)));
   setTitle(task.title);
   setDescription(task.description);
   if (task.priority === 'high') setPriority('1');
   if (task.priority === 'medium') setPriority('2');
   if (task.priority === 'low') setPriority('3');
   if (task.status === 'Completed') setStatus('1');
   if (task.status === 'Ongoing') setStatus('2');
   if (task.status === 'Postponed') setStatus('3');
   if (task.status === 'Not Started') setStatus('4');
   //    setAttachments(task.attachments);
  }
  fetchData();
 }, []);

 const handleStatusChange = (e) => {
  e.preventDefault();
  setStatus(e.target.value);
  if (e.target.value === '1') {
   setEndDate(new Date());
  }
  if (e.target.value === '2') {
   setStartDate(new Date());
  }
 };

 const submitForm = (e) => {
  e.preventDefault();
  let allOk = true;
  const taskEndDate = Date.parse(formatDate2(new Date(endDate)));
  const taskStartDate = Date.parse(formatDate2(new Date(startDate)));

  console.log('In submit form');
  //   console.log(dependencies);
  //   console.log(tasks);

  let predecessorEndDate = null;

  if (taskStartDate > taskEndDate) {
   // eslint-disable-next-line no-alert
   alert('Error!!\nTask Starting date must be before Task Ending Date!');
   allOk = false;
  }
  //   Consider the current task as predecessor
  predecessorEndDate = taskEndDate;
  const successors = [];
  console.log(typeof taskid);
  dependencies.forEach((dependency) => {
   console.log(typeof dependency.predecessorId);
   if (dependency.predecessorId === Number(taskid)) {
    successors.push(dependency.successorId);
   }
  });
  let shouldSkip = false;
  tasks.forEach((task) => {
   if (shouldSkip) return;
   if (successors.includes(task.id)) {
    const successorStartDate = Date.parse(task.start);
    const dayDiff = (successorStartDate - predecessorEndDate) / (1000 * 3600 * 24);
    if (dayDiff < 0) {
     allOk = false;
     shouldSkip = true;
     alert(
      `Dependency Error with Task: "${task.title}"!!\nCurrent Task must end before its Successor Task starts!`
     );
    }
   }
  });
  //   Consider the current task as predecessor
  const successorStartDate = taskStartDate;
  const predecessors = [];
  dependencies.forEach((dependency) => {
   if (dependency.successorId === Number(taskid)) {
    predecessors.push(dependency.predecessorId);
   }
  });
  shouldSkip = false;
  tasks.forEach((task) => {
   if (shouldSkip) return;
   if (predecessors.includes(task.id)) {
    // Compare task.end with successorStartDate
    predecessorEndDate = Date.parse(task.end);
    const dayDiff = (successorStartDate - predecessorEndDate) / (1000 * 3600 * 24);
    if (dayDiff < 0) {
     allOk = false;
     shouldSkip = true;
     alert(
      `Dependency Error with Task: "${task.title}"!!\nCurrent Task must start after its Predecessor Task ends!`
     );
    }
   }
  });
  if (allOk) {
   let currentStatus = '';
   let currentPriority = '';
   if (status === '1') currentStatus = 'Completed';
   if (status === '2') currentStatus = 'Ongoing';
   if (status === '3') currentStatus = 'Postponed';
   if (status === '4') currentStatus = 'Not Started';

   if (priority === '1') currentPriority = 'high';
   if (priority === '2') currentPriority = 'medium';
   if (priority === '3') currentPriority = 'low';

   const data = {
    project_id: spaceid,
    title,
    description,
    start_time: formatDate2(new Date(startDate)),
    end_time: formatDate2(new Date(endDate)),
    slack_time: 0,
    priority: currentPriority,
    status: currentStatus,
   };
   console.log('edit', data);
   async function sendData() {
    // eslint-disable-next-line no-unused-vars
    const res = await fetchBackendJSON(`project/updateTask/${taskid}`, 'PATCH', data);

    setStartDate(null);
    setEndDate(null);
    setTitle('');
    setDescription('');
    setPriority(0);
    // eslint-disable-next-line no-unused-vars
    setAttachments((prev) => []);
    navigate(`/spaces/${spaceid}/tasks/`, { replace: false });
   }

   sendData();
  }
 };

 return (
  <div className={['mycontainer', 'container'].join(' ')}>
   <h1>Edit Task</h1>
   <Form className={['row'].join(' ')}>
    <Form.Group className="mb-3 col-6" controlId="formTaskTitle">
     <Form.Label>Task Title</Form.Label>
     <Form.Control
      type="text"
      placeholder={taskDetails.title}
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      onKeyPress={(e) => {
       if (e.key === 'Enter') e.preventDefault();
      }}
     />
    </Form.Group>

    <Form.Group className="mb-3 col-6" controlId="formStartDate">
     {/* <Form.Label>Start Date: </Form.Label> */}
     <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
       openTo="year"
       label="Start Date"
       views={['year', 'month', 'day']}
       value={startDate}
       onChange={(newValue) => {
        setStartDate(newValue);
       }}
       // eslint-disable-next-line react/jsx-props-no-spreading
       renderInput={(params) => (
        <TextField
         // eslint-disable-next-line react/jsx-props-no-spreading
         {...params}
         sx={{ input: { color: 'black' }, svg: { color: 'black' } }}
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
        />
       )}
      />
     </LocalizationProvider>
    </Form.Group>

    <Form.Group className="mb-3 col-6" controlId="formTaskDescription">
     <Form.Label>Task Description</Form.Label>
     <Form.Control
      as="textarea"
      rows={3}
      value={description}
      placeholder={taskDetails.description}
      onChange={(e) => setDescription(e.target.value)}
      onKeyPress={(e) => {
       if (e.key === 'Enter') e.preventDefault();
      }}
     />
    </Form.Group>

    <Form.Group className="mb-3 col-6" controlId="formEndDate">
     {/* <Form.Label>Start Date: </Form.Label> */}
     <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
       openTo="year"
       label="Expected End Date"
       views={['year', 'month', 'day']}
       value={endDate}
       onChange={(newValue) => {
        setEndDate(newValue);
       }}
       // eslint-disable-next-line react/jsx-props-no-spreading
       renderInput={(params) => (
        <TextField
         // eslint-disable-next-line react/jsx-props-no-spreading
         {...params}
         sx={{ input: { color: 'black' }, svg: { color: 'black' } }}
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
        />
       )}
      />
     </LocalizationProvider>
    </Form.Group>

    <Form.Group className="mb-3 col-6" controlId="formPriority">
     <Form.Label>Complexity </Form.Label>
     <Form.Select
      aria-label="Default select example"
      value={priority}
      onChange={(e) => setPriority(e.target.value)}
     >
      <option value="0">Choose a priority</option>
      <option value="1">High</option>
      <option value="2">Medium</option>
      <option value="3">Low</option>
     </Form.Select>
    </Form.Group>

    <Form.Group className="mb-3 col-6" controlId="formAttachFile">
     <Form.Label>Attachments</Form.Label>
     {/* files list */}
     <ul className="mb-3 col-6">
      {attachments.map((val, key) => (
       <li key={key}>{val.name}</li>
      ))}
     </ul>
     <Form.Control
      type="file"
      placeholder="Choose a file"
      value={selectedFile}
      onKeyPress={(e) => {
       if (e.key === 'Enter') e.preventDefault();
      }}
      onChange={(e) => {
       // eslint-disable-next-line prefer-destructuring
       selectedFile = e.target.files[0];
       setAttachments([...attachments, e.target.files[0]]);
      }}
     />
    </Form.Group>

    <Form.Group className="mb-3 col-6" controlId="formPriority">
     <Form.Label>Status </Form.Label>
     <Form.Select aria-label="Default select example" value={status} onChange={handleStatusChange}>
      <option value="1">Completed</option>
      <option value="2">Ongoing</option>
      <option value="3">Postponed</option>
      <option value="4">Not Started</option>
     </Form.Select>
    </Form.Group>

    <Button variant="primary" type="submit" onClick={submitForm}>
     Submit
    </Button>
   </Form>
  </div>
 );
}

export default EditTask;
