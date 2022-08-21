import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function NewCategoryPopup(props) {
 const { showPopup, saveCategory, value } = props;
 const [title, setTitle] = useState(value);
 const handleTitleChange = (e) => {
  setTitle(e.target.value);
 };

 return (
  <Modal show onHide={() => showPopup(false)} centered>
   <Modal.Header closeButton>
    <Modal.Title> New Category </Modal.Title>
   </Modal.Header>
   <Modal.Body>
    <Form>
     <Form.Group className="mb-3" controlId="spaceName">
      <Form.Control
       type="text"
       value={title}
       size="lg"
       placeholder="Category Title"
       onChange={handleTitleChange}
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
      saveCategory(title);
      showPopup(false);
     }}
    >
     Save Category
    </Button>
   </Modal.Footer>
  </Modal>
 );
}

export default NewCategoryPopup;
