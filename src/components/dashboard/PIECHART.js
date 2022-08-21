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
import { dataSource } from './data1';

function customizeText(arg) {
 return `${arg.valueText} (${arg.percentText})`;
}

export default function PIECHART() {
 return (
  <PieChart id="pie" palette="Bright" dataSource={dataSource} title="Olympic Medals in 2008" className='col-6'>
   <Legend
    orientation="horizontal"
    itemTextPosition="right"
    horizontalAlignment="center"
    verticalAlignment="bottom"
    columnCount={4}
   />
   <Export enabled />
   <Series argumentField="country" valueField="medals">
    <Label visible position="columns" customizeText={customizeText}>
     <Font size={16} />
     <Connector visible width={0.5} />
    </Label>
   </Series>
  </PieChart>
 );
}
