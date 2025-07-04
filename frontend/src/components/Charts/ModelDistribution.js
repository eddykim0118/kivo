import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart3 } from 'lucide-react';

const ModelDistribution = ({ data }) => {
  const COLORS = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
  
  const modelData = Object.entries(
    data.reduce((acc, m) => {
      acc[m.model] = (acc[m.model] || 0) + 1;
      return acc;
    }, {})
  ).map(([model, count]) => ({ model, count }));

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Model Distribution</h3>
        <BarChart3 className="h-5 w-5 text-gray-400" />
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={modelData}
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            dataKey="count"
            label={({ model, count }) => `${model}: ${count}`}
          >
            {modelData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default ModelDistribution; 