import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useLazyGetFeedQuery } from '../services/youtubeApi';
import Videos from './Videos';

const SearchFeed = () => {
  const [videos, setVideos] = useState(null);
  const { searchTerm } = useParams();
  const darkMode = useSelector((state) => state.redux.darkMode);

  const [getFeed] = useLazyGetFeedQuery(searchTerm);

  useEffect(() => {
    getFeed(searchTerm).then(({ data }) => setVideos(data.items));
  }, [searchTerm]);

  return (
    <Box p={2} minHeight="95vh">
      <Typography
        variant="h4"
        fontWeight={900}
        color={darkMode ? 'white' : 'black'}
        mb={3}
        ml={{ sm: '100px' }}
      >
        Search Results for{' '}
        <span style={{ color: '#FC1503' }}>{searchTerm}</span> videos
      </Typography>
      <Box display="flex">
        <Box sx={{ mr: { sm: '100px' } }} />
        {<Videos videos={videos} />}
      </Box>
    </Box>
  );
};

export default SearchFeed;
