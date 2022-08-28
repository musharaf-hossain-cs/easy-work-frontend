import styles from '../../styles/TaskDetailList.module.css';

function TaskDetailList({ taskid, spaceid, taskDetailList }) {
 console.log('in task detail');
 console.log(taskid);
 console.log(spaceid);
 console.log(taskDetailList);
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

      {/* <div className="col-6">
       <b>All Attachments:</b> <br />
       <div className={[styles.paddingLeft20px, styles.margin10px].join(' ')}>
        {taskDetails.attachments.map((val, key) => (
         <>
          <span key={key}>{val}</span> <br />
         </>
        ))}
       </div>
      </div> */}

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
