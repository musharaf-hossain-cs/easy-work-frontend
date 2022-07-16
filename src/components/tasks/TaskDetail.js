import styles from '../../styles/TaskDetail.module.css';

function TaskDetail({ taskid, spaceid, taskDetails }) {
 console.log('in task detail');
 console.log(taskid);
 console.log(spaceid);
 console.log(taskDetails);
 const formatDate = (date) =>
  [date.getFullYear(), date.getMonth() + 1, date.getDate() + 1].join('-');

 return (
  <div>
   <div>
    <h2>{taskDetails.title}</h2>
    <h6>Description: {taskDetails.description}</h6>
   </div>
   <hr />
   <div className="row">
    <div className="col-6">
     <b>Properties</b>
     <div className={styles.paddingLeft20px}>
      Priority: {taskDetails.priority} <br />
      Status: {taskDetails.status}
     </div>
    </div>
    <div className="col-6">
     <b>Dates</b>
     <div className={styles.paddingLeft20px}>
      Create Date: {formatDate(taskDetails.createDate)} <br />
      Start Date: {formatDate(taskDetails.startDate)} <br />
      End Date: {formatDate(taskDetails.endDate)}
     </div>
    </div>

    <div className="col-6">
     <b>All Attachments:</b> <br />
     <div className={styles.paddingLeft20px}>
      {taskDetails.attachments.map((val, key) => (
       <>
        <span key={key}>{val}</span> <br />
       </>
      ))}
     </div>
    </div>

    <div className="col-6">
     <b>All Comments:</b> <br />
     <div className={styles.paddingLeft20px}>
      {taskDetails.comments.map((val, key) => (
       <>
        <span key={key}>{val}</span> <br />
       </>
      ))}
     </div>
    </div>
   </div>
  </div>
 );
}

export default TaskDetail;
