import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, SearchIconWrapper, StyledInputBase } from '../styled_components/SearchBar';

// style={{ background: '#2E3B55' }}

export default function ButtonAppBar() {
 const userid = 1;
 const nav = useNavigate();
 return (
  <Box sx={{ flexGrow: 1 }}>
   <AppBar position="static">
    <Toolbar>
     <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
      <MenuIcon />
     </IconButton>
     <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      EasyWork
     </Typography>
     <Search>
      <SearchIconWrapper>
       <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
       placeholder="Search…"
       inputProps={{ 'aria-label': 'search' }}
       //  style={{ width: '100%' }}
       //  sx={{ flexGrow: 1 }}
       fullWidth
      />
     </Search>

     <Button color="inherit" onClick={() => nav('/messages', { replace: false })}>
      Messages
     </Button>
     <Button color="inherit" onClick={() => nav('/notifications', { replace: false })}>
      Notifications
     </Button>
     <Button color="inherit" onClick={() => nav('/auth/signup', { replace: false })}>
      SignUp
     </Button>
     <Button
      color="inherit"
      onClick={() => nav(`/user/${userid}/view-profile`, { replace: false })}
     >
      User
     </Button>
     <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ marginLeft: 2 }}>
      <MenuIcon />
     </IconButton>
    </Toolbar>
   </AppBar>
  </Box>
 );
}
