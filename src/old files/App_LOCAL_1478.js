import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ButtonAppBar from './components/AppBar';
import SideBar from './components/SideBar';
import AuthRoute from './routers/AuthRoute';
import HomeRoute from './routers/HomeRoute';
import MessageRoute from './routers/MessageRoute';
import NotificationRoute from './routers/NotificationRoute';
import UserRoute from './routers/UserRoute';
import './styles/App.css';

const darkTheme = createTheme({
 palette: {
  primary: {
   // Purple and green play nicely together.
   main: '#2E3B55',
  },
  secondary: {
   // This is green.A700 as hex.
   main: '#11cb5f',
  },
 },
});

function App() {
 return (
  <div className="App">
   <ThemeProvider theme={darkTheme}>
    <Router>
     <ButtonAppBar />
     <div className="SideBarContainer">
      <SideBar />
     </div>
     <div className="BodyContent">
      <Routes>
       <Route path="/*" element={<HomeRoute />} />
       <Route path="/auth/*" element={<AuthRoute />} />
       <Route path="/messages/*" element={<MessageRoute />} />
       <Route path="/notifications/*" element={<NotificationRoute />} />
       <Route path="/user/*" element={<UserRoute />} />
      </Routes>
     </div>
    </Router>
   </ThemeProvider>
  </div>
 );
}

export default App;
