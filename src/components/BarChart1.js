import React from 'react';

import { Chart, Series } from 'devextreme-react/chart';

export default function BarChart({ dataSource }) {
 return (
  <Chart id="chart" dataSource={dataSource} className="col-6">
   <Series
    valueField="taskCount"
    argumentField="projectTitle"
    name="Task Count per Project"
    type="bar"
    color="#ffaa66"
    barWidth={65}
   />
  </Chart>
 );
}
