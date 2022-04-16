// To give consistent spacing between content section. E.g. Home.
import { styled } from '@mui/material/styles';

const SectionWrapper = styled('section')(({ theme }) => ({
  ':not(:last-child)': {
    marginBottom: theme.spacing(5),
  },
}));

export default SectionWrapper;
