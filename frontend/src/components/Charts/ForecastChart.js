import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ForecastChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="date" stroke="#6b7280" />
        <YAxis stroke="#6b7280" />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'white', 
            border: '1px solid #e5e7eb', 
            borderRadius: '8px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
          }}
        />
        <Line 
          type="monotone" 
          dataKey="actual" 
          stroke="#3b82f6" 
          strokeWidth={3}
          dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
          name="Actual Sales"
        />
        <Line 
          type="monotone" 
          dataKey="predicted" 
          stroke="#10b981" 
          strokeWidth={3}
          strokeDasharray="8 5"
          dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
          name="Predicted Sales"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ForecastChart; 