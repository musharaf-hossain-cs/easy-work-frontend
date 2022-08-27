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
 const [title, setTitle] = useState('');
 // eslint-disable-next-line prefer-const
 let tempTasks = [];

 useEffect(() => {
  let fetchedData;
  async function fetchData() {
   fetchedData = await fetchBackendJSON('taskmgmt/gettaskslist', 'POST', { project_id: spaceid });
   console.log('In space');
   console.log(fetchedData);
   setTitle(fetchedData.title);
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
   <h1 align="center" style={{ color: 'green' }}>
    <strong>{title}</strong>
   </h1>
   <hr />
   <Button
    variant="light"
    margin-right="10px"
    onClick={() => navigate(`/spaces/${spaceid}/new-task`, { replace: false })}
   >
    Add Task
   </Button>
   <Button variant="light" margin-right="10px" onClick={assignUser}>
    Assign User
   </Button>
   <Button
    variant="light"
    margin-right="10px"
    onClick={() => navigate(`/spaces/${spaceid}/ganttview`, { replace: false })}
   >
    View Gantt Chart
   </Button>
   <Button
    variant="light"
    margin-right="10px"
    onClick={() => navigate(`/spaces/${spaceid}/treeview`, { replace: false })}
   >
    Tree View
   </Button>
   <Button
    variant="light"
    margin-right="10px"
    onClick={() => navigate(`/spaces/${spaceid}/dependency-graph`, { replace: false })}
   >
    Dependency Graph
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
