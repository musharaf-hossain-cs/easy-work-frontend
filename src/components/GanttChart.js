/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';

import Gantt, {
  Column,
  Dependencies,
  Editing,
  Item, Tasks,
  Toolbar,
  Validation
} from 'devextreme-react/gantt';

import fetchBackendJSON from '../actions/Fetch';


// import { dependencies, resourceAssignments, resources, tasks } from './data';


export default function GanttChart() {
    const [tasks, setTasks] = useState([]);
    const [dependencies, setDependencies] = useState([]);
    useEffect(() => {
        // eslint-disable-next-line prettier/prettier
        let fetchedData;
        async function fetchData() {
         fetchedData = await fetchBackendJSON('taskmgmt/getproject_tasks', 'POST', { project_id: 4 });
         console.log('In space');
         console.log(fetchedData);
         let temp = [];
         fetchedData.task_list.forEach((task) => {
            temp.push({
                id: task.id,
                parentId: task.parent_id,
                title: task.title,
                start: task.start,
                end: task.end,
                progress: 0,
            });
         });
         setTasks(temp);
         temp = [];
         fetchedData.dependency_list.forEach((dependency) => {
            setDependencies([
                ...dependencies,
                {
                    id: dependency.id,
                    predecessorId: dependency.predecessor_id,
                    successorId: dependency.successor_id,
                    type: 0,
                }

            ]);
         });
        //  fetchedData.task_list.forEach((task) => {
        //   tempTasks.push({
        //    taskid: task.id,
        //    title: task.title,
        //    priority: task.priority,
        //    dueDate: new Date(task.end),
        //    status: task.status,
        //   });
        //  });
        //  setTasks(tempTasks);
        //  tempTasks = [];
        }
        fetchData();
       }, []);
    //    console.log(tasks.length());
 return (
  <Gantt taskListWidth={500} scaleType="weeks" height={850} width={1550} >
   <Tasks dataSource={tasks} />
   <Dependencies dataSource={dependencies} />
   {/* <Resources dataSource={resources} />
   <ResourceAssignments dataSource={resourceAssignments} /> */}

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

// import React from 'react';

// import Gantt, { Column, Dependencies, Editing, Item, ResourceAssignments, Resources, Tasks, Toolbar, Validation } from 'devextreme-react/gantt';

// import { dependencies, resourceAssignments, resources, tasks } from './data';

// function GanttChart() {
//   return (
//     <Gantt
//       taskListWidth={500}
//       scaleType="weeks"
//       height={850}
//       width={1550}>

//       <Tasks dataSource={tasks} />
//       <Dependencies dataSource={dependencies} />
//       <Resources dataSource={resources} />
//       <ResourceAssignments dataSource={resourceAssignments} />

//       <Toolbar>
//         <Item name="undo" />
//         <Item name="redo" />
//         <Item name="separator" />
//         <Item name="collapseAll" />
//         <Item name="expandAll" />
//         <Item name="separator" />
//         <Item name="addTask" />
//         <Item name="deleteTask" />
//         <Item name="separator" />
//         <Item name="zoomIn" />
//         <Item name="zoomOut" />
//       </Toolbar>

//       <Column dataField="title" caption="Subject" width={300} />
//       <Column dataField="start" caption="Start Date" />
//       <Column dataField="end" caption="End Date" />

//       <Validation autoUpdateParentTasks />
//       <Editing enabled />
//     </Gantt>
//   );
// }

// export default GanttChart;
