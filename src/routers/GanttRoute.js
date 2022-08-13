import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GanttChart from '../components/GanttChart';

function GanttRoute() {
 return (
  <Routes>
   <Route path="*" element={<GanttChart />} />
  </Routes>
 );
}

export default GanttRoute;
