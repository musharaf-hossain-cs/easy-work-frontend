import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import fetchBackendJSON from '../../actions/Fetch';
import TasksInTable from '../tasks/TasksInTable';

function Space() {
 const { spaceid } = useParams();
 const navigate = useNavigate();
 const [tasks, setTasks] = useState([]);
 // eslint-disable-next-line prefer-const
 let tempTasks = [];

 const newTask = () => {
  navigate(`/spaces/${spaceid}/new-task`, { replace: false });
 };

 useEffect(() => {
  let fetchedData;
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
    }
   });
   setTasks(tempTasks);
   tempTasks = [];
  }
  fetchData();
 }, []);

 const assignUser = () => {
  navigate(`/spaces/${spaceid}/assign-member`, { replace: false });
 };

 return (
  <div>
   <h1 align="center">SpaceID: {spaceid}</h1>
   <hr />
   <Button variant="light" onClick={newTask}>
    Add Task
   </Button>
   <Button variant="light" onClick={assignUser}>
    Assign User
   </Button>
   <hr />
   <h3>All Tasks</h3>
   <TasksInTable tasks={tasks} rowPerPage={5} />
  </div>
 );
}

export default Space;
