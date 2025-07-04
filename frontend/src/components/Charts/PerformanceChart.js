import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Eye } from 'lucide-react';

const PerformanceChart = ({ data }) => {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Model Performance</h3>
        <Eye className="h-5 w-5 text-gray-400" />
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="menu" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #e5e7eb', 
              borderRadius: '8px' 
            }}
          />
          <Bar dataKey="forecast_accuracy" fill="#6366f1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default PerformanceChart; 