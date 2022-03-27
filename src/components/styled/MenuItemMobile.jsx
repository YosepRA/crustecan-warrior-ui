import { styled } from '@mui/material/styles';

const MenuItemMobile = styled('p')(({ theme }) => ({
  margin: 0,
  padding: theme.spacing(1.5),
  textAlign: 'center',
  fontSize: '1.2rem',
  color: theme.palette.primary.contrastText,
  '& a': {
    color: 'inherit',
    textDecoration: 'none',
    '&.active': {
      textDecoration: 'underline',
    },
  },
  '& button': {
    background: 'none',
    border: 'none',
    color: 'inherit',
    fontSize: 'inherit',
  },
}));

export default MenuItemMobile;
