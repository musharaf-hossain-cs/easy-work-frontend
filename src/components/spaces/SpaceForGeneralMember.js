import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import fetchBackendJSON from '../../actions/Fetch';
import TasksWithPriority from '../tasks/TasksWithPriority';

function SpaceForGeneralMember() {
 const { spaceid } = useParams();
 const navigate = useNavigate();
 const [tasks, setTasks] = useState([]);
 //  const [users, setUsers] = useState([]);
 // eslint-disable-next-line prefer-const
 let tempTasks = [];

 useEffect(() => {
  let fetchedData;
  async function fetchData() {
   fetchedData = await fetchBackendJSON('taskmgmt/getTaskPriority', 'POST', {
    project_id: spaceid,
    task_id: -1,
    user_id: 1,
   });
   console.log('In space');
   console.log(fetchedData);
   fetchedData.priority_list.forEach((task) => {
    tempTasks.push({
     id: task.task_id,
     title: task.title,
     priority: task.priority,
     priorityPoint: task.priority_point,
     dueDate: task.end_time,
    });
   });
   setTasks(tempTasks);
   tempTasks = [];
  }
  fetchData();
 }, []);

 //  useEffect(() => {
 //   let fetchedData;
 //   const tempUser = [];
 //   async function fetchData() {
 //    fetchedData = await fetchBackendJSON('user/getSelectedUsers', 'POST', {
 //     project_id: spaceid,
 //     task_id: -1,
 //    });
 //    console.log('In space');
 //    console.log(fetchedData);
 //    fetchedData.members.forEach((user) => {
 //     tempUser.push({
 //      id: user.id,
 //      name: `${user.first_name} ${user.last_name}`,
 //      email: user.email,
 //      mobile: user.mobile,
 //      address: user.address,
 //      job: user.designation,
 //     });
 //    });
 //    setUsers(tempUser);
 //   }
 //   fetchData();
 //  }, []);

 //  const assignUser = () => {
 //   navigate(`/spaces/${spaceid}/assign-member`, { replace: false });
 //  };

 return (
  <div className="scrollable2">
   <h1 align="center">SpaceID: {spaceid}</h1>
   <hr />
   <Button
    variant="light"
    margin-right="10px"
    onClick={() => navigate(`/spaces/${spaceid}/ganttview`, { replace: false })}
   >
    View Gantt Chart
   </Button>
   <Button
    variant="light"
    margin-right="10px"
    onClick={() => navigate(`/spaces/${spaceid}/treeview`, { replace: false })}
   >
    Tree View
   </Button>
   <Button
    variant="light"
    margin-right="10px"
    onClick={() => navigate(`/spaces/${spaceid}/dependency-graph`, { replace: false })}
   >
    Dependency Graph
   </Button>
   <hr />
   <h3>Tasks With Priority</h3>
   <TasksWithPriority tasks={tasks} rowPerPage={5} />
   <hr />
  </div>
 );
}

export default SpaceForGeneralMember;
