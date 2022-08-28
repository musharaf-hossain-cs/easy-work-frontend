import { useEffect, useState } from 'react';
// import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { useParams } from 'react-router-dom';
import fetchBackendJSON from '../../actions/Fetch';
import NewMilestonePopup from './NewMilestonePopup';

function NewMilestone() {
 const [tasks, setTasks] = useState([]);
 const [title, setTitle] = useState('');
 const { spaceid } = useParams();
 // eslint-disable-next-line no-unused-vars
 const [showPopup, setShowPopup] = useState(false);
 const [selectedIdx, setSelectedIdx] = useState(0);

 const handleCheck = (checked, idx) => {
  console.log('check: ', checked, idx);
  if (checked) {
   setSelectedIdx(idx);
   setShowPopup(true);
  }
 };

 const saveMilestone = (mTitle, description, idx) => {
  // console.log(mTitle, description, idx);
  const data = {
   title: mTitle,
   description,
   task: tasks[idx].id,
  };

  // addMilestone
  let fetchedData;
  async function sendData() {
   fetchedData = await fetchBackendJSON('taskmgmt/addMilestone', 'POST', data);
   console.log(fetchedData);
   if (fetchedData.task === tasks[idx].id) {
    console.log('Successfully created a milestone');
    window.location.reload(true);
   }
  }

  sendData();
 };

 useEffect(() => {
  let fetchedData;
  // let tempTasks = [];
  async function fetchData() {
   fetchedData = await fetchBackendJSON('taskmgmt/gettaskslist', 'POST', {
    project_id: spaceid,
   });
   console.log(fetchedData);
   setTitle(fetchedData.title);
   setTasks(fetchedData.task_list);
  }
  fetchData();
 }, []);
 return (
  <div>
   <h2 style={{ color: 'green' }} className="w-75">
    <strong>{title} - New Milestone</strong>
   </h2>
   <Table hover striped bordered>
    <thead>
     <tr>
      <th>Task</th>
      <th>Description</th>
      <th>Priority</th>
      <th>Status</th>
      <th>Is Milestone ?</th>
     </tr>
    </thead>

    <tbody>
     {tasks.map((task, idx) => (
      <tr key={idx}>
       <td>{task.title}</td>
       <td>{task.description}</td>
       <td>{task.priority}</td>
       <td>{task.status}</td>
       <td>
        <Form.Check
         id={idx}
         checked={task.milestone}
         disabled={task.milestone}
         onChange={(e) => handleCheck(e.target.checked, idx)}
        />
       </td>
      </tr>
     ))}
    </tbody>
   </Table>
   {showPopup && (
    <NewMilestonePopup showPopup={setShowPopup} saveMilestone={saveMilestone} index={selectedIdx} />
   )}
  </div>
 );
}

export default NewMilestone;
