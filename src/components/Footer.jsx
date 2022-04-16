import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import { grey } from '@mui/material/colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const socialMedia = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com',
    icon: ['fab', 'facebook'],
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com',
    icon: ['fab', 'instagram'],
  },
  {
    name: 'Twitter',
    url: 'https://www.twitter.com',
    icon: ['fab', 'twitter'],
  },
];

const Footer = function FooterComponent() {
  const socialMediaLinks = socialMedia.map(({ name, url, icon }) => (
    <IconButton
      className="page-footer__social-media"
      aria-label={name.toLowerCase()}
      component={Link}
      href={url}
      target="_blank"
      rel="noreferrer"
    >
      <FontAwesomeIcon icon={icon} />
    </IconButton>
  ));

  return (
    <Box
      component="footer"
      className="page-footer"
      sx={{
        position: 'relative',
        zIndex: 'appBar',
        pt: 3,
        bgcolor: grey[200],
        '.page-footer': {
          '&__social-media:last-child': {
            pr: 0,
          },
        },
      }}
    >
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Typography variant="h5" className="page-footer__brand" sx={{ mb: 3 }}>
          Crustecan Warrior
        </Typography>

        <Box
          component="section"
          className="page-footer__social-media"
          sx={{ mb: 3 }}
        >
          {socialMediaLinks}
        </Box>

        <Box
          className="page-footer__accent"
          sx={{ flex: '100%', height: 16, mx: -2, bgcolor: 'primary.main' }}
        />
      </Container>
    </Box>
  );
};

export default Footer;
