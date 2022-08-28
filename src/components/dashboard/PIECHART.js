/* eslint-disable prettier/prettier */
/* eslint-disable react/prefer-stateless-function */
import PieChart, {
    Connector,
    // eslint-disable-next-line prettier/prettier
    Export,
    Font,
    Label,
    Legend,
    Series
} from 'devextreme-react/pie-chart';
import React from 'react';

function customizeText(arg) {
 return `${arg.valueText} (${arg.percentText})`;
}

export default function PIECHART({ pieChartData }) {
 return (
  <PieChart id="pie" palette="Bright" dataSource={pieChartData} title="All Tasks' Status Summary" className='col-6'>
   <Legend
    orientation="horizontal"
    itemTextPosition="right"
    horizontalAlignment="center"
    verticalAlignment="bottom"
    columnCount={4}
   />
   <Export enabled />
   <Series argumentField="status" valueField="count">
    <Label visible position="columns" customizeText={customizeText}>
     <Font size={16} />
     <Connector visible width={0.5} />
    </Label>
   </Series>
  </PieChart>
 );
}
