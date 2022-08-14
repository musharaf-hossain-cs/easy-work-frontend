import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import fetchBackendJSON from '../../actions/Fetch';
import TasksInTable from '../tasks/TasksInTable';
import UserList from '../users/UserList';

function Space() {
 const { spaceid } = useParams();
 const navigate = useNavigate();
 const [tasks, setTasks] = useState([]);
 const [users, setUsers] = useState([]);
 // eslint-disable-next-line prefer-const
 let tempTasks = [];

 const newTask = () => {
  navigate(`/spaces/${spaceid}/new-task`, { replace: false });
 };

 const goToGanttView = () => {
  navigate(`/spaces/${spaceid}/ganttview`, { replace: false });
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

 const tempFunction = (id) => {
  console.log(id);
 };

 useEffect(() => {
  let fetchedData;
  const tempUser = [];
  async function fetchData() {
   fetchedData = await fetchBackendJSON('user/getSelectedUsers', 'POST', {
    project_id: spaceid,
    task_id: -1,
   });
   console.log('In space');
   console.log(fetchedData);
   fetchedData.members.forEach((user) => {
    tempUser.push({
     id: user.id,
     name: `${user.first_name} ${user.last_name}`,
     email: user.email,
     mobile: user.mobile,
     address: user.address,
     job: user.designation,
    });
   });
   setUsers(tempUser);
  }
  fetchData();
 }, []);

 const assignUser = () => {
  navigate(`/spaces/${spaceid}/assign-member`, { replace: false });
 };

 return (
  <div className="scrollable2">
   <h1 align="center">SpaceID: {spaceid}</h1>
   <hr />
   <Button variant="light" margin-right="10px" onClick={newTask}>
    Add Task
   </Button>
   <Button variant="light" margin-right="10px" onClick={assignUser}>
    Assign User
   </Button>
   <Button variant="light" margin-right="10px" onClick={goToGanttView}>
    View Gantt Chart
   </Button>
   <hr />
   <h3>All Tasks</h3>
   <TasksInTable tasks={tasks} rowPerPage={5} toTaskSet={tempFunction} />
   <hr />
   <h3>All Users</h3>
   <UserList users={users} rowPerPage={5} />
  </div>
 );
}

export default Space;
