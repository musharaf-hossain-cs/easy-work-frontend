import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import fetchBackendJSON from '../actions/Fetch';
import BarChart from './BarChart';
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
 return (
  <DashboardLayoutRoot className="row scrollable2">
   <Box
    className="col-4"
    sx={{
     display: 'flex',
     flex: '1 1 auto',
     flexDirection: 'column',
    }}
   >
    <Budget budget={1200} name="Total Budget" />
   </Box>
   <Box
    className="col-4"
    sx={{
     display: 'flex',
     flex: '1 1 auto',
     flexDirection: 'column',
    }}
   >
    <Budget budget={800} name="Allocated Budget" />
   </Box>
   <Box
    className="col-4"
    sx={{
     display: 'flex',
     flex: '1 1 auto',
     flexDirection: 'column',
    }}
   >
    <Budget budget={400} name="Expected More Expense" />
   </Box>
   <BarChart />
   <PIECHART />
   <hr />
   <b>
    <h2>All Projects</h2>
   </b>
   <hr />
   <ProjectsInTable tasks={projects} rowPerPage={5} />
  </DashboardLayoutRoot>
 );
}
