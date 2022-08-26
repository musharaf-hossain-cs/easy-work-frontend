/* eslint-disable no-unused-vars */
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import fetchBackendJSON from '../../actions/Fetch';

// const tasks = fetchBackendJSON('user/gettaskslist');

const columns = ['Title', 'Start Date', 'Allocated Time (days)', 'Remaining Time (days)'];

function Row(props) {
 const { row } = props;
 const [open, setOpen] = React.useState(false);
 // eslint-disable-next-line no-unused-vars
 const [allocatedBudget, setAllocatedBudget] = useState('960');

 return (
  <>
   <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
    <TableCell>
     <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
      {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
     </IconButton>
    </TableCell>
    <TableCell align="left">{row.title}</TableCell>
    <TableCell align="left">{row.startDate}</TableCell>
    <TableCell align="left">{row.allocatedTime}</TableCell>
    <TableCell align="left">{row.remainingTime}</TableCell>
    {/* <TableCell align="right">{row.carbs}</TableCell>
         <TableCell align="right">{row.protein}</TableCell> */}
   </TableRow>
   <TableRow>
    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
     <Collapse in={open} timeout="auto" unmountOnExit>
      <Box sx={{ margin: 1 }}>
       <Typography variant="h6" gutterBottom component="div">
        Description of the Project:
       </Typography>
       <Typography gutterBottom component="div">
        {row.description}
       </Typography>
      </Box>
     </Collapse>
    </TableCell>
   </TableRow>
  </>
 );
}

function ProjectsInTable({ tasks, rowPerPage }) {
 //  const { spaceid } = useParams();
 const navigate = useNavigate();
 // console.log('In tasks in table');

 console.log('In Table');
 console.log(tasks);
 console.log(rowPerPage);

 const [open, setOpen] = React.useState(false);

 const [page, setPage] = React.useState(0);
 const [rowsPerPage, setRowsPerPage] = React.useState(rowPerPage);

 const formatDate = (date) =>
  [date.getFullYear(), date.getMonth() + 1, date.getDate() + 1].join('-');

 const handleChangePage = (event, newPage) => {
  setPage(newPage);
 };

 const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(+event.target.value);
  setPage(0);
 };

 const handleRowClick = (id) => {
  //   navigate(`/spaces/${spaceid}/tasks/${id}`, { replace: false });
 };

 return (
  <div className="mycontainer">
   <Paper sx={{ width: '100%', overflow: 'hidden' }}>
    <TableContainer component={Paper}>
     <Table aria-label="collapsible table">
      <TableHead>
       <TableRow>
        <TableCell />
        <TableCell align="left" className="col-3">
         Project Name
        </TableCell>
        <TableCell align="left" className="col-3">
         Start Date&nbsp;
        </TableCell>
        <TableCell align="left" className="col-3">
         Allocated Time (days)&nbsp;
        </TableCell>
        <TableCell align="left" className="col-3">
         Remaining Time (days)&nbsp;
        </TableCell>
        {/* <TableCell align="right">Carbs&nbsp;(g)</TableCell>
        <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
       </TableRow>
      </TableHead>
      <TableBody>
       {tasks.map((row) => (
        <Row row={row} />
       ))}
      </TableBody>
     </Table>
    </TableContainer>
    <TablePagination
     rowsPerPageOptions={[rowPerPage, 10, 25, 100]}
     component="div"
     count={tasks.length}
     rowsPerPage={rowsPerPage}
     page={page}
     onPageChange={handleChangePage}
     onRowsPerPageChange={handleChangeRowsPerPage}
    />
   </Paper>
  </div>
 );
}

export default ProjectsInTable;
