import { styled } from '@mui/material/styles';

const MenuItemMobile = styled('p')(({ theme }) => ({
  margin: 0,
  padding: `0 ${theme.spacing(3)}`,
  fontFamily: theme.typography.h1.fontFamily,
  textAlign: 'center',
  color: theme.palette.text.primary,
  ':not(:last-child)': {
    marginBottom: theme.spacing(2),
  },
  '& a': {
    display: 'block',
    padding: `${theme.spacing(0.5)} 0`,
    color: 'inherit',
    textDecoration: 'none',
    textTransform: 'uppercase',
    borderRadius: theme.shape.borderRadius,
    '&.active': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  },
  '& button': {
    background: 'none',
    border: 'none',
    color: 'inherit',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    textTransform: 'uppercase',
  },
}));

export default MenuItemMobile;
