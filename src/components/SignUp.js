/* eslint-disable no-plusplus */
/* eslint-disable prettier/prettier */
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import Autocomplete from '@mui/material/Autocomplete';
import Autocomplete from '@mui/material/Autocomplete';
import { inputLabelClasses } from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import fetchBackendJSON from '../actions/Fetch';

function SignUp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [address, setAddress] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [gender, setGender] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [selectedJobs, setSelectedJobs] = useState([]);
    const [joiningDate, setJoiningDate] = useState(null);

 const handleAutoComplete = (e, v) => {
    console.log(v)
    if (v != null) setSelectedJobs([v]);
   };

 useEffect(() => {
    // eslint-disable-next-line prettier/prettier
    let fetchedData;
    async function fetchData() {
        fetchedData = await fetchBackendJSON('user/getDesignation', 'GET');
        console.log('In Sign Up Page');
        console.log(fetchedData);
        // let temp = [];
        const temp = [];
        fetchedData.designation.forEach((dsg) => {
           console.log(dsg.job_name)
           temp.push({
                label: dsg.job_name,
            });
        });

        setJobs(() => temp);
        // let count = 0
        // for(let i = 0; i < 1000000; i++){
        //     // eslint-disable-next-line no-unused-vars
        //     count += 1
        // }
        // temp = [];
        console.log(jobs)
}
fetchData();
}, []);

//  const navigate = useNavigate();

//  let selectedFile;

//  const { taskid, spaceid } = useParams();
//  console.log(`taskid: ${taskid}`);
//  console.log(`spaceid: ${spaceid}`);
//  const parentid = taskid === undefined ? 0 : taskid;

//  const submitForm = (e) => {
//   e.preventDefault();
//   const data = {
//    project_id: spaceid,
//    title,
//    description,
//    start_time: formatDate(startDate),
//    end_time: formatDate(endDate),
//    status: 'Not Started',
//    slack_time: 0,
//   };
//   async function sendData() {
//    const res = await fetchBackendJSON('project/addtask', 'POST', data);
//    console.log(res);

//    if (parentid !== 0) {
//     const res2 = await fetchBackendJSON('project/addtaskparent', 'POST', {
//      parent_task_id: parentid,
//      sub_task_id: res.id,
//     });
//     console.log(res2);
//     navigate(`/spaces/${spaceid}/tasks/${taskid}/`, { replace: false });
//    }

//    setStartDate(null);
//    setEndDate(null);
//    setTitle('');
//    setDescription('');
//    setPriority(0);
//    // eslint-disable-next-line no-unused-vars
//    setAttachments((prev) => []);
//    navigate(`/spaces/${spaceid}/tasks/`, { replace: false });
//   }

//   sendData();
//   // submit everything
//  };

 return (
  <div className={['mycontainer', 'container'].join(' ')}>
   <h1>Sign Up Page</h1>
   <Form className={['row'].join(' ')}>
    <Form.Group className="mb-3 col-5" controlId="formTaskTitle">
     <Form.Label>First Name</Form.Label>
     <Form.Control
      type="text"
      placeholder="Enter First Name"
      value={firstName}
      onChange={(e) => setFirstName(e.target.value)}
      onKeyPress={(e) => {
       if (e.key === 'Enter') e.preventDefault();
      }}
     />
    </Form.Group>
    <Form.Group className="mb-3 col-5" controlId="formTaskTitle">
     <Form.Label>Last Name</Form.Label>
     <Form.Control
      type="text"
      placeholder="Enter Last Name"
      value={lastName}
      onChange={(e) => setLastName(e.target.value)}
      onKeyPress={(e) => {
       if (e.key === 'Enter') e.preventDefault();
      }}
     />
    </Form.Group>
    <Form.Group className="mb-3 col-5" controlId="formTaskTitle">
     <Form.Label>E-mail</Form.Label>
     <Form.Control
      type="text"
      placeholder="Enter E-mail Address"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      onKeyPress={(e) => {
       if (e.key === 'Enter') e.preventDefault();
      }}
     />
    </Form.Group>
    <Form.Group className="mb-3 col-5" controlId="formTaskTitle">
     <Form.Label>Mobile No.</Form.Label>
     <Form.Control
      type="text"
      placeholder="Enter Mobile No."
      value={mobileNo}
      onChange={(e) => setMobileNo(e.target.value)}
      onKeyPress={(e) => {
       if (e.key === 'Enter') e.preventDefault();
      }}
     />
    </Form.Group>
    <Form.Group className="mb-3 col-5" controlId="formTaskTitle">
     <Form.Label>Address</Form.Label>
     <Form.Control
      type="text"
      placeholder="Enter Address"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
      onKeyPress={(e) => {
       if (e.key === 'Enter') e.preventDefault();
      }}
     />
    </Form.Group>
    <Form.Group className="mb-3 col-5" controlId="shareWith">
     <ul>
      {selectedJobs.map((val, key) => (
       <li key={key}>{val.label}</li>
      ))}
     </ul>
     <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={jobs}
      onChange={(event, v) => handleAutoComplete(event, v)}
      renderInput={(params) => (
       // eslint-disable-next-line react/jsx-props-no-spreading
       <TextField
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...params}
        sx={{ input: { color: 'white' } }}
        InputLabelProps={{
         sx: {
          // set the color of the label when not shrinked
          color: 'white',
          [`&.${inputLabelClasses.shrink}`]: {
           // set the color of the label when shrinked (usually when the TextField is focused)
           color: 'white',
          },
         },
        }}
        label="Designation"
       />
      )}
     />
    </Form.Group>
    <Form.Group className="mb-3 col-5" controlId="formPriority">
     <Form.Label>Gender </Form.Label>
     <Form.Select
      aria-label="Default select example"
      value={gender}
      onChange={(e) => setGender(e.target.value)}
     >
      <option value="0">Choose Gender</option>
      <option value="1">Male</option>
      <option value="2">Female</option>
      <option value="3">Others</option>
     </Form.Select>
    </Form.Group>
    <Form.Group className="mb-3 col-8" controlId="formEndDate">
     <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
       openTo="year"
       label="Date of Birth:"
       views={['year', 'month', 'day']}
       value={dateOfBirth}
       onChange={(newValue) => {
        setDateOfBirth(newValue);
       }}
       // eslint-disable-next-line react/jsx-props-no-spreading
       renderInput={(params) => (
        <TextField
         // eslint-disable-next-line react/jsx-props-no-spreading
         {...params}
         sx={{ input: { color: 'white' }, svg: { color: '#fff' } }}
         onKeyPress={(e) => {
          if (e.key === 'Enter') e.preventDefault();
         }}
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
        />
       )}
      />
     </LocalizationProvider>
    </Form.Group>
    <Form.Group className="mb-3 col-12" controlId="formEndDate">
     <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
       openTo="year"
       label="Joining Date:"
       views={['year', 'month', 'day']}
       value={joiningDate}
       onChange={(newValue) => {
        setJoiningDate(newValue);
       }}
       // eslint-disable-next-line react/jsx-props-no-spreading
       renderInput={(params) => (
        <TextField
         // eslint-disable-next-line react/jsx-props-no-spreading
         {...params}
         sx={{ input: { color: 'white' }, svg: { color: '#fff' } }}
         onKeyPress={(e) => {
          if (e.key === 'Enter') e.preventDefault();
         }}
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
        />
       )}
      />
     </LocalizationProvider>
    </Form.Group>
    {"\n"}
    <Button variant="primary" className='mb-3 col-2' type="submit">
     Sign Up!
    </Button>
   </Form>
  </div>
 );
}

export default SignUp;
