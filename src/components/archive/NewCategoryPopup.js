import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './NewCategoryPopup.module.css';

function NewCategoryPopup(props) {
 const { showPopup, saveCategory, value } = props;
 const [title, setTitle] = useState(value);
 const handleTitleChange = (e) => {
  setTitle(e.target.value);
 };

 return (
  <div className={styles.modalBackground}>
   <div className={styles.modalContainer}>
    <div className={styles.title}>
     <h2>New Category</h2>
    </div>
    <div className={[styles.body, 'container'].join(' ')}>
     <Form className="row">
      <Form.Group className="mb-3 col-12" controlId="spaceName2">
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
    </div>
    <div className={styles.footer}>
     <Button
      onClick={() => {
       saveCategory(title);
       showPopup(false);
      }}
     >
      Save
     </Button>
     <Button onClick={() => showPopup(false)} id={styles.cancelBtn}>
      Cancel
     </Button>
    </div>
   </div>
  </div>
 );
}

export default NewCategoryPopup;
