import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

interface MenuItem {
  id: string;
  name: string;
  category: string;
  prediction: number;
  confidence: number;
}

const MenuPredictions: React.FC = () => {
  const { state } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Mock data - replace with actual data from your API
  const menuItems: MenuItem[] = [
    { id: '1', name: 'Classic Burger', category: 'Main Course', prediction: 85, confidence: 0.92 },
    { id: '2', name: 'Caesar Salad', category: 'Appetizers', prediction: 65, confidence: 0.88 },
    { id: '3', name: 'Chocolate Cake', category: 'Desserts', prediction: 90, confidence: 0.95 },
  ];

  // Get unique categories using Array methods instead of Set
  const categories = ['all', ...Array.from(new Set(menuItems.map(item => item.category)))];

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Menu Predictions</h1>
      
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search menu items..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">{item.category}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-blue-600">
                  {item.prediction}% predicted
                </p>
                <p className="text-sm text-gray-500">
                  Confidence: {(item.confidence * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPredictions; 