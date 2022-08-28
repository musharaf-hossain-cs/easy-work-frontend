/* eslint-disable no-unused-vars */
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function MilestoneUpdatePopup(props) {
 const { showPopup, saveMilestone, oldTitle, oldDescription, oldStatus } = props;
 const [title, setTitle] = useState(oldTitle);
 const [description, setDescription] = useState(oldDescription);
 const [status, setStatus] = useState(oldStatus);

 const handleTitleChange = (e) => {
  setTitle(e.target.value);
 };

 return (
  <Modal show onHide={() => showPopup(false)} centered>
   <Modal.Header closeButton>
    <Modal.Title> Edit Milestone </Modal.Title>
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
     <Form.Group className="mb-3" controlId="spaceName">
      <Form.Label>Status</Form.Label>
      <Form.Select
       value={status}
       placeholder="Status"
       onChange={(e) => setStatus(e.target.value)}
       onKeyPress={(e) => {
        if (e.key === 'Enter') e.preventDefault();
       }}
      >
       <option value="Upcoming">Upcoming</option>
       <option value="Ongoing">Ongoing</option>
       <option value="Passed">Passed</option>
      </Form.Select>
     </Form.Group>
    </Form>
   </Modal.Body>
   <Modal.Footer>
    <Button variant="secondary" onClick={() => showPopup(false)}>
     Cancel
    </Button>
    <Button
     onClick={() => {
      saveMilestone(title, description, status);
      showPopup(false);
     }}
    >
     Save Milestone
    </Button>
   </Modal.Footer>
  </Modal>
 );
}

export default MilestoneUpdatePopup;
