/* eslint-disable prefer-destructuring */
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
import { useNavigate } from 'react-router-dom';
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
        let count = 1;
        fetchedData.designation.forEach((dsg) => {
           console.log(dsg)
           temp.push({
                label: dsg.job_name,
                count,
            });
            count++;
        });

        setJobs(() => temp);
        console.log(jobs)
}
fetchData();
}, []);

 const navigate = useNavigate();

//  let selectedFile;

//  const { taskid, spaceid } = useParams();
//  console.log(`taskid: ${taskid}`);
//  console.log(`spaceid: ${spaceid}`);
//  const parentid = taskid === undefined ? 0 : taskid;

 const submitForm = (e) => {
  e.preventDefault();
  console.log(joiningDate)
  console.log(typeof(joiningDate))
  console.log(JSON.stringify(joiningDate))
  let formattedJoiningDate =  JSON.stringify(joiningDate)
  formattedJoiningDate = formattedJoiningDate.split('T')[0]
  formattedJoiningDate = formattedJoiningDate.substring(1)
  let formattedDateOfBirth =  JSON.stringify(dateOfBirth)
  formattedDateOfBirth = formattedDateOfBirth.split('T')[0]
  formattedDateOfBirth = formattedDateOfBirth.substring(1)
  let formattedGender = null
  if(gender === '0')
    formattedGender = 'M'
  else if(gender === '1')
    formattedGender = 'F'
  else
    formattedGender = 'O'
  console.log(selectedJobs[0].count)
  const data = {
   first_name: firstName,
   last_name: lastName,
   email,
   mobile: mobileNo,
   address,
   date_of_birth: formattedDateOfBirth,
   gender: formattedGender,
   job: selectedJobs[0].count,
   joining_date: formattedJoiningDate,
  };
  async function sendData() {
    const res = await fetchBackendJSON('user/addUser', 'POST', data);
    console.log(res);
    navigate(`/*`, { replace: false });
  }

//    setStartDate(null);
//    setEndDate(null);
//    setTitle('');
//    setDescription('');
//    setPriority(0);
   // eslint-disable-next-line no-unused-vars

  sendData();
  // submit everything
 };

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
      type="email"
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
      <option value="1">MALE</option>
      <option value="2">FEMALE</option>
      <option value="3">OTHER</option>
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
    <Button variant="primary" className='mb-3 col-2' type="submit" onClick={submitForm}>
     Sign Up!
    </Button>
   </Form>
  </div>
 );
}

export default SignUp;
