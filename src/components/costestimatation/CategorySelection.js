import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../../styles/NewSpace.module.css';

export default function CategorySelection() {
 const [selectedCategory, setSelectedCategory] = useState('All Category');

 const navigate = useNavigate();
 const { spaceid } = useParams();

 const submitSelection = (e) => {
  e.preventDefault();
  navigate(`/estimate-cost/${spaceid}/cost-time-graph-view`, { replace: false });
 };

 return (
  <div className={styles.container} style={{ height: '100vh', paddingTop: '15px' }}>
   <h2>Choose Any Preferred Category</h2>
   <Form.Group className="mb-3 col-4" controlId="formPriority">
    <Form.Select
     aria-label="Default select example"
     value={selectedCategory}
     onChange={(e) => setSelectedCategory(e.target.value)}
    >
     <option value="0">All Category</option>
     <option value="1">Category 1</option>
     <option value="2">Category 2</option>
     <option value="3">Category 3</option>
    </Form.Select>
   </Form.Group>
   <Button variant="primary" type="submit" onClick={submitSelection}>
    Submit
   </Button>
  </div>
 );
}
