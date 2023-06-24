import React from 'react';
import { Stack } from '@mui/material';
import { useSelector } from 'react-redux';

import { categories } from '../utils/constants';

const Sidebar = ({ selectedCategory, setSelectedCategory }) => {
  const darkMode = useSelector((state) => state.redux.darkMode);

  return (
    <Stack
      direction="row"
      sx={{
        overflowY: 'auto',
        height: { sx: 'auto', md: '95%' },
        flexDirection: { md: 'column' },
        width: { md: '14rem' },
      }}
    >
      {categories.map((category) => (
        <button
          className={darkMode ? 'category-btn dark' : 'category-btn'}
          onClick={() => setSelectedCategory(category.name)}
          style={{
            background: category.name === selectedCategory && '#FC1503',
            color: 'white',
          }}
          key={category.name}
        >
          <span
            style={{
              color: category.name === selectedCategory ? 'white' : 'red',
              marginRight: '15px',
            }}
          >
            {category.icon}
          </span>
          <span
            style={
              darkMode
                ? {
                    opacity: category.name === selectedCategory ? '1' : '0.8',
                    color: 'white',
                  }
                : {
                    opacity: category.name === selectedCategory ? '1' : '0.8',
                    color: 'black',
                  }
            }
          >
            {category.name}
          </span>
        </button>
      ))}
    </Stack>
  );
};

export default Sidebar;
