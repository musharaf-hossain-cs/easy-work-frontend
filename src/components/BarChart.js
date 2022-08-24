import React from 'react';

import { Chart, Series } from 'devextreme-react/chart';
import { dataSource } from './dashboard/data';

export default function BarChart() {
 return (
  <Chart id="chart" dataSource={dataSource} className="col-6">
   <Series
    valueField="oranges"
    argumentField="day"
    name="My oranges"
    type="bar"
    color="#ffaa66"
    barWidth={65}
   />
  </Chart>
 );
}
