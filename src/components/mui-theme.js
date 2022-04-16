import { createTheme } from '@mui/material/styles';

const systemFonts = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
];

const theme = createTheme({
  palette: {
    common: {
      black: 'rgba(0, 0, 0, 0.87)',
    },
    primary: {
      main: '#D00000',
    },
  },
  shape: {
    borderRadius: '10px',
  },
  typography: {
    h1: {
      fontFamily: ['Oswald'].concat(systemFonts).join(','),
    },
    h2: {
      fontFamily: ['Oswald'].concat(systemFonts).join(','),
    },
    h3: {
      fontFamily: ['Oswald'].concat(systemFonts).join(','),
    },
    h4: {
      fontFamily: ['Oswald'].concat(systemFonts).join(','),
    },
    h5: {
      fontFamily: ['Oswald'].concat(systemFonts).join(','),
    },
    h6: {
      fontFamily: ['Oswald'].concat(systemFonts).join(','),
    },
  },
});

export default theme;
