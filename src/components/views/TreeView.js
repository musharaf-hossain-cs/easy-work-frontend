/* eslint-disable no-unused-vars */
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TreeItem from '@mui/lab/TreeItem';
import TreeView from '@mui/lab/TreeView';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetchBackendJSON from '../../actions/Fetch';
import TaskItem from './TaskItem';

export default function MultiSelectTreeView() {
 const [tasks, setTasks] = useState([]);
 const { spaceid } = useParams();
 // eslint-disable-next-line no-unused-vars
 const [flags, setFlags] = useState([]);
 const [title, setTitle] = useState('');

 useEffect(() => {
  let fetchedData;
  async function fetchData() {
   fetchedData = await fetchBackendJSON(`project/getproject/${spaceid}`, 'GET', {});
   console.log('In tree view: ', fetchedData);
   setTitle(fetchedData[0].title);
  }
  fetchData();
 }, []);

 useEffect(() => {
  let fetchedData;
  const tempTasks = [];
  const tempFlags = [];
  async function fetchData() {
   fetchedData = await fetchBackendJSON('taskmgmt/gettaskslist', 'POST', { project_id: spaceid });
   console.log('In space');
   console.log(fetchedData);
   fetchedData.task_list.forEach((task) => {
    if (task.parent_id === 0) {
     tempTasks.push({
      taskid: task.id,
      title: task.title,
      priority: task.priority,
      dueDate: new Date(task.end),
      status: task.status,
     });
     tempFlags.push(false);
    }
   });
   setTasks(tempTasks);
   setFlags(tempFlags);
  }
  fetchData();
 }, []);

 // eslint-disable-next-line no-unused-vars
 const treeItemClicked = (idx) => {
  setFlags((old) => {
   const newFlags = JSON.parse(JSON.stringify(old));
   if (newFlags[idx]) newFlags[idx] = false;
   else newFlags[idx] = true;
   return newFlags;
  });
 };

 return (
  <div>
   <h2 align="center" style={{ color: 'green' }}>
    <strong>{title} - Tree View</strong>
   </h2>
   <TreeView
    aria-label="multi-select"
    defaultCollapseIcon={<ExpandMoreIcon />}
    defaultExpandIcon={<ChevronRightIcon />}
    multiSelect
    sx={{ flexGrow: 1, overflowY: 'auto' }}
   >
    <TreeItem nodeId="root" label="All Tasks">
     {tasks.map((task, idx) => (
      <TaskItem key={idx} taskid={task.taskid} taskTitle={task.title} />
     ))}
    </TreeItem>
   </TreeView>
  </div>
 );
}
