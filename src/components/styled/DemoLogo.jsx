import { styled } from '@mui/material/styles';

const DemoLogo = styled('div')(({ theme }) => ({
  width: '44px',
  height: 44,
  backgroundColor: theme.palette.primary.main,
  borderRadius: '50%',
}));

export default DemoLogo;
