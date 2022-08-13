import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import fetchBackendJSON from '../../actions/Fetch';
// import styles from '../../styles/TaskDetail.module.css';
// import TaskDetail from './TaskDetail';
import TaskDetailList from './TaskDetailList';
import TasksInTable from './TasksInTable';

// const taskDets = {
//  title: 'Design home page',
//  description: 'Home page design using react.js',
//  priority: 'low',
//  startDate: new Date('June 19, 2022'),
//  endDate: new Date('July 15, 2022'),
//  createDate: new Date('June 9, 2022'),
//  status: 'active',
//  attachments: ['requirements.pdf', 'resources.zip'],
//  comments: ['comment-id1', 'comment-id2', 'comment-id3'],
// };

function Task() {
 const { taskid, spaceid } = useParams();
 const navigate = useNavigate();
 const [taskDetails, setTaskDetails] = useState([]);
 const [tasks, setTasks] = useState([]);
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
 }, []);

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

 return (
  <div className="mycontainer container">
   <TaskDetailList spaceid={spaceid} taskid={taskid} taskDetailList={taskDetails} />
   <hr />
   <h3>All SubTasks</h3>
   <TasksInTable tasks={tasks} rowPerPage={3} />
   <hr />
   <Button
    variant="light"
    onClick={() => navigate(`/spaces/${spaceid}/tasks/${taskid}/new-task`, { replace: false })}
   >
    Add Subtask
   </Button>
  </div>
 );
}

export default Task;
