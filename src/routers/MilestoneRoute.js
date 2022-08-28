import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Milestones from '../components/milestones/Milestones';
import NewMilestone from '../components/milestones/NewMilestone';

function MilestoneRoute() {
 return (
  <Routes>
   <Route path="/*" element={<Milestones />} />
   <Route path="/:spaceid/*" element={<Milestones />} />
   <Route path="/:spaceid/new-milestone/*" element={<NewMilestone />} />
  </Routes>
 );
}

export default MilestoneRoute;
