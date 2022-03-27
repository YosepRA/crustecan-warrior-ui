import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const BrandLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  textDecoration: 'none',
}));

export default BrandLink;
