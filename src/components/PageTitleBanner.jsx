import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const PageTitleBanner = function PageTitleBannerComponent({ title }) {
  return (
    <Box
      component="section"
      className="page-title-banner"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: 1,
        height: 140,
        mt: -2,
        mb: 5,
        bgcolor: 'common.black',
      }}
    >
      <Typography variant="h4" sx={{ mb: 3, color: 'common.white' }}>
        {title}
      </Typography>
    </Box>
  );
};

export default PageTitleBanner;
