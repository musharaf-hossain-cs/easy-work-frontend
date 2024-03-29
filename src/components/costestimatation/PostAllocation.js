import FormControl from '@mui/material/FormControl';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import { alpha, styled } from '@mui/material/styles';
import * as React from 'react';
import { useState } from 'react';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
 'label + &': {
  marginTop: theme.spacing(3),
 },
 '& .MuiInputBase-input': {
  borderRadius: 4,
  position: 'relative',
  backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
  border: '1px solid #ced4da',
  fontSize: 16,
  width: 'auto',
  padding: '10px 12px',
  transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
  // Use the system font instead of the default Roboto font.
  fontFamily: [
   '-apple-system',
   'BlinkMacSystemFont',
   '"Segoe UI"',
   'Roboto',
   '"Helvetica Neue"',
   'Arial',
   'sans-serif',
   '"Apple Color Emoji"',
   '"Segoe UI Emoji"',
   '"Segoe UI Symbol"',
  ].join(','),
  '&:focus': {
   boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
   borderColor: theme.palette.primary.main,
  },
 },
}));

export default function PostAllocation(props) {
 // eslint-disable-next-line no-unused-vars
 const { children, empCount, editEffort, editWage, id, prevWage, prevEffort, onlyWage } = props;
 const [effort, setEffort] = useState(prevEffort);
 const [wage, setWage] = useState(prevWage);

 const effortChange = (value) => {
  setEffort(value);
  editEffort(id, value, empCount);
 };

 const wageChange = (value) => {
  setWage(value);
  editWage(id, value);
 };

 return (
  <div>
   <div className={['mycontainer', 'container', 'row'].join(' ')}>
    <div className="col-3 pt-4">
     <strong className="align-middle">{children}</strong>
    </div>

    <FormControl variant="standard" className="col-3">
     <InputLabel shrink htmlFor="bootstrap-input">
      Employee Count
     </InputLabel>
     <BootstrapInput value={empCount} id="bootstrap-input" disabled />
    </FormControl>

    {!onlyWage && (
     <FormControl variant="standard" className="col-3">
      <InputLabel shrink htmlFor="bootstrap-input">
       Effort per Week
      </InputLabel>
      <BootstrapInput
       value={effort}
       id="bootstrap-input"
       onChange={(e) => effortChange(e.target.value)}
      />
     </FormControl>
    )}
    <FormControl variant="standard" className="col-3">
     <InputLabel shrink htmlFor="bootstrap-input">
      Wage per Hour
     </InputLabel>
     <BootstrapInput
      value={wage}
      id="bootstrap-input"
      onChange={(e) => wageChange(e.target.value)}
     />
    </FormControl>
   </div>
  </div>
 );
}
