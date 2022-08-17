/* eslint-disable no-unused-vars */
import TreeItem from '@mui/lab/TreeItem';
import { useEffect, useState } from 'react';
import fetchBackendJSON from '../../actions/Fetch';

function TaskItem(props) {
 // eslint-disable-next-line no-unused-vars
 const [tasks, setTasks] = useState([]);
 const { taskid, taskTitle } = props;

 useEffect(() => {
  console.log(taskid, taskTitle);
 }, []);

 useEffect(() => {
  let fetchedData;
  const tempTasks = [];
  async function fetchData() {
   fetchedData = await fetchBackendJSON('taskmgmt/getsubtasks', 'POST', { task_id: taskid });
   fetchedData.subtask_list.forEach((task) => {
    console.log(task);
    tempTasks.push({
     taskid: task.id,
     title: task.title,
     priority: task.priority,
     dueDate: new Date(task.end),
     status: task.status,
    });
   });
   setTasks(tempTasks);
  }
  fetchData();
 }, []);
 return (
  <TreeItem nodeId={`${taskid}`} label={taskTitle}>
   {tasks.map((task, idx) => (
    <TaskItem key={idx} taskid={task.taskid} taskTitle={task.title} />
   ))}
  </TreeItem>
 );
}
export default TaskItem;
