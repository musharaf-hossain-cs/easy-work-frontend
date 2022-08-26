import { Chart, Series } from 'devextreme-react/chart';
import React from 'react';

export default function BarChart({ barChartData }) {
 console.log('barchartdata: ', barChartData);
 return (
  <div style={{ margin: '20px' }}>
   <Chart id="chart" dataSource={barChartData}>
    <Series
     valueField="cost"
     argumentField="day"
     name="Cost Per 10 Day"
     type="bar"
     color="#ffaa66"
     barWidth={75}
    />
   </Chart>
  </div>
 );
}
