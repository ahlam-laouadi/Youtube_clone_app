import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useSelector } from 'react-redux';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.redux.darkMode);

  const onhandleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      navigate(`/search/${searchTerm}`);

      setSearchTerm('');
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={onhandleSubmit}
      sx={
        darkMode
          ? {
              border: '1px solid grey',
              pl: 2,
              boxShadow: 'none',
              mr: { sm: 5 },
              backgroundColor: 'black',
            }
          : {
              backgroundColor: 'white',
              border: '1px solid grey',
              pl: 2,
              boxShadow: 'none',
              mr: { sm: 5 },
            }
      }
    >
      <input
        className={darkMode ? 'search-bar dark' : 'search-bar'}
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <IconButton
        type="button"
        onClick={() => setSearchTerm('')}
        sx={
          darkMode
            ? { p: '10px', color: 'white' }
            : { p: '10px', color: 'grey' }
        }
        aria-label="delete"
      >
        <CloseOutlinedIcon />
      </IconButton>

      <Button
        type="submit"
        sx={
          darkMode
            ? { p: '10px', color: 'white' }
            : { p: '10px', color: 'black' }
        }
        aria-label="search"
      >
        <SearchIcon />
      </Button>
    </Paper>
  );
};

export default SearchBar;
