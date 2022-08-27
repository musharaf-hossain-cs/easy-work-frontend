/* eslint-disable prefer-const */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import fetchBackendJSON from '../../actions/Fetch';
import UserList from '../users/UserList';
import TaskDetailList from './TaskDetailList';
import TasksInTable from './TasksInTable';

import styles from '../../styles/TaskDetail.module.css';

function Task() {
 const { spaceid, taskid } = useParams();
 const navigate = useNavigate();
 const userid = 2;
 const [taskDetails, setTaskDetails] = useState([]);
 const [tasks, setTasks] = useState([]);
 const [users, setUsers] = useState([]);
 const [toTask, setToTask] = useState(0);
 const [comment, setComment] = useState('');
 const [comments, setComments] = useState([]);
 const [name, setName] = useState('');
 // eslint-disable-next-line prefer-const
 let tempTasks = [];
 let tempComments = [];
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
 useEffect(() => {
  let fetchedData;
  async function fetchData() {
   fetchedData = await fetchBackendJSON('project/getcomments', 'POST', { task_id: taskid });
   console.log(fetchedData);
   fetchedData.comments_list.forEach((cmnt) => {
    console.log('Date');
    let commentTime = cmnt.comment.comment_time.split('T')[0];
    commentTime += ` ${cmnt.comment.comment_time.split('T')[1].split('.')[0]}`;
    console.log(commentTime);
    tempComments.push({
     commenterName: cmnt.user,
     comment: cmnt.comment.comment,
     commentTime,
    });
   });
   setComments(tempComments);
   tempComments = [];
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

 const submitComment = (e) => {
  e.preventDefault();
  console.log('Submitted');
  const data = {
   task: taskid,
   user: userid,
   comment,
  };
  console.log(data);
  async function sendData() {
   const res = await fetchBackendJSON('project/addcomments', 'POST', data);
   console.log(res);
   setComment('');
   window.location.reload(true);
   // navigate(`/spaces/${spaceid}/tasks/${taskid}/`);
  }
  sendData();
 };

 return (
  <div>
   <div className={styles.left}>
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
     onClick={() =>
      navigate(`/spaces/${spaceid}/tasks/${taskid}/assign-member`, { replace: false })
     }
    >
     Assign Members
    </Button>
    <Button variant="danger" style={{ marginLeft: '500px' }} onClick={deleteTask}>
     Delete Task
    </Button>
    <hr />
    <h3>All SubTasks</h3>
    <TasksInTable tasks={tasks} rowPerPage={3} toTaskSet={setToTask} />
    <hr />
    <h3>User List</h3>
    <UserList users={users} rowPerPage={5} />
   </div>
   <div className={styles.vertical} />
   <div className={styles.right}>
    <h2>Comments</h2>
    <hr />
    <div>
     {comments.map((val, key) => (
      <>
       <span key={key}>
        {' '}
        <b>{val.commenterName}</b>
       </span>{' '}
       <br />
       <span key={key}> {val.comment}</span> <br />
       <span key={key}>
        {' '}
        <i> {val.commentTime}</i>
       </span>{' '}
       <br />
       <hr />
      </>
     ))}
    </div>
    <h3>Add Comment</h3>
    <Form.Group className="mb-3 col-3" controlId="formTaskDescription">
     <Form.Control
      as="textarea"
      rows={4}
      value={comment}
      placeholder="Put your Comment Here"
      onChange={(e) => setComment(e.target.value)}
      onKeyPress={(e) => {
       if (e.key === 'Enter') e.preventDefault();
      }}
     />
    </Form.Group>
    <Button variant="primary" style={{ margin: '5px' }} onClick={submitComment}>
     Submit Comment
    </Button>
   </div>
  </div>
 );
}

export default Task;
