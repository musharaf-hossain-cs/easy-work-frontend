import { Button } from '@mui/material';
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

const tasks = [
 {
  title: 'task-1',
  priority: 'high',
  status: 'completed',
  dueDate: new Date('June 19, 2022'),
 },
 {
  title: 'task-2',
  priority: 'medium',
  status: 'active',
  dueDate: new Date('July 19, 2022'),
 },
 {
  title: 'task-3',
  priority: 'low',
  status: 'upcoming',
  dueDate: new Date('August 30, 2022'),
 },
];

const columns = ['Title', 'Priority', 'Status', 'Due Date'];
function Space() {
 const { spaceid } = useParams();
 const navigate = useNavigate();

 const [page, setPage] = React.useState(0);
 const [rowsPerPage, setRowsPerPage] = React.useState(10);

 const handleChangePage = (event, newPage) => {
  setPage(newPage);
 };

 const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(+event.target.value);
  setPage(0);
 };

 const handleRowsClick = (taskid) => {
  navigate(`/spaces/${spaceid}/tasks/${taskid}`, { replace: true });
 };

 const newTask = () => {
  navigate(`/spaces/${spaceid}/new-task`, { replace: true });
 };

 return (
  <div>
   <h1 align="center">Space: {spaceid}</h1>
   <hr />
   <Button onClick={newTask}>Add Task</Button>
   <hr />
   <h3>All Tasks</h3>
   <Paper sx={{ width: '100%', overflow: 'hidden' }}>
    <TableContainer sx={{ maxHeight: 440 }}>
     <Table stickyHeader aria-label="sticky table">
      <TableHead>
       <TableRow>
        {columns.map((column, key) => (
         <TableCell key={key}>{column}</TableCell>
        ))}
       </TableRow>
      </TableHead>
      <TableBody>
       {tasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((task) => (
        <TableRow hover onClick={() => handleRowsClick(task.title)} tabIndex={-1} key={task.title}>
         <TableCell>{task.title}</TableCell>
         <TableCell>{task.priority}</TableCell>
         <TableCell>{task.status}</TableCell>
         <TableCell>{task.dueDate.toUTCString()}</TableCell>
        </TableRow>
       ))}
      </TableBody>
     </Table>
    </TableContainer>
    <TablePagination
     rowsPerPageOptions={[10, 25, 100]}
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

export default Space;
