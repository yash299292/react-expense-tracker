// TransactionsChart.js

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const TransactionsChart = ({ data }) => {
  return (
    <BarChart width={400} height={400} data={data}>
      <XAxis dataKey="desc" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="amount" fill="#8884d8" />
    </BarChart>
  );
};

export default TransactionsChart;
