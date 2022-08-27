import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import fetchBackendJSON from '../../actions/Fetch';

// const tasks = fetchBackendJSON('user/gettaskslist');

const columns = ['Title', 'Priority', 'Priority Point', 'Due Date'];

function TasksWithPriority({ tasks, rowPerPage }) {
 const { spaceid } = useParams();
 const navigate = useNavigate();
 // console.log('In tasks in table');

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
  console.log(id);
  navigate(`/spaces/${spaceid}/tasks/${id}`, { replace: false });
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
       {tasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((task) => (
        <TableRow hover onClick={() => handleRowClick(task.id)} tabIndex={-1} key={task.title}>
         <TableCell>{task.title}</TableCell>
         <TableCell>{task.priority}</TableCell>
         <TableCell>{task.priorityPoint}</TableCell>
         <TableCell>{formatDate(new Date(task.dueDate))}</TableCell>
        </TableRow>
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

export default TasksWithPriority;
