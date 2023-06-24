import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Typography, Box, Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useSelector } from 'react-redux';

import {
  useLazyGetVidDetailsQuery,
  useLazyGetSimilarQuery,
} from '../services/youtubeApi';

import Videos from './Videos';
import Loader from './Loader';

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const { id } = useParams();
  const darkMode = useSelector((state) => state.redux.darkMode);

  const [getVids] = useLazyGetVidDetailsQuery(id);
  const [getSimilar] = useLazyGetSimilarQuery(id);

  useEffect(() => {
    getVids(id).then(({ data }) => setVideoDetail(data.items[0]));

    getSimilar(id).then(({ data }) => setVideos(data.items));
  }, [id]);

  if (!videoDetail?.snippet) return <Loader />;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: 'column', md: 'row' }}>
        <Box flex={1} sx={{ mb: '40rem' }}>
          <Box
            sx={{
              width: { xs: '100%', md: '75%' },
              position: 'absolute',
              top: { xs: '200px', sm: '86px' },
            }}
          >
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />

            <Typography
              color={darkMode ? 'white' : 'black'}
              variant="h5"
              fontWeight="bold"
              p={2}
            >
              {videoDetail.snippet.title}
            </Typography>

            <Stack
              direction="row"
              justifyContent="space-between"
              sx={darkMode ? { color: 'white' } : { color: 'black' }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${videoDetail.snippet.channelId}`}>
                <Typography
                  variant={{ sm: 'subtitle1', md: 'h6' }}
                  color={darkMode ? 'white' : 'black'}
                >
                  {videoDetail.snippet.channelTitle}
                  <CheckCircleIcon
                    sx={{ fontSize: '12px', color: 'gray', ml: '5px' }}
                  />
                </Typography>
              </Link>

              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(videoDetail.statistics.viewCount).toLocaleString()}{' '}
                  views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(videoDetail.statistics.likeCount).toLocaleString()}{' '}
                  likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>

        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
