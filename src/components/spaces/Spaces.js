import React, { useEffect } from 'react';
import fetchBackendJSON from '../../actions/Fetch';

// const bull = (
//     <Box
//         component="span"
//         sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
//     >
//         •
//     </Box>
// );

const myExample = () => {
 const myArray = [];
 for (let i = 0; i < 5; i += 1) {
  myArray.push(<h1>Hello</h1>);
 }
 return myArray;
};

function Spaces() {
 useEffect(() => {
  fetchBackendJSON('taskmgmt/gettaskslist', 'POST', { project_id: 4 }).then((data) => {
   console.log(data);
  });
 }, []);

 return <div>{myExample()}</div>;
}

export default Spaces;
