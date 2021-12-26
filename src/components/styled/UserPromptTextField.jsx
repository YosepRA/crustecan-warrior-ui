import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const UserPromptTextField = styled(TextField)(({ theme }) => ({
  display: 'block',
  marginBottom: theme.spacing(3),
}));

export default UserPromptTextField;
