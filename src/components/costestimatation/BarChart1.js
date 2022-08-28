import React from 'react';

import { Chart, Series } from 'devextreme-react/chart';

export default function BarChart1({ dataSource }) {
 return (
  <Chart id="chart" dataSource={dataSource} className="col-12">
   <Series
    valueField="budget"
    argumentField="name"
    name="Cost (USD)"
    type="bar"
    color="#ffaa66"
    barWidth={65}
   />
  </Chart>
 );
}
