import { styled } from '@mui/material/styles';

const LineSeparator = styled('hr')(({ theme }) => ({
  margin: `${theme.spacing(2)} auto ${theme.spacing(2)}`,
  border: 0,
  height: '1px',
  background: theme.palette.text.secondary,
}));

export default LineSeparator;
