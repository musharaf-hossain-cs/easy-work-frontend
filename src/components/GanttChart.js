/* eslint-disable prettier/prettier */
import React from 'react';

import Gantt, {
    Column,
    Dependencies,
    Editing,
    Item,
    ResourceAssignments,
    Resources,
    Tasks,
    Toolbar,
    Validation
} from 'devextreme-react/gantt';

import { dependencies, resourceAssignments, resources, tasks } from './data';

function GanttChart() {
 return (
  <Gantt taskListWidth={500} scaleType="weeks" height={800} width="1550" >
   <Tasks dataSource={tasks} />
   <Dependencies dataSource={dependencies} />
   <Resources dataSource={resources} />
   <ResourceAssignments dataSource={resourceAssignments} />

   <Toolbar>
    <Item name="undo" />
    <Item name="redo" />
    <Item name="separator" />
    <Item name="collapseAll" />
    <Item name="expandAll" />
    <Item name="separator" />
    <Item name="addTask" />
    <Item name="deleteTask" />
    <Item name="separator" />
    <Item name="zoomIn" />
    <Item name="zoomOut" />
   </Toolbar>

   <Column dataField="title" caption="Subject" width={300} />
   <Column dataField="start" caption="Start Date" />
   <Column dataField="end" caption="End Date" />

   <Validation autoUpdateParentTasks />
   <Editing enabled />
  </Gantt>
 );
}

export default GanttChart;
