import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { useLazyGetFeedQuery } from '../services/youtubeApi';
import Videos from './Videos';
import Sidebar from './Sidebar';

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState('New');
  const [videos, setVideos] = useState(null);
  const darkMode = useSelector((state) => state.redux.darkMode);

  const [getFeed] = useLazyGetFeedQuery(selectedCategory);

  useEffect(() => {
    setVideos(null);

    getFeed(selectedCategory).then(({ data }) => setVideos(data.items));
  }, [selectedCategory]);

  return (
    <Stack sx={{ flexDirection: { sx: 'column', md: 'row' } }}>
      <Box
        sx={{
          height: { sx: 'auto', md: '92vh' },
          borderRight: '1px solid grey',
          px: { sx: 0, md: 0 },
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </Box>

      <Box p={2} sx={{ overflowY: 'auto', height: '90vh', flex: 2 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={darkMode ? { color: 'white' } : { color: 'black' }}
        >
          {selectedCategory} <span style={{ color: '#FC1503' }}>videos</span>
        </Typography>

        <Videos videos={videos} />
      </Box>
    </Stack>
  );
};

export default Feed;
