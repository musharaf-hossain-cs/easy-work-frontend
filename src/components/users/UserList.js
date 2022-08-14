import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import fetchBackendJSON from '../../actions/Fetch';

const columns = ['Name', 'Email', 'Mobile', 'Address', 'Job'];

function UserList({ users, rowPerPage }) {
 // const { spaceid } = useParams();
 // const navigate = useNavigate();
 // console.log('In tasks in table');

 const [page, setPage] = React.useState(0);
 const [rowsPerPage, setRowsPerPage] = React.useState(rowPerPage);

 // eslint-disable-next-line no-unused-vars
 const formatDate = (date) =>
  [date.getFullYear(), date.getMonth() + 1, date.getDate() + 1].join('-');

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
       {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
        <TableRow
         hover
         // onClick={() => navigate(`/spaces/${spaceid}/tasks/${task.taskid}`, { replace: false })}
         tabIndex={-1}
         key={user.id}
        >
         <TableCell>{user.name}</TableCell>
         <TableCell>{user.email}</TableCell>
         <TableCell>{user.mobile}</TableCell>
         <TableCell>{user.address}</TableCell>
         <TableCell>{user.job}</TableCell>
        </TableRow>
       ))}
      </TableBody>
     </Table>
    </TableContainer>
    <TablePagination
     rowsPerPageOptions={[rowPerPage, 10, 25, 100]}
     component="div"
     count={users.length}
     rowsPerPage={rowsPerPage}
     page={page}
     onPageChange={handleChangePage}
     onRowsPerPageChange={handleChangeRowsPerPage}
    />
   </Paper>
  </div>
 );
}

export default UserList;
