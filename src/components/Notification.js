/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import fetchBackendJSON from '../actions/Fetch';

function Notification() {
 const [notifications, setNotifications] = useState([]);
 const receiverId = 2;
 const senderId = 1;
 const navigate = useNavigate();
 let tempNotifications = [];
 const goToTask = (spaceId, taskId) => {
  navigate(`/spaces/${spaceId}/tasks/${taskId}`);
 };
 useEffect(() => {
  let fetchedData;
  async function fetchData() {
   fetchedData = await fetchBackendJSON(`project/getNotification/${receiverId}`, 'GET', {
    receiver_id: receiverId,
   });
   console.log(fetchedData);
   fetchedData.data.forEach((notification) => {
    // console.log(notification);
    let notifyTime = notification.date_of_notification.split('T')[0];
    notifyTime += ` ${notification.date_of_notification.split('T')[1].split('.')[0]}`;
    tempNotifications.push({
     taskId: notification.task_id,
     taskTitle: notification.task_title,
     spaceId: notification.project_id,
     spaceTitle: notification.project_title,
     senderName: notification.user_name,
     notificationText: notification.notification_text,
     notificationTime: notifyTime,
    });
   });
   console.log('Checking Notifications');
   setNotifications(tempNotifications);
   console.log(tempNotifications);
   tempNotifications = [];
  }
  fetchData();
 }, []);
 return (
  <div>
   <h1>Notifications</h1>
   {notifications.map((val, key) => (
    <Card style={{ marginBottom: '15px' }}>
     <Card.Header>{val.notificationTime}</Card.Header>
     <Card.Body>
      <Card.Title>
       Notification from <i>{val.senderName}</i> on task <b>{val.taskTitle}</b> under project{' '}
       <b>{val.spaceTitle}</b>{' '}
      </Card.Title>
      <Card.Text>
       The User Says: <i>{val.notificationText}</i>
      </Card.Text>
      <Button variant="primary" onClick={() => goToTask(val.spaceId, val.taskId)}>
       Go to the Task
      </Button>
     </Card.Body>
    </Card>
   ))}
  </div>
 );
}

export default Notification;
