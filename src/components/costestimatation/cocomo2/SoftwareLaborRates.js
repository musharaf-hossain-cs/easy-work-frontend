import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import PostAllocation from '../PostAllocation';

function SoftwareLaborRates({ setLaborRate, allocatedMembers }) {
 const [rate, setRate] = useState('');
 const [allWages, setAllWages] = useState([]);

 useEffect(() => {
  allocatedMembers.forEach((mem, key) => {
   setAllWages([...allWages, { id: key, wage: mem.wage, count: mem.count }]);
  });
 }, []);

 useEffect(() => {
  let totalUser = 0;
  let totalWage = 0;
  allWages.forEach((item) => {
   totalUser += item.count;
   totalWage += item.count * item.wage;
   console.log('user, wage: ', item.count, item.wage);
  });
  setRate(totalWage / totalUser);
  console.log(rate, allWages);
 }, [allWages]);

 const editWage = (key, v) => {
  let value = 0;
  // console.log('check nan: ', v);
  if (!(Number.isNaN(v) || v === undefined || v === '')) {
   value = parseInt(v, 10);
  } else {
   console.log('undefined or NaN');
  }
  setAllWages((old) => {
   const newList = JSON.parse(JSON.stringify(old));
   let idx = -1;
   newList.forEach((val, i) => {
    if (val.id === key) idx = i;
   });
   if (idx >= 0) {
    newList[idx].wage = value;
   } else {
    newList.push({ id: key, wage: value, count: 0 });
    console.log('NewList item is created in SoftwareLaborRates.js');
   }
   // console.log('wagelist', newList);
   return newList;
  });
 };

 return (
  <div className="row">
   <strong style={{ color: 'green' }}>Software Labor Rates</strong>
   <div className="col-md-6 col-lg-4">
    <Table>
     <tbody>
      <tr>
       <td>
        <strong>Cost per Person-Month ($)</strong>
       </td>
       <td>
        <Form.Control
         type="text"
         value={rate}
         disabled
         // onChange={(e) => setRate(e.target.value)}
        />
       </td>
      </tr>
     </tbody>
    </Table>
   </div>
   <div className="col-3">
    <Button className="m-1" variant="outline-success" onClick={() => setLaborRate(rate)}>
     Save
    </Button>
   </div>

   <div>
    <h3>All Posts</h3>
    {allocatedMembers.map((member, memberIdx) => (
     <PostAllocation
      id={memberIdx}
      empCount={member.count}
      prevWage={member.wage}
      prevEffort={member.weekly_effort}
      editWage={editWage}
      onlyWage
     >
      {member.post}
     </PostAllocation>
    ))}
   </div>
  </div>
 );
}

export default SoftwareLaborRates;
