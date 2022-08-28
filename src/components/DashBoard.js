/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import fetchBackendJSON from '../actions/Fetch';
import BarChart from './BarChart1';
import Budget from './dashboard/Budget';
import PIECHART from './dashboard/PIECHART';
import ProjectsInTable from './NormalUser/Dashboard/ProjectsInTable';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
 display: 'flex',
 flex: '1 1 auto',
 maxWidth: '100%',
 paddingTop: 5,
 [theme.breakpoints.up('lg')]: {
  paddingLeft: 0,
 },
}));

export default function DashBoard() {
 const [projects, setProjects] = useState([]);
 const [allStatus, setAllStatus] = useState([]);
 const [totalEstimatedBudget, setEstimatedBudget] = useState(0);
 const [totalAllocatedBudget, setAllocatedBudget] = useState(0);
 const [projectTaskCount, setProjectTaskCount] = useState([]);
 useEffect(() => {
  // eslint-disable-next-line prettier/prettier
    let fetchedData;
  async function fetchData() {
   fetchedData = await fetchBackendJSON('costEstm/getAllProjectBudget', 'GET', {});

   console.log('In All Budget');
   console.log(fetchedData);
   setEstimatedBudget(fetchedData.all_estimation);
   setAllocatedBudget(fetchedData.all_allocation);
  }
  fetchData();
 }, []);
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
     id: project.id,
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
 useEffect(() => {
  // eslint-disable-next-line prettier/prettier
  let fetchedData;
  async function fetchData() {
   fetchedData = await fetchBackendJSON('project/getAllTasksCatalogue', 'GET', {});
   console.log(fetchedData.catalogue);
   let temp = [];

   for (const [key, value] of Object.entries(fetchedData.catalogue)) {
    temp.push({
     status: key,
     count: value,
    });
   }
   setAllStatus(temp);
   console.log(temp);
   temp = [];
  }
  fetchData();
 }, []);
 useEffect(() => {
  // eslint-disable-next-line prettier/prettier
  let fetchedData;
  async function fetchData() {
   fetchedData = await fetchBackendJSON('project/getAllProjectTaskCount', 'GET', {});
   console.log('Getting all project task count');
   console.log(fetchedData);
   let temp = [];
   fetchedData.data.forEach((project) => {
    console.log(project);
    temp.push({
     projectTitle: project.project_title,
     taskCount: project.task_count,
    });
   });
   setProjectTaskCount(temp);
   temp = [];
   //  let temp = [];

   //  for (const [key, value] of Object.entries(fetchedData.catalogue)) {
   //   temp.push({
   //    status: key,
   //    count: value,
   //   });
   //  }
   //  setAllStatus(temp);
   //  console.log(temp);
   //  temp = [];
  }
  fetchData();
 }, []);
 return (
  <DashboardLayoutRoot className="row scrollable2">
   <Box
    className="col-6"
    sx={{
     display: 'flex',
     flex: '1 1 auto',
     flexDirection: 'column',
    }}
   >
    <Budget budget={totalEstimatedBudget} name="Total Estimated Budget" />
   </Box>
   <Box
    className="col-6"
    sx={{
     display: 'flex',
     flex: '1 1 auto',
     flexDirection: 'column',
    }}
   >
    <Budget budget={totalAllocatedBudget} name="Total Allocated Budget" />
   </Box>
   <BarChart dataSource={projectTaskCount} />
   <PIECHART pieChartData={allStatus} />
   <hr />
   <b>
    <h2>All Projects</h2>
   </b>
   <hr />
   <ProjectsInTable tasks={projects} rowPerPage={5} />
  </DashboardLayoutRoot>
 );
}
