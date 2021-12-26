import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const UserPromptWrapper = styled(Paper)(({ theme }) => ({
  maxWidth: '300px',
  margin: '0 auto',
  padding: `${theme.spacing(4)} ${theme.spacing(2)}`,
}));

export default UserPromptWrapper;
