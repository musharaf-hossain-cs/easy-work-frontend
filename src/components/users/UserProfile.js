/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import fetchBackendJSON from '../../actions/Fetch';

export default function UserProfile() {
 const userid = 1;
 const [name, setName] = useState('');
 const [dateOfBirth, setDateOfBirth] = useState('');
 const [email, setEmail] = useState('');
 const [address, setAddress] = useState('');
 const [mobile, setMobile] = useState('');
 const [joiningDate, setJoiningDate] = useState('');
 const [jobId, setJobId] = useState('');
 const [jobName, setJobName] = useState('');
 const [salary, setSalary] = useState('');
 const [gender, setGender] = useState('');
 const navigate = useNavigate();
 useEffect(() => {
  let fetchedData;
  async function fetchData() {
   fetchedData = await fetchBackendJSON(`user/getUserInfo/${userid}`, 'GET', {});
   console.log(fetchedData);
   setName(`${fetchedData.first_name} ${fetchedData.last_name}`);
   setDateOfBirth(fetchedData.date_of_birth);
   setEmail(fetchedData.email);
   setAddress(fetchedData.address);
   setMobile(fetchedData.mobile);
   setJoiningDate(fetchedData.joining_date);
   setJobId(fetchedData.job);
   if (fetchedData.gender === 'M') setGender('Male');
   else if (fetchData.gender === 'F') setGender('Female');
   else setGender('Other');
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
 const goToEditProfile = (e) => {
  e.preventDefault();
  navigate(`/user/edit-profile/${userid}`, { replace: false });
 };
 return (
  <div>
   <h1>Profile Details</h1>
   <hr />
   <h3>Personal Information: </h3>
   <hr />
   <h5>Name: {name}</h5>
   <h5>Date of Birth: {dateOfBirth}</h5>
   <h5>Gender: {gender}</h5>
   <h5>Email: {email}</h5>
   <h5>Mobile: {mobile}</h5>
   <h5>Address: {address}</h5>
   <hr />
   <h3>Job Information: </h3>
   <hr />
   <h5>Job Role: {jobName} </h5>
   <h5>Joining Date: {joiningDate}</h5>
   <h5>Salary: {salary}$</h5>
   <hr />
   <Button variant="primary" type="submit" onClick={goToEditProfile}>
    Edit Profile
   </Button>
  </div>
 );
}
