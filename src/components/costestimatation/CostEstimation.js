import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetchBackendJSON from '../../actions/Fetch';
import FunctionalDecomposition from './FunctionalDecomposition';
import LocEstimation from './LocEstimation';

function CostEstimation() {
 const [groups, setGroups] = useState([{ title: 'Unlisted', tasks: [] }]);
 // eslint-disable-next-line no-unused-vars
 const [locEstimated, setLocEstimated] = useState(false);
 const [decomposed, setDecomposed] = useState(false);

 const { spaceid } = useParams();

 useEffect(() => {
  let fetchedData;
  async function fetchData() {
   fetchedData = await fetchBackendJSON(
    `costEstm/getAllCategoryWithTaskName/${spaceid}`,
    'GET',
    {}
   );
   console.log(fetchedData.data);
   const allgroups = [];
   fetchedData.data.forEach((cat) => {
    allgroups.push(cat);
   });
   setGroups(allgroups);
  }
  fetchData();
 }, []);

 return (
  <div>
   {!decomposed && (
    <FunctionalDecomposition ExistingGroups={groups} setDecomposed={setDecomposed} />
   )}
   {decomposed && !locEstimated && <LocEstimation groups={groups} />}
  </div>
 );
}

export default CostEstimation;
