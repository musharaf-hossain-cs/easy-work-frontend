import { useParams } from 'react-router-dom';

function Task() {
 const { taskid } = useParams();
 return (
  <div>
   <h1>Task: {taskid}</h1>
  </div>
 );
}

export default Task;
