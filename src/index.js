import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import styles from './styles/App.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <React.StrictMode>
  <App className={styles.App} />
 </React.StrictMode>
);
