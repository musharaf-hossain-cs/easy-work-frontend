/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import fetchBackendJSON from '../../actions/Fetch';
import BarChart1 from './BarChart1';

const columns = [
 'Category',
 'Assigned People',
 'Effort (mh)',
 'Allocated Budget',
 'Total Tasks',
 'Expected Time',
];

export default function EstimationSummary({ setStep }) {
 // eslint-disable-next-line no-unused-vars
 const navigate = useNavigate();
 const rowPerPage = 10;
 const [page, setPage] = React.useState(0);
 const [rowsPerPage, setRowsPerPage] = useState(rowPerPage);
 const [categories, setCategories] = useState([]);
 const { spaceid } = useParams();
 const [budgetInfo, setBudgetInfo] = useState([]);

 useEffect(() => {
  let fetchedData;
  async function fetchData() {
   fetchedData = await fetchBackendJSON(`costEstm/getAllCategorySummary/${spaceid}`, 'GET', {});
   console.log(fetchedData.data);
   const allCat = [];
   fetchedData.data.forEach((cat) => allCat.push(cat));
   setCategories(allCat);
  }
  fetchData();
 }, []);

 useEffect(() => {
  // eslint-disable-next-line prettier/prettier
    let fetchedData;
  async function fetchData() {
   fetchedData = await fetchBackendJSON(`costEstm/getBudgetAndAllocation/${spaceid}`, 'GET', {
    space_id: spaceid,
   });

   console.log('In Cost estimation summary');
   console.log(fetchedData);
   let temp = [];

   for (const [key, value] of Object.entries(fetchedData)) {
    temp.push({
     name: key,
     Budget: value,
    });
   }
   setBudgetInfo(temp);
   console.log(temp);
   temp = [];
  }
  fetchData();
 }, []);

 const handleChangePage = (event, newPage) => {
  setPage(newPage);
 };

 const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(+event.target.value);
  setPage(0);
 };

 return (
  <div className="mycontainer">
   <h2 align="center" style={{ color: 'green' }}>
    <strong>Estimation Summary</strong>
   </h2>
   <BarChart1 dataSource={budgetInfo} />
   <hr />
   <Paper className="estimationSummaryTable">
    <TableContainer sx={{ maxHeight: 440 }}>
     <Table stickyHeader aria-label="sticky table">
      <TableHead>
       <TableRow>
        {columns.map((column, key) => (
         <TableCell key={key}>
          <b>{column}</b>
         </TableCell>
        ))}
       </TableRow>
      </TableHead>
      <TableBody>
       {categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((cat, key) => (
        <TableRow
         key={key}
         onClick={() => navigate(`/estimate-cost/allocate/${cat.id}/details`, { replace: false })}
        >
         <TableCell>{cat.category_name}</TableCell>
         <TableCell>{cat.allocated_members}</TableCell>
         <TableCell>{cat.man_hour_per_week}</TableCell>
         <TableCell>{cat.allocated_budget}</TableCell>
         <TableCell>{cat.total_task}</TableCell>
         <TableCell>{cat.expected_time}</TableCell>
        </TableRow>
       ))}
      </TableBody>
     </Table>
    </TableContainer>
    <TablePagination
     rowsPerPageOptions={[10, 25, 100]}
     component="div"
     count={categories.length}
     rowsPerPage={rowsPerPage}
     page={page}
     onPageChange={handleChangePage}
     onRowsPerPageChange={handleChangeRowsPerPage}
    />
   </Paper>
   <div className="alignCenter">
    <Button className="m-1" onClick={() => setStep(6)}>
     Back
    </Button>
   </div>
  </div>
 );
}
