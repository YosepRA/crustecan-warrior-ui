import { styled } from '@mui/material/styles';

const Backdrop = styled('div')(({ theme, open }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  zIndex: theme.zIndex.drawer - 1,
  visibility: open ? 'visible' : 'hidden',
  opacity: open ? 1 : 0,
  transition: 'all 300ms ease-out',
}));

export default Backdrop;
