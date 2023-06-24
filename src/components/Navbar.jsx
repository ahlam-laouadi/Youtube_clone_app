import React from 'react';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { reduxActions } from '../services/reduxSlice';

import SearchBar from './SearchBar';
import logo from '../images/youtube.png';

const Navbar = () => {
  const darkMode = useSelector((state) => state.redux.darkMode);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(reduxActions.toggleMode());
  };

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      gap={{ xs: '1rem' }}
      alignItems="center"
      p={2}
      sx={{
        background: 'transparent',
        top: 0,
        justifyContent: 'space-between',
      }}
    >
      <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt="logo" height={45} />
      </Link>

      <SearchBar />

      <Button
        onClick={handleClick}
        color="error"
        variant="contained"
        startIcon={
          darkMode ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />
        }
      >
        {darkMode ? 'Light' : 'Dark'}
      </Button>
    </Stack>
  );
};

export default Navbar;
