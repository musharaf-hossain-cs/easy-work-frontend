import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import fetchBackendJSON from '../../actions/Fetch';
// import styles from '../../styles/TaskDetail.module.css';
// import TaskDetail from './TaskDetail';
import UserList from '../users/UserList';
import TaskDetailList from './TaskDetailList';
import TasksInTable from './TasksInTable';

function Task() {
 const { spaceid, taskid } = useParams();
 const navigate = useNavigate();
 const [taskDetails, setTaskDetails] = useState([]);
 const [tasks, setTasks] = useState([]);
 const [users, setUsers] = useState([]);
 const [toTask, setToTask] = useState(0);
 // eslint-disable-next-line prefer-const
 let tempTasks = [];
 // eslint-disable-next-line prefer-const

 useEffect(() => {
  let fetchedData;
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
   tempTasks = [];
  }
  fetchData();
 }, [toTask]);

 useEffect(() => {
  let fetchedData;
  const tempUser = [];
  async function fetchData() {
   fetchedData = await fetchBackendJSON('user/getSelectedUsers', 'POST', {
    project_id: spaceid,
    task_id: taskid,
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
 }, [toTask]);

 useEffect(() => {
  let fetchedData;
  async function fetchData() {
   fetchedData = await fetchBackendJSON('taskmgmt/gettaskdetails', 'POST', { task_id: taskid });
   const task = fetchedData.task_info;
   console.log(task);
   const detailedTask = [
    {
     taskid: task.id,
     title: task.title,
     description: task.description,
     startDate: new Date(task.start),
     endDate: new Date(task.end),
     createDate: new Date(task.creation_date),
     status: task.status,
     slackTime: task.slack_time,
     attachments: ['requirements.pdf', 'resources.zip'],
     comments: ['comment-id1', 'comment-id2', 'comment-id3'],
    },
   ];

   setTaskDetails(detailedTask);
   console.log(taskDetails);
  }
  fetchData();
 }, []);

 const deleteTask = () => {
  async function sendData() {
   const res = await fetchBackendJSON(`project/deleteTask/${taskid}`, 'GET');
   console.log(res);
   navigate(`/spaces/${spaceid}/tasks`);
  }
  sendData();
 };

 return (
  <div className="mycontainer container">
   <TaskDetailList spaceid={spaceid} taskid={taskid} taskDetailList={taskDetails} />
   {/* <TaskDetail spaceid={spaceid} taskid={taskid} taskDetails={taskDetails} /> */}
   <Button
    variant="primary"
    style={{ margin: '5px' }}
    onClick={() => navigate(`/spaces/${spaceid}/tasks/${taskid}/edit-task`, { replace: false })}
   >
    Edit Task
   </Button>
   <Button
    variant="primary"
    style={{ margin: '5px' }}
    onClick={() => navigate(`/spaces/${spaceid}/tasks/${taskid}/new-task`, { replace: false })}
   >
    Add Subtask
   </Button>
   <Button
    variant="primary"
    style={{ margin: '5px' }}
    onClick={() => navigate(`/spaces/${spaceid}/tasks/${taskid}/assign-member`, { replace: false })}
   >
    Assign Members
   </Button>
   <Button variant="danger" style={{ marginLeft: '800px' }} onClick={deleteTask}>
    Delete Task
   </Button>
   <hr />
   <h3>All SubTasks</h3>
   <TasksInTable tasks={tasks} rowPerPage={3} toTaskSet={setToTask} />
   <hr />
   <h3>User List</h3>
   <UserList users={users} rowPerPage={5} />
  </div>
 );
}

export default Task;
