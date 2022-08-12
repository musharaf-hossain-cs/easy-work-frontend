import { useRef, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/esm/Button';
import styles from '../../styles/FunctionalDecomposition.module.css';
import NewCategoryPopup from './NewCategoryPopup';

const tasks = [
 { title: 'task-A', id: 1 },
 { title: 'task-B', id: 2 },
 { title: 'task-C', id: 3 },
 { title: 'task-D', id: 4 },
 { title: 'task-E', id: 5 },
];

export default function FunctionalDecomposition() {
 // eslint-disable-next-line no-unused-vars
 const [groups, setGroups] = useState([{ title: 'Unlisted', tasks }]);
 // eslint-disable-next-line no-unused-vars
 const [dragging, setDragging] = useState(false);
 const [popup, setPopup] = useState(false);

 const dragSrc = useRef();
 const dragItemNode = useRef();
 const dragDst = useRef();

 const handleDragEnd = (e) => {
  console.log(e);
  setDragging(false);
  dragItemNode.current.removeEventListener('dragend', handleDragEnd);
  if (dragSrc.current !== dragDst.current) {
   setGroups((oldGroups) => {
    const newGroups = JSON.parse(JSON.stringify(oldGroups));
    console.log(newGroups);
    const draggedTask = newGroups[dragSrc.current.grpI].tasks.splice(dragSrc.current.taskI, 1)[0];
    if (draggedTask !== undefined) {
     newGroups[dragDst.current.grpI].tasks.splice(dragDst.current.taskI, 0, draggedTask);
    }
    return newGroups;
   });
  }

  // dragItemNode.current = null;
  // dragSrc.current = null;
  // dragDst.current = null;
 };

 const handleDragStart = (e, task) => {
  console.log('Starting to drag', task);
  dragItemNode.current = e.target;
  dragItemNode.current.addEventListener('dragend', handleDragEnd);
  dragSrc.current = task;

  setTimeout(() => {
   setDragging(true);
  }, 0);
 };

 const handleDragEnter = (e, targetTask) => {
  console.log(e);
  console.log('Target task: ', targetTask);
  if (targetTask !== null) dragDst.current = targetTask;
  // const { grpI, taskI } = targetTask;
  // console.log(targetTask);
  // if (dragSrc.current !== targetTask) {
  //  setGroups((oldGroups) => {
  //   const newGroups = JSON.parse(JSON.stringify(oldGroups));
  //   console.log(newGroups);
  //   const draggedTask = newGroups[dragSrc.current.grpI].tasks.splice(dragSrc.current.taskI, 1)[0];
  //   if (draggedTask !== undefined) {
  //    newGroups[grpI].tasks.splice(taskI, 0, draggedTask);
  //   }

  //   return newGroups;
  //  });
  // }
 };

 const newCategory = (title) => {
  console.log(groups, title);
  setGroups([...groups, { title, tasks: [] }]);
 };

 const saveDecomposition = () => {
  console.log('Submit groups...');
 };

 return (
  <>
   <div className={styles.container}>
    <div className={styles.dragNDrop}>
     {groups.map((grp, grpI) => (
      <div
       key={grpI}
       className={styles.dndGroup}
       onDragEnter={
        dragging
         ? (e) => {
            handleDragEnter(e, { grpI, taskI: 0 });
           }
         : null
       }
      >
       <Alert className={styles.alert}>{grp.title}</Alert>
       {grp.tasks.map((task, taskI) => (
        <div
         draggable
         key={taskI}
         className={styles.dndItem}
         onDragStart={(e) => handleDragStart(e, { grpI, taskI })}
         onDragEnter={
          dragging
           ? (e) => {
              handleDragEnter(e, { grpI, taskI });
             }
           : null
         }
        >
         <Badge bg="secondary">{task.title}</Badge>
        </div>
       ))}
      </div>
     ))}
    </div>
   </div>
   <Button onClick={() => setPopup(true)}>New Category</Button>
   <Button onClick={saveDecomposition}>Save Decomposition</Button>
   {popup && <NewCategoryPopup showPopup={setPopup} createCategory={newCategory} />}
  </>
 );
}
