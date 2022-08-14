import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useRef, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/esm/Button';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import fetchBackendJSON from '../../actions/Fetch';
import styles from '../../styles/FunctionalDecomposition.module.css';
import NewCategoryPopup from './NewCategoryPopup';

const deletedCat = [];
const modifiedCat = [];
const createdCat = [];

export default function FunctionalDecomposition() {
 // eslint-disable-next-line no-unused-vars
 const [groups, setGroups] = useState([{ title: 'Unlisted', tasks: [] }]);
 // eslint-disable-next-line no-unused-vars
 const [dragging, setDragging] = useState(false);
 const [popup, setPopup] = useState(false);
 const [popupEdit, setPopupEdit] = useState(false);
 const [titleToEdit, setTitleToEdit] = useState('');
 const [groupToEdit, setGroupToEdit] = useState(0);

 const { spaceid } = useParams();

 const dragSrc = useRef();
 const dragItemNode = useRef();
 const dragDst = useRef();

 const navigate = useNavigate();
 const location = useLocation();

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
  createdCat.push(title);
  setGroups([...groups, { title, tasks: [] }]);
 };

 const saveDecomposition = () => {
  console.log('Submit groups...');

  // const groupToSend = [];
  // groups.forEach((item) => {
  //  if (item.title !== 'Unlisted') {
  //   groupToSend.push(item);
  //  }
  // });
  const data2 = { data: groups, toDelete: deletedCat };
  let fetchedData2;
  async function sendData2() {
   fetchedData2 = await fetchBackendJSON('costEstm/setDecomposition', 'POST', data2);
   // console.log(fetchedData);
   if (fetchedData2.success) {
    console.log('Successfully send decomposition');
    navigate(location.pathname, { replace: false });
   } else {
    console.log('failed in sending decomposition');
   }
  }

  const data = {
   toCreate: createdCat,
   toModify: modifiedCat,
   project_id: spaceid,
  };
  let fetchedData;
  async function sendData() {
   fetchedData = await fetchBackendJSON('costEstm/editCategories', 'POST', data);
   // console.log(fetchedData);
   if (fetchedData.success) {
    console.log('Successfully edited categories');
    sendData2();
   } else console.log('failed in editing categories');
  }
  sendData();
 };

 const editCategoryTitle = (e, grpI) => {
  console.log(e, grpI);
  setTitleToEdit(groups[grpI].title);
  setGroupToEdit(grpI);
  setPopupEdit(true);
 };

 const saveEditedCategory = (title) => {
  setGroups((oldGroups) => {
   const newGroups = JSON.parse(JSON.stringify(oldGroups));
   newGroups[groupToEdit].title = title;
   const { id } = newGroups[groupToEdit];
   let found = false;
   modifiedCat.forEach((item, idx) => {
    if (item.id === id) {
     found = true;
     modifiedCat[idx].title = title;
    }
   });
   if (!found) {
    modifiedCat.push({ id, title });
   }

   console.log('modified', modifiedCat);
   return newGroups;
  });
 };

 const deleteCategory = (grpI) => {
  if (groups[grpI].tasks.length) {
   if (
    // eslint-disable-next-line no-alert, no-restricted-globals
    confirm('Category is not empty. All tasks will be moved in unlisted category. Are you sure?')
   ) {
    if (groups[grpI].id !== 'new') {
     deletedCat.push(groups[grpI].id);
     console.log(deletedCat);
    }
    let unlistedId = 0;
    groups.forEach((g, idx) => {
     if (g.title === 'Unlisted') unlistedId = idx;
     else console.log('Unlisted Category Not found!');
    });
    setGroups((oldGroups) => {
     const newGroups = JSON.parse(JSON.stringify(oldGroups));
     groups[grpI].tasks.forEach((task) => {
      newGroups[unlistedId].tasks.push(task);
     });
     newGroups.splice(grpI, 1);
     return newGroups;
    });
   }
  }
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
       <Alert className={styles.alert}>
        <div className={styles.alertTitle}>{grp.title}</div>{' '}
        <div className={styles.alertEdit}>
         <EditIcon onClick={(e) => editCategoryTitle(e, grpI)} />
        </div>
       </Alert>
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
       <hr />
       {grp.title !== 'Unlisted' && (
        <div className={[styles.footer, 'row'].join(' ')}>
         <Button
          className={[styles.btn, 'col-5'].join(' ')}
          variant="light"
          onClick={() =>
           navigate(`/estimate-cost/${spaceid}/allocate/${groups[grpI].id}/details`, {
            replace: false,
           })
          }
         >
          Details
         </Button>
         <Button
          className={[styles.btn, 'col-5'].join(' ')}
          variant="light"
          onClick={() => deleteCategory(grpI)}
         >
          Delete
         </Button>
        </div>
       )}
      </div>
     ))}
    </div>
   </div>
   <Button onClick={() => setPopup(true)}>New Category</Button>
   <Button onClick={saveDecomposition}>Save Decomposition</Button>
   {popup && <NewCategoryPopup value="" showPopup={setPopup} saveCategory={newCategory} />}
   {popupEdit && (
    <NewCategoryPopup
     value={titleToEdit}
     showPopup={setPopupEdit}
     saveCategory={saveEditedCategory}
    />
   )}
  </>
 );
}
