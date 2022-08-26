import React from 'react';

import { Chart, Series } from 'devextreme-react/chart';
import { dataSource } from './data';

export default function BarChart() {
 return (
  <Chart id="chart" dataSource={dataSource} className="col-6">
   <Series
    valueField="oranges"
    argumentField="day"
    name="My Oranges"
    type="bar"
    color="#ffaa66"
    barWidth={65}
   />
  </Chart>
 );
}
