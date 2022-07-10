import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import { ButtonGroup } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import React from 'react';
import './App.css';
import logo from './logo.svg';

function App() {
 const [value, setValue] = React.useState(30);

 const handleChange = (event, newValue) => {
  setValue(newValue);
 };

 return (
  <div className="App">
   <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <p>
     Edit <code>src/App.js</code> and save to reload.
    </p>
    <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
     Learn React
    </a>
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
     <Button>One</Button>
     <Button>Two</Button>
     <Button>Three</Button>
    </ButtonGroup>

    <Box sx={{ width: 200 }}>
     <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
      <VolumeDown />
      <Slider aria-label="Volume" value={value} onChange={handleChange} />
      <VolumeUp />
     </Stack>
     <Slider disabled defaultValue={30} aria-label="Disabled slider" />
    </Box>
   </header>
  </div>
 );
}

export default App;
