import { styled } from '@mui/material/styles';

const UserPromptHeader = styled('header')(({ theme }) => ({
  margin: `${theme.spacing(-4)} ${theme.spacing(-2)} ${theme.spacing(2)}`,
  padding: `${theme.spacing(3)} 0`,
  backgroundColor: theme.palette.primary.main,
  borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
  color: theme.palette.primary.contrastText,
}));

export default UserPromptHeader;
