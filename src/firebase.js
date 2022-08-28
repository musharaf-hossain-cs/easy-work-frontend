// Import the functions you need from the SDKs you need
// import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
 apiKey: 'AIzaSyDXYb6jbkykDnVQADXnBYbS8teazpvnovg',
 authDomain: 'easywork-39706.firebaseapp.com',
 projectId: 'easywork-39706',
 storageBucket: 'easywork-39706.appspot.com',
 messagingSenderId: '683040831445',
 appId: '1:683040831445:web:ba402a5bd8c012a2d26f5c',
 measurementId: 'G-9X9NXQN5PG',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
// eslint-disable-next-line no-unused-vars
// const analytics = getAnalytics(app);
