/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetchBackendJSON from '../../actions/Fetch';
import DependencyGraph from '../views/DependencyGraph';

// const data = {
//  // eslint-disable-next-line global-require
//  image: require('../../assets/Critical-Path.png'),
//  title: 'Image Title',
// };

const rows = [];

function ShowDependencyGraph() {
 const { spaceid } = useParams();
 let { taskid } = useParams();
 const [imgData, setImgData] = useState({ image: null, title: 'title', map: [] });

 if (taskid === undefined) {
  taskid = -1;
  console.log('taskid: ', taskid);
 }

 useEffect(() => {
  let fetchedData;
  async function fetchData() {
   fetchedData = await fetchBackendJSON(`taskmgmt/getDependencyGraph`, 'POST', {
    project_id: spaceid,
    task_id: taskid,
   });
   console.log(fetchedData);
   if (fetchedData.success) {
    console.log('DependencyGraph Data fetch successed');
    setImgData({
     image: fetchedData.data.image_name,
     title: fetchedData.data.title,
     map: fetchedData.data.task_map,
    });
   } else {
    console.log('DependencyGraph Data fetch failed');
   }
  }
  fetchData();
 }, []);

 return (
  <div>
   <h3 className="alignCenter">Dependency Graph: {imgData.title}</h3>
   <DependencyGraph spaceid={spaceid} taskid={taskid} rows={rows} imgData={imgData} />
   <hr />
  </div>
 );
}

export default ShowDependencyGraph;
