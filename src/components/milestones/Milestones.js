import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import fetchBackendJSON from '../../actions/Fetch';
import Milestone from './Milestone';

// const milestones = [
//  {
//   title: 'Milestone A',
//   status: 'Passed',
//   description: 'Description sdkf sldkfj sfsklfjd slfkj asldkfj safaslkfdj saf ',
//  },
//  {
//   title: 'Milestone B',
//   status: 'Upcoming',
//   description: 'Description sdkf sldkfj sfsklfjd slfkj asldkfj safaslkfdj saf ',
//  },
// ];

function Milestones() {
 const [milestones, setMilestones] = useState([]);
 const { spaceid } = useParams();
 const navigate = useNavigate();

 useEffect(() => {
  let fetchedData;
  async function fetchData() {
   fetchedData = await fetchBackendJSON(`taskmgmt/getAllMilestonesOfProj/${spaceid}`, 'GET', {});
   console.log('Milestones: ', fetchedData);
   setMilestones(fetchedData.data);
  }
  fetchData();
 }, []);

 return (
  <div>
   <div className="row">
    <div className="col-10">
     <h2 style={{ color: 'green' }} className="w-75">
      <strong>Milestones</strong>
     </h2>
    </div>

    <Button
     className="col-2 mb-2"
     variant="success"
     onClick={() => navigate(`/milestones/${spaceid}/new-milestone`, { replace: false })}
    >
     New Milestone
    </Button>
   </div>
   {milestones.map((milestone, key) => (
    <Milestone key={key} milestone={milestone} />
   ))}
  </div>
 );
}

export default Milestones;
