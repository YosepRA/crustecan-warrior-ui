import React from 'react';
import Typography from '@mui/material/Typography';

const OverviewSectionHeader = function OverviewSectionHeaderComponent({
  title,
}) {
  return (
    <Typography
      variant="h5"
      component="h2"
      className="overview__title"
      sx={{ mb: 1, color: 'text.secondary' }}
    >
      {title}
    </Typography>
  );
};

export default OverviewSectionHeader;
