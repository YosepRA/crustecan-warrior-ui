import { styled } from '@mui/material/styles';

const DemoSponsor = styled('div')(({ theme }) => ({
  width: '50px',
  height: '50px',
  margin: `0 ${theme.spacing(1)}`,
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.grey[300],
  borderRadius: '50%',
  boxShadow: '0 0 9px -1px rgba(99,99,99,0.75)',
}));

export default DemoSponsor;
