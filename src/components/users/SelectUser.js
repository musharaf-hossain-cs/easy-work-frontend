import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';

const columns = [
 { field: 'label', headerName: 'Full Name', width: 200 },
 { field: 'email', headerName: 'Email', width: 250 },
 { field: 'joiningDate', headerName: 'Joining Date', width: 130 },
 { field: 'job_name', headerName: 'Job', width: 250 },
 { field: 'assignedCount', headerName: '#Assigned Tasks', width: 130 },
];

function SelectUser(props) {
 const { rows, handleMemberChoice } = props;

 const handleSelection = (items) => {
  handleMemberChoice(items);
 };
 return (
  <div style={{ height: Math.min(rows.length, 5) * 80 + 100, width: '100%' }}>
   <DataGrid
    rows={rows}
    columns={columns}
    pageSize={Math.min(5, rows.length)}
    rowsPerPageOptions={[2, 5, 8, 10]}
    checkboxSelection
    onSelectionModelChange={(items) => handleSelection(items)}
   />
  </div>
 );
}

export default SelectUser;
