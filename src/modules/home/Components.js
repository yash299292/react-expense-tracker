import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#FF8042'];

const MyPieChart = ({ data }) => {
  return (
    <PieChart width={400} height={250}>
      <Pie
        data={data}
        cx={200}
        cy={100}
        innerRadius={50}
        outerRadius={70}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend align="center" verticalAlign="bottom" />
      <Tooltip />
    </PieChart>
  );
};

export default MyPieChart;
