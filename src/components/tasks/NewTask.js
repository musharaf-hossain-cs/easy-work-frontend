import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Autocomplete from '@mui/material/Autocomplete';
import { inputLabelClasses } from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from '../../styles/NewTask.module.css';

const alltasks = [
 { label: 'task-1', id: 'task-1-id' },
 { label: 'task-2', id: 'task-2-id' },
 { label: 'task-3', id: 'task-3-id' },
];

function Task() {
 const [startDate, setStartDate] = useState(null);
 const [endDate, setEndDate] = useState(null);
 const [attachments, setAttachments] = useState([]);
 const [title, setTitle] = useState('');
 const [priority, setPriority] = useState(0);
 const [parent, setParent] = useState(null);
 const [description, setDescription] = useState('');

 let selectedFile;

 const handleParentInput = (event, value) => {
  console.log(event);
  setParent(value);
  console.log(value);
  console.log(parent);
 };

 const submitForm = (e) => {
  e.preventDefault();
  // submit everything
 };

 return (
  <div className={[styles.container, 'container'].join(' ')}>
   <h1>New Task</h1>
   <Form className={[styles.form, 'row'].join(' ')}>
    <Form.Group className="mb-3 col-6" controlId="formTaskTitle">
     <Form.Label>Task Title</Form.Label>
     <Form.Control
      type="text"
      placeholder="Enter task title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      onKeyPress={(e) => {
       if (e.key === 'Enter') e.preventDefault();
      }}
     />
    </Form.Group>

    <Form.Group className="mb-3 col-6" controlId="formParentTask">
     <Form.Label>Parent Task </Form.Label>
     <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={alltasks}
      onChange={handleParentInput}
      popupIcon={<ArrowDropDownIcon style={{ color: 'white' }} />}
      onKeyPress={(e) => {
       if (e.key === 'Enter') e.preventDefault();
      }}
      // onChange={(event, v) => handleAutoComplete(event, v)}
      renderInput={(params) => (
       // eslint-disable-next-line react/jsx-props-no-spreading
       <TextField
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...params}
        sx={{ input: { color: 'white' } }}
        InputLabelProps={{
         sx: {
          // set the color of the label when not shrinked
          color: 'aliceblue',
          [`&.${inputLabelClasses.shrink}`]: {
           // set the color of the label when shrinked (usually when the TextField is focused)
           color: 'aliceblue',
          },
         },
        }}
        label="Choose a task"
       />
      )}
     />
    </Form.Group>

    <Form.Group className="mb-3 col-6" controlId="formPriority">
     <Form.Label>Priority </Form.Label>
     <Form.Select
      aria-label="Default select example"
      value={priority}
      onChange={(e) => setPriority(e.target.value)}
     >
      <option value="0">Choose a priority</option>
      <option value="1">High</option>
      <option value="2">Medium</option>
      <option value="3">Low</option>
     </Form.Select>
    </Form.Group>

    <Form.Group className="mb-3 col-6" controlId="formStartDate">
     {/* <Form.Label>Start Date: </Form.Label> */}
     <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
       openTo="year"
       label="Start Date"
       views={['year', 'month', 'day']}
       value={startDate}
       onChange={(newValue) => {
        setStartDate(newValue);
       }}
       // eslint-disable-next-line react/jsx-props-no-spreading
       renderInput={(params) => (
        <TextField
         // eslint-disable-next-line react/jsx-props-no-spreading
         {...params}
         sx={{ input: { color: 'white' }, svg: { color: '#fff' } }}
         onKeyPress={(e) => {
          if (e.key === 'Enter') e.preventDefault();
         }}
         InputLabelProps={{
          sx: {
           // set the color of the label when not shrinked
           color: 'aliceblue',
           [`&.${inputLabelClasses.shrink}`]: {
            // set the color of the label when shrinked (usually when the TextField is focused)
            color: 'aliceblue',
           },
          },
         }}
        />
       )}
      />
     </LocalizationProvider>
    </Form.Group>

    <Form.Group className="mb-3 col-6" controlId="formTaskDescription">
     <Form.Label>Task Description</Form.Label>
     <Form.Control
      as="textarea"
      rows={3}
      value={description}
      placeholder="Task description here"
      onChange={(e) => setDescription(e.target.value)}
      onKeyPress={(e) => {
       if (e.key === 'Enter') e.preventDefault();
      }}
     />
    </Form.Group>

    <Form.Group className="mb-3 col-6" controlId="formEndDate">
     {/* <Form.Label>Start Date: </Form.Label> */}
     <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
       openTo="year"
       label="Expected End Date"
       views={['year', 'month', 'day']}
       value={endDate}
       onChange={(newValue) => {
        setEndDate(newValue);
       }}
       // eslint-disable-next-line react/jsx-props-no-spreading
       renderInput={(params) => (
        <TextField
         // eslint-disable-next-line react/jsx-props-no-spreading
         {...params}
         sx={{ input: { color: 'white' }, svg: { color: '#fff' } }}
         onKeyPress={(e) => {
          if (e.key === 'Enter') e.preventDefault();
         }}
         InputLabelProps={{
          sx: {
           // set the color of the label when not shrinked
           color: 'aliceblue',
           [`&.${inputLabelClasses.shrink}`]: {
            // set the color of the label when shrinked (usually when the TextField is focused)
            color: 'aliceblue',
           },
          },
         }}
        />
       )}
      />
     </LocalizationProvider>
    </Form.Group>

    <Form.Group className="mb-3 col-6" controlId="formAttachFile">
     <Form.Label>Attachments</Form.Label>
     <Form.Control
      type="file"
      placeholder="Choose a file"
      value={selectedFile}
      onKeyPress={(e) => {
       if (e.key === 'Enter') e.preventDefault();
      }}
      onChange={(e) => {
       // eslint-disable-next-line prefer-destructuring
       selectedFile = e.target.files[0];
       setAttachments([...attachments, e.target.files[0]]);
      }}
     />
    </Form.Group>

    {/* files list */}
    <ul className="mb-3 col-6">
     {attachments.map((val, key) => (
      <li key={key}>{val.name}</li>
     ))}
    </ul>

    <Button variant="primary" type="submit" onClick={submitForm}>
     Submit
    </Button>
   </Form>
  </div>
 );
}

export default Task;
