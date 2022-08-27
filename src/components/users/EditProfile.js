/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
import { inputLabelClasses } from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import fetchBackendJSON from '../../actions/Fetch';

export default function EditProfile() {
 const userid = 1;
 const [name, setName] = useState('');
 const [firstName, setFirstName] = useState('');
 const [lastName, setLastName] = useState('');
 const [dateOfBirth, setDateOfBirth] = useState('');
 const [email, setEmail] = useState('');
 const [address, setAddress] = useState('');
 const [mobile, setMobile] = useState('');
 const [joiningDate, setJoiningDate] = useState('');
 const [jobId, setJobId] = useState('');
 const [jobs, setJobs] = useState([]);
 const [jobName, setJobName] = useState('');
 const [salary, setSalary] = useState('');
 const [gender, setGender] = useState('');
 const navigate = useNavigate();
 useEffect(() => {
  let fetchedData;
  async function fetchData() {
   fetchedData = await fetchBackendJSON(`user/getUserInfo/${userid}`, 'GET', {});
   console.log(fetchedData);
   setFirstName(fetchedData.first_name);
   setLastName(fetchedData.last_name);
   setName(`${fetchedData.first_name} ${fetchedData.last_name}`);
   setDateOfBirth(fetchedData.date_of_birth);
   setEmail(fetchedData.email);
   setAddress(fetchedData.address);
   setMobile(fetchedData.mobile);
   setJoiningDate(fetchedData.joining_date);
   setJobId(fetchedData.job);
   if (fetchedData.gender === 'M') {
    setGender('1');
   } else if (fetchedData.gender === 'F') {
    setGender('2');
   } else setGender('3');
  }
  fetchData();
 }, []);
 useEffect(() => {
  async function fetchData() {
   const res = await fetchBackendJSON(`user/get_Designation/${jobId}`, 'GET', {});
   setJobName(res.job_name);
   setSalary(res.salary);
  }
  fetchData();
 }, [jobId]);
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
    console.log(dsg);
    temp.push({
     label: dsg.job_name,
     count,
    });
    // eslint-disable-next-line no-plusplus
    count++;
   });

   setJobs(() => temp);
   console.log(jobs);
  }
  fetchData();
 }, []);
 const submitForm = (e) => {
  e.preventDefault();
  console.log(JSON.stringify(joiningDate));
  let formattedJoiningDate = JSON.stringify(joiningDate);
  formattedJoiningDate = formattedJoiningDate.split('T')[0];
  formattedJoiningDate = formattedJoiningDate.substring(1);
  let formattedDateOfBirth = JSON.stringify(dateOfBirth);
  formattedDateOfBirth = formattedDateOfBirth.split('T')[0];
  formattedDateOfBirth = formattedDateOfBirth.substring(1);
  let formattedGender = null;
  console.log('Date Check');
  console.log(formattedDateOfBirth);
  console.log(formattedJoiningDate);
  if (gender === '1') formattedGender = 'M';
  else if (gender === '2') formattedGender = 'F';
  else formattedGender = 'O';
  const data = {
   id: userid,
   first_name: firstName,
   last_name: lastName,
   email,
   mobile,
   address,
   date_of_birth: formattedDateOfBirth,
   gender: formattedGender,
   joining_date: formattedJoiningDate,
  };
  async function sendData() {
   const res = await fetchBackendJSON('user/modifyUser', 'POST', data);
   console.log(res);
   console.log('Ami ekhane');
   navigate(`/user/${userid}/view-profile`, { replace: false });
  }

  sendData();
 };
 return (
  <div className={['mycontainer', 'container'].join(' ')}>
   <h1>Edit Profile</h1>
   <hr />
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
      value={mobile}
      onChange={(e) => setMobile(e.target.value)}
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
    <hr />
    <Button variant="primary" className="col-2" type="submit" onClick={submitForm}>
     Save Profile
    </Button>
   </Form>
  </div>
 );
}
