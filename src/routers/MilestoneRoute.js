import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Milestones from '../components/milestones/Milestones';
import NewMilestone from '../components/milestones/NewMilestone';
import ProjectChoiceForMilestone from '../components/milestones/ProjectChoiceForMilestone';

function MilestoneRoute() {
 return (
  <Routes>
   <Route path="/*" element={<ProjectChoiceForMilestone />} />
   <Route path="/:spaceid/*" element={<Milestones />} />
   <Route path="/:spaceid/new-milestone/*" element={<NewMilestone />} />
  </Routes>
 );
}

export default MilestoneRoute;
