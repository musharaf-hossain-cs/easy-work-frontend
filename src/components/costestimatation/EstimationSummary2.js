import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

const columns = [
 'Category',
 'Assigned People',
 'Mean PM (Effort)',
 'S.D of PM',
 'Mean Wage',
 'Allocation',
 'Ratio',
];

const categories = [
 {
  title: 'Cat-A',
  assignedPeople: 5,
  meanPM: 200,
  sDofPM: 100,
  meanWage: 100,
  allocation: 1000,
  ratio: 10,
 },
 {
  title: 'Cat-B',
  assignedPeople: 6,
  meanPM: 150,
  sDofPM: 80,
  meanWage: 120,
  allocation: 1200,
  ratio: 12,
 },
];

export default function Home() {
 // eslint-disable-next-line no-unused-vars
 const navigate = useNavigate();
 const rowPerPage = 10;
 const [page, setPage] = React.useState(0);
 const [rowsPerPage, setRowsPerPage] = React.useState(rowPerPage);

 const handleChangePage = (event, newPage) => {
  setPage(newPage);
 };

 const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(+event.target.value);
  setPage(0);
 };

 return (
  <div className="mycontainer">
   <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
       {categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((cat) => (
        <TableRow>
         <TableCell>{cat.title}</TableCell>
         <TableCell>{cat.assignedPeople}</TableCell>
         <TableCell>{cat.meanPM}</TableCell>
         <TableCell>{cat.sDofPM}</TableCell>
         <TableCell>{cat.meanWage}</TableCell>
         <TableCell>{cat.allocation}</TableCell>
         <TableCell>{cat.ratio}</TableCell>
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
  </div>
 );
}
