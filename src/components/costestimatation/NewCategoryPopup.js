import { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import styles from '../../styles/NewCategoryPopup.module.css';

function NewCategoryPopup(props) {
 const [title, setTitle] = useState('');
 // eslint-disable-next-line no-unused-vars
 const { showPopup, createCategory } = props;
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
      <Form.Group className="mb-3 col-12" controlId="spaceName">
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
       createCategory(title);
       showPopup(false);
      }}
     >
      Create
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
