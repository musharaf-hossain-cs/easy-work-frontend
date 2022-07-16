import React from 'react';
import { Routes } from 'react-router-dom';
import GanttChart from '../components/GanttChart';

function GanttRoute() {
 return (
  <>
   <GanttChart />
   <Routes>
    {/* <Route path="/*" element={} />
    <Route path="/*" element={} /> */}
   </Routes>
  </>
 );
}

export default GanttRoute;
