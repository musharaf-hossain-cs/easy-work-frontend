import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GanttChart from '../components/GanttChart';
import NewSpace from '../components/spaces/NewSpace';
import Space from '../components/spaces/Space';
import Spaces from '../components/spaces/Spaces';
import NewTask from '../components/tasks/NewTask';
import Task from '../components/tasks/Task';
import AddUser from '../components/users/AddUser';

function SpaceRoute() {
 return (
  <Routes>
   <Route path="*" element={<Spaces />} />
   <Route path="new-space/*" element={<NewSpace />} />
   <Route path=":spaceid/*" element={<Space />} />
   <Route path=":spaceid/tasks/*" element={<Space />} />
   <Route path=":spaceid/tasks/:taskid/*" element={<Task />} />
   <Route path=":spaceid/tasks/:taskid/new-task/*" element={<NewTask />} />
   <Route path=":spaceid/tasks/:taskid/assign-member/*" element={<AddUser />} />
   <Route path=":spaceid/new-task/*" element={<NewTask />} />
   <Route path=":spaceid/ganttview/*" element={<GanttChart />} />
   <Route path=":spaceid/assign-member/*" element={<AddUser />} />
  </Routes>
 );
}

export default SpaceRoute;
