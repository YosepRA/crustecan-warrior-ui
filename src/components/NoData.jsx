import React from 'react';
import Typography from '@mui/material/Typography';

const NoData = function NoDataComponent() {
  return (
    <Typography sx={{ fontStyle: 'italic', textAlign: 'center', p: 2 }}>
      No Data
    </Typography>
  );
};

export default NoData;
