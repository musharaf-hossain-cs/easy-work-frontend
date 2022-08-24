import React from 'react';

import { Chart, Series } from 'devextreme-react/chart';
import { dataSource } from './data';

export default function BarChart() {
 return (
  <div style={{ height: '100vh' }}>
   <Chart id="chart" dataSource={dataSource}>
    <Series
     valueField="oranges"
     argumentField="day"
     name="My oranges"
     type="bar"
     color="#ffaa66"
     barWidth={65}
    />
   </Chart>
  </div>
 );
}
