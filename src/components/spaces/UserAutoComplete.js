import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import * as React from 'react';

const top100Films = [
 { label: 'The Shawshank Redemption', year: 1994 },
 { label: 'The Godfather', year: 1972 },
];

export default function ComboBox() {
 return (
  <Autocomplete
   disablePortal
   id="combo-box-demo"
   options={top100Films}
   sx={{ width: 300 }}
   // eslint-disable-next-line react/jsx-props-no-spreading
   renderInput={(params) => <TextField {...params} label="Movie" />}
  />
 );
}
