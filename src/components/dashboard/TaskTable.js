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
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useState } from 'react';

function createData(name, calories, fat, price) {
 return {
  name,
  calories,
  fat,
  price,
  history: [
   {
    date: '2020-01-05',
    customerId: '11091700',
    amount: 3,
   },
   {
    date: '2020-01-02',
    customerId: 'Anonymous',
    amount: 1,
   },
  ],
 };
}

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
    <TableCell component="th" scope="row">
     {row.name}
    </TableCell>
    <TableCell align="left">{row.calories}</TableCell>
    <TableCell align="left">{row.fat}</TableCell>
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
       <Typography variant="h6" gutterBottom component="div">
        Total Allocated Cost on the Project: ${allocatedBudget}
       </Typography>
      </Box>
     </Collapse>
    </TableCell>
   </TableRow>
  </>
 );
}

Row.propTypes = {
 row: PropTypes.shape({
  calories: PropTypes.number.isRequired,
  // carbs: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  history: PropTypes.arrayOf(
   PropTypes.shape({
    amount: PropTypes.number.isRequired,
    customerId: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
   })
  ).isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  //  protein: PropTypes.number.isRequired,
 }).isRequired,
};

const rows = [
 createData('Frozen yoghurt', 159, 6.0),
 createData('Ice cream sandwich', 237, 9.0),
 createData('Eclair', 262, 16.0),
 createData('Cupcake', 305, 3.7),
 createData('Gingerbread', 356, 16.0),
];

export default function CollapsibleTable() {
 return (
  <TableContainer component={Paper}>
   <Table aria-label="collapsible table">
    <TableHead>
     <TableRow>
      <TableCell />
      <TableCell className="col-4">Project Name</TableCell>
      <TableCell align="left" className="col-4">
       Start Date
      </TableCell>
      <TableCell align="left" className="col-4">
       End Date&nbsp;
      </TableCell>
      {/* <TableCell align="right">Carbs&nbsp;(g)</TableCell>
      <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
     </TableRow>
    </TableHead>
    <TableBody>
     {rows.map((row) => (
      <Row key={row.name} row={row} />
     ))}
    </TableBody>
   </Table>
  </TableContainer>
 );
}
