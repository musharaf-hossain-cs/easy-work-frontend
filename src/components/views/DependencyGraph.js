/* eslint-disable no-unused-vars */
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import TableBootstrap from 'react-bootstrap/Table';

const columns = [
 'Task',
 'Activity Duration (du)',
 'Early Start Time (es)',
 'Early Finish Time (ef)',
 'Late Start Time (ls)',
 'Late Finish Time (lf)',
 'Slack Time (sk)',
];

function DependencyGraph({ spaceid, taskid, rows, imgData }) {
 const [rowsPerPage, setRowsPerPage] = useState(10);
 const [page, setPage] = useState(0);

 const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(+event.target.value);
  setPage(0);
 };

 return (
  imgData.image !== null && (
   <div>
    <div className="row w-100 mb-3">
     <div className="col-10">
      <img
       src={`http://127.0.0.1:8000/media/${imgData.image}`}
       alt={imgData.title}
       className="w-100"
      />
     </div>
     <div className="col-2">
      <TableBootstrap striped hover bordered>
       <thead>
        <tr>
         <th>Title</th>
         <th>Symbol</th>
        </tr>
       </thead>
       <tbody>
        {imgData.map.map((item, key) => (
         <tr key={key}>
          <td>{item[1]}</td>
          <td>{item[0]}</td>
         </tr>
        ))}
       </tbody>
      </TableBootstrap>
     </div>
    </div>
    <hr />
    <div className="alignCenter w-100">
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
         {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((task, idx) => (
          <TableRow
           hover
           // onClick={() => handleRowClick(task.taskid)}
           tabIndex={-1}
           key={idx}
          >
           <TableCell>{task.Name}</TableCell>
           <TableCell>{task.DU}</TableCell>
           <TableCell>{task.ES}</TableCell>
           <TableCell>{task.EF}</TableCell>
           <TableCell>{task.LS}</TableCell>
           <TableCell>{task.LF}</TableCell>
           <TableCell>{task.SK}</TableCell>
          </TableRow>
         ))}
        </TableBody>
       </Table>
      </TableContainer>
      <TablePagination
       rowsPerPageOptions={[5, 10, 25, 100]}
       component="div"
       count={rows.length}
       rowsPerPage={rowsPerPage}
       page={page}
       onPageChange={(event, newPage) => setPage(newPage)}
       onRowsPerPageChange={handleChangeRowsPerPage}
      />
     </Paper>
    </div>
   </div>
  )
 );
}

export default DependencyGraph;
