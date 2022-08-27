import FormControl from '@mui/material/FormControl';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import { alpha, styled } from '@mui/material/styles';
import * as React from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';

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
    <b className="mb-3 col-3">{children}</b>
    <Form.Group className="mb-3 col-3" controlId="countField">
     <Form.Control
      type="number"
      placeholder="Numbers"
      value={empCount}
      disabled
      // onChange={(e) => setCount(e.target.value)}
      // onKeyPress={(e) => {
      //  if (e.key === 'Enter') e.preventDefault();
      // }}
     />
    </Form.Group>

    <FormControl variant="standard" className="mb-3 col-3">
     <InputLabel shrink htmlFor="bootstrap-input">
      Employee Count
     </InputLabel>
     <BootstrapInput value={empCount} id="bootstrap-input" disabled />
    </FormControl>

    {!onlyWage && (
     <Form.Group className="mb-3 col-3" controlId="effortField">
      <Form.Control
       type="text"
       placeholder="Weekly Effort"
       value={effort}
       onChange={(e) => effortChange(e.target.value)}
       onKeyPress={(e) => {
        if (e.key === 'Enter') e.preventDefault();
       }}
      />
     </Form.Group>
    )}
    <Form.Group className="mb-3 col-3" controlId="wageField">
     <Form.Control
      type="text"
      placeholder="Wage per hour"
      value={wage}
      onChange={(e) => wageChange(e.target.value)}
      onKeyPress={(e) => {
       if (e.key === 'Enter') e.preventDefault();
      }}
     />
    </Form.Group>
   </div>
  </div>
 );
}
