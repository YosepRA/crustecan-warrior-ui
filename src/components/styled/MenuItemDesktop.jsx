import { styled } from '@mui/material/styles';

const MenuItemDesktop = styled('p')(({ theme }) => ({
  display: 'inline-block',
  margin: `0 ${theme.spacing(1)}`,
  fontFamily: `Oswald, ${theme.typography.fontFamily}`,
  color: theme.palette.text.primary,
  '& a': {
    color: 'inherit',
    textDecoration: 'none',
    ':hover': {
      color: theme.palette.text.secondary,
    },
    '&.active': {
      color: theme.palette.text.secondary,
      textDecoration: 'underline',
    },
  },
  '& button': {
    background: 'none',
    padding: 0,
    border: 'none',
    fontFamily: 'inherit',
    color: 'inherit',
    fontSize: 'inherit',
    cursor: 'pointer',
    ':hover': {
      color: theme.palette.text.secondary,
    },
  },
}));

export default MenuItemDesktop;
