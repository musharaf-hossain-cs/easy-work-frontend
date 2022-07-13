import React from 'react';
import { Routes } from 'react-router-dom';
import Gantt from '../components/Gantt';

function GanttRoute() {
 return (
  <>
   <Gantt />
   <Routes>
    {/* <Route path="/*" element={} />
    <Route path="/*" element={} /> */}
   </Routes>
  </>
 );
}

export default GanttRoute;
