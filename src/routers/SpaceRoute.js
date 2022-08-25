import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ShowDependencyGraph from '../components/spaces/ShowDependencyGraph';
import Space from '../components/spaces/Space';
import Spaces from '../components/spaces/Spaces';
import NewTask from '../components/tasks/NewTask';
import Task from '../components/tasks/Task';
import AddUser from '../components/users/AddUser';
import GanttChart from '../components/views/GanttChart';
import TreeView from '../components/views/TreeView';

function SpaceRoute() {
 return (
  <Routes>
   <Route path="*" element={<Spaces />} />
   <Route path=":spaceid/*" element={<Space />} />
   <Route path=":spaceid/tasks/*" element={<Space />} />
   <Route path=":spaceid/tasks/:taskid/*" element={<Task />} />
   <Route path=":spaceid/tasks/:taskid/new-task/*" element={<NewTask />} />
   <Route path=":spaceid/tasks/:taskid/assign-member/*" element={<AddUser />} />
   <Route path=":spaceid/new-task/*" element={<NewTask />} />
   <Route path=":spaceid/ganttview/*" element={<GanttChart />} />
   <Route path=":spaceid/treeview/*" element={<TreeView />} />
   <Route path=":spaceid/assign-member/*" element={<AddUser />} />
   <Route path=":spaceid/dependency-graph/*" element={<ShowDependencyGraph />} />
  </Routes>
 );
}

export default SpaceRoute;
