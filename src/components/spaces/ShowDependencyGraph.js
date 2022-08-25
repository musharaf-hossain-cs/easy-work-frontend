/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetchBackendJSON from '../../actions/Fetch';
import DependencyGraph from './DependencyGraph';

const data = {
 // eslint-disable-next-line global-require
 image: require('../../assets/Critical-Path.png'),
 title: 'Image Title',
};

const rows = [];

function ShowDependencyGraph() {
 const { spaceid } = useParams();
 let { taskid } = useParams();
 const [dependencyDetails, setDependencyDetails] = useState(data);
 const [rowsPerPage, setRowsPerPage] = useState(10);
 const [page, setPage] = useState(0);

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
   setDependencyDetails(() => {
    const newDep = JSON.parse(JSON.stringify(fetchedData.data));
    return newDep;
   });
  }
  fetchData();
 }, []);

 const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(+event.target.value);
  setPage(0);
 };

 return (
  <div>
   <h3 className="alignCenter">Dependency Graph</h3>
   <DependencyGraph spaceid={spaceid} taskid={taskid} rows={rows} imgData={data} />
  </div>
 );
}

export default ShowDependencyGraph;
