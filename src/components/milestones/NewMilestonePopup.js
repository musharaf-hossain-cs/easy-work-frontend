/* eslint-disable no-unused-vars */
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function NewMilestonePopup(props) {
 const { showPopup, saveMilestone, index } = props;
 const [title, setTitle] = useState('');
 const [description, setDescription] = useState('');

 const handleTitleChange = (e) => {
  setTitle(e.target.value);
 };

 return (
  <Modal show onHide={() => showPopup(false)} centered>
   <Modal.Header closeButton>
    <Modal.Title> New Milestone </Modal.Title>
   </Modal.Header>
   <Modal.Body>
    <Form>
     <Form.Group className="mb-3" controlId="spaceName">
      <Form.Control
       type="text"
       value={title}
       size="lg"
       placeholder="Milestone Title"
       onChange={handleTitleChange}
       onKeyPress={(e) => {
        if (e.key === 'Enter') e.preventDefault();
       }}
      />
     </Form.Group>
     <Form.Group className="mb-3" controlId="spaceName">
      <Form.Control
       as="textarea"
       rows={3}
       value={description}
       size="lg"
       placeholder="Description"
       onChange={(e) => setDescription(e.target.value)}
       onKeyPress={(e) => {
        if (e.key === 'Enter') e.preventDefault();
       }}
      />
     </Form.Group>
    </Form>
   </Modal.Body>
   <Modal.Footer>
    <Button variant="secondary" onClick={() => showPopup(false)}>
     Cancel
    </Button>
    <Button
     onClick={() => {
      saveMilestone(title, description, index);
      showPopup(false);
     }}
    >
     Save Milestone
    </Button>
   </Modal.Footer>
  </Modal>
 );
}

export default NewMilestonePopup;
