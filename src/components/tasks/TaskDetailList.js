import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import fetchBackendJSON from '../../actions/Fetch';
import { storage } from '../../firebase';
import styles from '../../styles/TaskDetailList.module.css';

function TaskDetailList({ taskid, spaceid, taskDetailList }) {
 const [progresspercent, setProgresspercent] = useState(0);
 const [attachments, setAttachments] = useState([]);
 // eslint-disable-next-line no-unused-vars
 const [selectedFile, setSelectedFile] = useState(null);

 const addDownloadURL = (url, name) => {
  console.log(url);
  setAttachments([...attachments, { url, name }]);
 };
 // eslint-disable-next-line no-unused-vars
 const handleFileSelection = (e) => {
  e.preventDefault();
  const file = e.target.files[0];
  setSelectedFile(file);
  console.log('file: ', file);

  if (!file) return;
  const storageRef = ref(storage, `files/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
   'state_changed',
   (snapshot) => {
    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    setProgresspercent(progress);
   },
   (error) => {
    // eslint-disable-next-line no-alert
    alert(error);
   },
   () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
     addDownloadURL(downloadURL, file.name);
    });
   }
  );
 };

 console.log('in task detail list: ', spaceid, taskDetailList);

 const fileSendClicked = () => {
  async function SendFile() {
   const res3 = await fetchBackendJSON('project/setAttachments', 'POST', {
    task_id: taskid,
    attachments,
   });
   if (res3.success) {
    console.log('Successfully send files');
   } else {
    console.log('file send failed');
   }
  }

  if (attachments.length > 0) SendFile();
 };

 const formatDate = (date) =>
  [date.getFullYear(), date.getMonth() + 1, date.getDate() + 1].join('-');

 return (
  <>
   {taskDetailList.map((taskDetails, key1) => (
    <div key={key1}>
     <div>
      <h2>{taskDetails.title}</h2>
      <h6>Description: {taskDetails.description}</h6>
     </div>
     <hr />
     <div className="row">
      <div className="col-6">
       <b>Properties</b>
       <div className={[styles.paddingLeft20px, styles.margin10px].join(' ')}>
        Priority: {taskDetails.priority} <br />
        Status: {taskDetails.status} <br />
        Slack Time: {taskDetails.slackTime}
       </div>
      </div>
      <div className="col-6">
       <b>All Dates:</b>
       <div className={[styles.paddingLeft20px, styles.margin10px].join(' ')}>
        Create Date: {formatDate(taskDetails.createDate)} <br />
        Start Date: {formatDate(taskDetails.startDate)} <br />
        End Date: {formatDate(taskDetails.endDate)}
       </div>
      </div>

      <div className="col-6">
       <b>All Attachments:</b> <br />
       <div className={[styles.paddingLeft20px, styles.margin10px].join(' ')}>
        {taskDetails.attachments !== undefined &&
         taskDetails.attachments.length > 0 &&
         taskDetails.attachments.map((val, key) => (
          <a href={val.url} key={key} download>
           {' '}
           {val.name}
          </a>
         ))}
       </div>
      </div>

      <Form className="col-6">
       <Form.Group className="mb-3" controlId="formAttachFile">
        <Form.Label>
         <strong>
          Attachments {progresspercent === 100 || progresspercent === 0 ? '' : progresspercent}
         </strong>
        </Form.Label>
        {/* files list */}
        <ul className="mb-3 col-6">
         {attachments.map((val, key) => (
          <li key={key}>{val.name}</li>
         ))}
        </ul>
        <Form.Control
         type="file"
         placeholder="Choose a file"
         // value={selectedFile}
         onKeyPress={(e) => {
          if (e.key === 'Enter') e.preventDefault();
         }}
         onChange={(e) => {
          // eslint-disable-next-line prefer-destructuring
          handleFileSelection(e);
          // setAttachments([...attachments, e.target.files[0]]);
         }}
        />
       </Form.Group>
       <Button variant="success" className="float-end" onClick={fileSendClicked}>
        Save
       </Button>
      </Form>

      {/* <div className="col-6">
       <b>All Comments:</b> <br />
       <div className={[styles.paddingLeft20px, styles.margin10px].join(' ')}>
        {taskDetails.comments.map((val, key) => (
         <>
          <span key={key}>{val}</span> <br />
         </>
        ))}
       </div>
      </div> */}
     </div>
    </div>
   ))}
  </>
 );
}

export default TaskDetailList;
