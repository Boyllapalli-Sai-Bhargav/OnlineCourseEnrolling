import React from 'react';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import { Box, Typography } from '@mui/material';

const FeatureCard = ({ Icon, title, description }) => (
  <Box display="flex" alignItems="center" width="30%" padding="10px">
    <Icon fontSize="large" style={{ color: 'black', marginRight: '10px' }} />
    <Box>
      <Typography variant="subtitle1" fontWeight="bold" style={{ fontFamily: 'Nunito, sans-serif' }}>
        {title}
      </Typography>
      <Typography variant="body2" style={{ fontFamily: 'Nunito, sans-serif' }}>
        {description}
      </Typography>
    </Box>
  </Box>
);

const Features = () => {
  return (
    <Box display="flex" justifyContent="space-around" padding="20px" bgcolor="white">
      <FeatureCard
        Icon={PlayCircleOutlineIcon}
        title="Learn in-demand skills with over 250,000 video courses"
        description=""
      />
      <FeatureCard
        Icon={StarOutlineIcon}
        title="Choose courses taught by real-world experts"
        description=""
      />
      <FeatureCard
        Icon={AllInclusiveIcon}
        title="Learn at your own pace, with lifetime access on mobile and desktop"
        description=""
      />
    </Box>
  );
};

export default Features;
