import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './Helper/SearchBar';

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const items = [
    { path: '/employee-dashboard', title: 'Employee' },
    { path: '/admin-login', title: 'Admin' }
  ];

  const filteredContent = (term) => {
    if (!term) return items;
    const lowerCaseTerm = term.toLowerCase();
    return items.filter(item =>
      item.title.toLowerCase().includes(lowerCaseTerm)
    );
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-4">
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-300 shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">ZEITT</h1>
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="flex flex-grow justify-center items-center p-4">
        <div className="flex flex-wrap gap-4">
          {filteredContent(searchTerm).map((item) => (
            <div 
              key={item.path}
              className="cursor-pointer border border-gray-300 bg-white p-6 rounded-lg shadow-md hover:bg-gray-50 transition duration-300 ease-in-out"
              onClick={() => navigate(item.path)}
            >
              <h2 className="text-xl font-semibold text-gray-800 text-center">{item.title}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
