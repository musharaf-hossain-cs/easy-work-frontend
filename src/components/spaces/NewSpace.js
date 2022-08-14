import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import fetchBackendJSON from '../../actions/Fetch';
import styles from '../../styles/NewSpace.module.css';

// const alluser = [
//  { label: 'musharaf71', email: 'mdmusharaf8071@gmail.com' },
//  { label: 'jayanta001', email: 'jayanta@gmail.com' },
// ];

// const alluser = fetchBackendJSON('user/getallusers', 'POST', { objective: 'getusers' });

function NewSpace() {
 // eslint-disable-next-line no-unused-vars, prefer-const
 const [users, setUsers] = useState([]);
 const [space, setSpace] = useState('');

 const navigate = useNavigate();

 // const handleAutoComplete = (e, v) => {
 //  console.log(e);
 //  if (v != null) setUsers([...users, v]);
 //  console.log(users);
 // };

 const handleSpaceNameField = (e) => {
  e.preventDefault();
  setSpace(e.target.value);
 };

 const submit = (e) => {
  e.preventDefault();
  const data = {
   title: space,
   description: `Description for the space: ${space}`,
   allocated_time: 0,
   budget: 0,
   dev_type: 'Not specified',
  };

  async function sendData() {
   const res = await fetchBackendJSON('project/addproject', 'POST', data);
   console.log(res);
   setSpace('');
   setUsers([]);
   navigate(`/spaces/${res.id}/tasks`, { replace: false });
  }
  sendData();

  setSpace('');
  // eslint-disable-next-line no-unused-vars
  setUsers((prev) => []);
 };

 return (
  <div className={styles.container}>
   <h2>Create New Space</h2>
   <Form className={styles.form}>
    <Form.Group className="mb-3" controlId="spaceName">
     <Form.Label>Space Name: </Form.Label>
     <Form.Control
      type="text"
      value={space}
      placeholder="Enter space name"
      onChange={handleSpaceNameField}
      onKeyPress={(e) => {
       if (e.key === 'Enter') e.preventDefault();
      }}
     />
    </Form.Group>

    {/* <Form.Group className="mb-3" controlId="shareWith">
     <Form.Label>Share With: </Form.Label>
     <ul>
      {users.map((val, key) => (
       <li key={key}>{val.label}</li>
      ))}
     </ul>
     <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={alluser}
      onChange={(event, v) => handleAutoComplete(event, v)}
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
        label="User"
       />
      )}
     />
    </Form.Group> */}
    <Button variant="primary" onClick={submit}>
     Submit
    </Button>
   </Form>
  </div>
 );
}

export default NewSpace;
