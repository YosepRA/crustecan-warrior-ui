import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    marginBottom: theme.spacing(3),
    textAlign: 'center',
  },
}));

export default SectionTitle;
