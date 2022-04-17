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
      key={name}
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
        bgcolor: 'common.white',
        boxShadow: '-1px -2px 10px 0px rgba(66, 66, 66, 0.2)',
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
          py: 3,
        }}
      >
        <Typography variant="h5" className="page-footer__brand">
          Crustecan Warrior
        </Typography>

        <Box component="section" className="page-footer__social-media">
          {socialMediaLinks}
        </Box>
      </Container>

      <Box
        className="page-footer__accent"
        sx={{ width: 1, height: 16, bgcolor: 'primary.main' }}
      />
    </Box>
  );
};

export default Footer;
