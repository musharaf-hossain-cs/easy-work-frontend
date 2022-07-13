import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ButtonAppBar from './components/AppBar';
import AuthRoute from './routers/AuthRoute';
import GanttRoute from './routers/GanttRoute';
import HomeRoute from './routers/HomeRoute';
import MessageRoute from './routers/MessageRoute';
import NotificationRoute from './routers/NotificationRoute';
import UserRoute from './routers/UserRoute';

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
  <ThemeProvider theme={darkTheme}>
   <Router>
    <ButtonAppBar />
    <Routes>
     <Route path="/*" element={<HomeRoute />} />
     <Route path="/auth/*" element={<AuthRoute />} />
     <Route path="/messages/*" element={<MessageRoute />} />
     <Route path="/notifications/*" element={<NotificationRoute />} />
     <Route path="/user/*" element={<UserRoute />} />
     <Route path="/gantt/*" element={<GanttRoute />} />
    </Routes>
   </Router>
  </ThemeProvider>
 );
}

export default App;
