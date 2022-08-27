import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

function ResultOfCocomo2({ result, onSave, onDiscard }) {
 return (
  <div>
   <strong style={{ color: 'green' }}>Estimation Result</strong>
   <Table hover bordered striped>
    <thead>
     <tr>
      <th>Variable</th>
      <th>Value</th>
      <th>Rounded Value</th>
      <th>Unit</th>
     </tr>
    </thead>
    <tbody>
     <tr>
      <td>Estimated Effort</td>
      <td>{result.effort}</td>
      <td>{Math.round(result.effort)}</td>
      <td>Person-months</td>
     </tr>

     <tr>
      <td>Estimated Time</td>
      <td>{result.time}</td>
      <td>{Math.round(result.time)}</td>
      <td>Months</td>
     </tr>

     <tr>
      <td>Estimated Cost</td>
      <td>{result.devCost}</td>
      <td>{Math.round(result.devCost)}</td>
      <td>Dollar ($)</td>
     </tr>
    </tbody>
   </Table>
   <hr />
   <div className="w-100 alignCenter">
    <Button variant="success" className="m-1" onClick={onSave}>
     Save
    </Button>
    <Button variant="success" className="m-1" onClick={onDiscard}>
     Discard
    </Button>
   </div>
  </div>
 );
}

export default ResultOfCocomo2;
