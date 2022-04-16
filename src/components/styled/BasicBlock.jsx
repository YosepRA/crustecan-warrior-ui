import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const BasicBlock = styled(Box)(({ theme }) => ({
  display: 'block',
  width: '100%',
  height: '240px',
  backgroundColor: theme.palette.grey[200],
}));

export default BasicBlock;
