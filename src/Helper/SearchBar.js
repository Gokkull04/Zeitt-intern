import React, { useState } from 'react';
import { TextField } from '@mui/material';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <TextField
      label="Search"
      variant="outlined"
      size="small"
      value={searchTerm}
      onChange={handleChange}
      sx={{ width: 200 }}
    />
  );
};

export default SearchBar;
