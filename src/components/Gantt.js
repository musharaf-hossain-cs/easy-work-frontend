import React from 'react';
import Chart from 'react-google-charts';

const options = {
 height: 275,
 gantt: {
  criticalPathEnabled: false,
  criticalPathStyle: {
   stroke: '#e64a19',
   strokeWidth: 5,
  },
 },
};

const ganttChartData = [
 [
  { type: 'string', label: 'Task ID' },
  { type: 'string', label: 'Task Name' },
  { type: 'date', label: 'Start Date' },
  { type: 'date', label: 'End Date' },
  { type: 'number', label: 'Duration' },
  { type: 'number', label: 'Percent Complete' },
  { type: 'string', label: 'Dependencies' },
 ],
 ['Research', 'Find sources', new Date(2015, 0, 1), new Date(2015, 0, 5), null, 100, null],
 [
  'Write',
  'Write paper',
  null,
  new Date(2015, 0, 9),
  3 * 24 * 60 * 60 * 1000,
  25,
  'Research,Outline',
 ],
 [
  'Cite',
  'Create bibliography',
  null,
  new Date(2015, 0, 7),
  1 * 24 * 60 * 60 * 1000,
  20,
  'Research',
 ],
 [
  'Complete',
  'Hand in paper',
  null,
  new Date(2015, 0, 10),
  1 * 24 * 60 * 60 * 1000,
  0,
  'Cite,Write',
 ],
 ['Outline', 'Outline paper', null, new Date(2015, 0, 6), 1 * 24 * 60 * 60 * 1000, 100, 'Research'],
];
ganttChartData.push([
 'xyz',
 'xyz',
 new Date(2015, 0, 7),
 new Date(2015, 0, 8),
 1 * 24 * 60 * 60 * 1000,
 75,
 null,
]);
export default function Gantt() {
 return (
  <div className="container mt-5">
   <h2>React Gantt Chart Example</h2>
   <Chart
    width="1200px"
    height="800px"
    chartType="Gantt"
    loader={<div>Loading Chart</div>}
    data={ganttChartData}
    options={options}
    rootProps={{ 'data-testid': '1' }}
   />
  </div>
 );
}
