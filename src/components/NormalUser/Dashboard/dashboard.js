import { useEffect, useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import { useNavigate, useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import fetchBackendJSON from '../../../actions/Fetch';
import BarChart from './BarChart';
import PIECHART from './PIECHART';
import ProjectsInTable from './ProjectsInTable';
// import styles from '../../styles/TaskDetail.module.css';
// import TaskDetail from './TaskDetail';
// import UserList from '../users/UserList';
// import TaskDetailList from './TaskDetailList';
// import TasksInTable from './TasksInTable';

export default function Dashboard() {
 const [projects, setProjects] = useState([]);
 useEffect(() => {
  // eslint-disable-next-line prettier/prettier
             let fetchedData;
  async function fetchData() {
   fetchedData = await fetchBackendJSON('taskmgmt/getprojects', 'POST', {});

   console.log('In Dashboard');
   let temp = [];
   fetchedData.project_list.forEach((project) => {
    console.log(project);
    temp.push({
     description: project.description,
     title: project.title,
     startDate: project.start_date,
     allocatedTime: project.allocated_time,
     remainingTime: project.remaining_time,
    });
   });
   setProjects(temp);
   temp = [];
  }
  fetchData();
 }, []);

 return (
  <>
   <div style={{ display: 'flex', flexDirection: 'row' }}>
    <BarChart />
    <PIECHART />
   </div>
   <hr />
   <Typography variant="h3" sx={{ textDecoration: 'underline' }}>
    Your Projects:{' '}
   </Typography>
   <br />
   <ProjectsInTable tasks={projects} rowPerPage={5} />
   <hr />
   <Typography variant="h3">Your Milestones: </Typography>
  </>
 );
}
