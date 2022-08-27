import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import fetchBackendJSON from '../../actions/Fetch';
import MilestoneUpdatePopup from './MilestoneUpdatePopup';

function Milestone({ milestone }) {
 const [btnName, setBtnName] = useState('More');
 const [showPopup, setShowPopup] = useState(false);

 const btnClicked = () => {
  setBtnName(btnName === 'More' ? 'Less' : 'More');
 };

 const deleteClicked = () => {
  let fetchedData;
  async function deleteMilestone() {
   fetchedData = await fetchBackendJSON(
    `taskmgmt/deleteMilestone/${milestone.data.id}`,
    'DELETE',
    {}
   );
   console.log(fetchedData);
   if (fetchedData === null) {
    console.log('Successfully deleted a milestone');
    window.location.reload(true);
   }
  }
  deleteMilestone();
 };

 const editMilestone = (title, description, status) => {
  const data = {
   title,
   description,
   status,
  };
  let fetchedData;
  async function sendData() {
   fetchedData = await fetchBackendJSON(
    `taskmgmt/updateMilestone/${milestone.data.id}`,
    'PATCH',
    data
   );
   console.log(fetchedData);
   if (fetchedData.id === milestone.data.id) {
    console.log('Successfully created a milestone');
    window.location.reload(true);
   }
  }

  sendData();
 };

 // console.log(milestone);
 return (
  <div>
   <Card className="mb-1">
    <Card.Header className="row">
     <Card.Title className="col-9">{milestone.data.title}</Card.Title>
     <div className="col-1">
      <strong className="p-2 float-end">{milestone.data.status}</strong>
     </div>

     <div className="col-1">
      <Button
       className="float-end"
       variant="light"
       onClick={deleteClicked}
       disabled={milestone.data.status === 'Passed'}
      >
       <DeleteIcon fontSize="small" />
      </Button>
     </div>

     <div className="col-1">
      <Button
       className="float-end"
       variant="light"
       onClick={() => setShowPopup(true)}
       disabled={milestone.data.status === 'Passed'}
      >
       <EditIcon fontSize="small" />
      </Button>
     </div>
    </Card.Header>

    <Card.Body>
     <Card.Text>{milestone.data.description}</Card.Text>

     {btnName === 'Less' && (
      <Table striped hover>
       <thead>
        <tr>
         <th>Attribute</th>
         <th>Value</th>
        </tr>
       </thead>

       <tbody>
        <tr>
         <td>Creation Date</td>
         <td>{milestone.data.creation_date}</td>
        </tr>

        <tr>
         <td>Relevant Task</td>
         <td>{milestone.task_name}</td>
        </tr>
       </tbody>
      </Table>
     )}
     <Button variant="success" onClick={btnClicked}>
      {btnName}
     </Button>
    </Card.Body>
   </Card>

   {showPopup && (
    <MilestoneUpdatePopup
     showPopup={setShowPopup}
     saveMilestone={editMilestone}
     oldTitle={milestone.data.title}
     oldDescription={milestone.data.description}
     oldStatus={milestone.data.status}
    />
   )}
  </div>
 );
}

export default Milestone;
