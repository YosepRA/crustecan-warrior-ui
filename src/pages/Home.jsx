import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import SectionWrapper from '../components/styled/SectionWrapper.jsx';
import SectionTitle from '../components/styled/SectionTitle.jsx';
import DemoSponsor from '../components/styled/DemoSponsor.jsx';
import FixtureCard from '../components/FixtureCard.jsx';
import HonorCard from '../components/HonorCard.jsx';
import { useGetFixtureListQuery } from '../store/fixture/service.js';
import bannerBg from '../assets/leah-hetteberg-b81O1CJmKqY-unsplash.jpg';
import memberBg from '../assets/leah-hetteberg-0pSsWN8uqAE-unsplash.jpg';

const honors = [
  { name: 'Premier League', total: 2 },
  { name: 'Champions League', total: 3 },
  { name: 'Vance Cup', total: 5 },
];

const Home = function HomeComponent() {
  const { data: fixtures, isLoading } = useGetFixtureListQuery({
    increment: 1,
    includeSeat: false,
    homeOnly: false,
  });

  /* ========== Event handlers ========== */

  const handleMembership = () => {
    alert('Membership feature is not available yet.');
  };

  /* ========== Utilities ========== */

  // Get first fixture and transform its date string to date object.
  const nextFixture = fixtures && {
    ...fixtures.data[0],
    date: new Date(fixtures.data[0].date),
  };

  const honorCards = honors.map((honor) => (
    <HonorCard key={honor.name} honor={honor} />
  ));

  const sponsors = [...Array(8)].map((value, index) => (
    <DemoSponsor key={index} />
  ));

  return (
    <Container>
      <SectionWrapper className="banner" sx={{ mt: -2, mx: -2 }}>
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: 1,
            height: 240,
            background: `fixed url(${bannerBg}) no-repeat top center/120%`,
            ':after': {
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 1,
              display: 'block',
              width: 1,
              height: 1,
              content: '""',
              bgcolor: 'rgba(0, 0, 0, 0.5)',
            },
            '.banner__win': {
              fontSize: '5rem',
              color: 'primary.main',
              fontWeight: '700',
            },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              position: 'relative',
              zIndex: 2,
              color: 'primary.contrastText',
            }}
          >
            We are here
          </Typography>
          <Typography
            variant="h3"
            sx={{
              position: 'relative',
              zIndex: 2,
              color: 'primary.contrastText',
            }}
          >
            to <span className="banner__win">WIN</span>
          </Typography>
        </Box>
      </SectionWrapper>

      <SectionWrapper className="next-fixture">
        <SectionTitle variant="h4">Next Fixture</SectionTitle>

        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : (
          <FixtureCard fixture={nextFixture} featured />
        )}
      </SectionWrapper>

      <SectionWrapper className="honors">
        <SectionTitle variant="h4">Our Honors</SectionTitle>

        <Grid container spacing={2}>
          {honorCards}
        </Grid>
      </SectionWrapper>

      <SectionWrapper className="member" sx={{ mx: '-16px' }}>
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: 1,
            p: 5,
            background: `fixed url(${memberBg}) no-repeat top center/cover black`,
            color: 'common.white',
            '.member': {
              '&__benefit-list': {
                zIndex: 2,
              },
            },
            ':after': {
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 1,
              display: 'block',
              width: 1,
              height: 1,
              content: '""',
              bgcolor: 'rgba(0, 0, 0, 0.5)',
            },
          }}
        >
          <Typography
            variant="h5"
            className="member__title"
            sx={{ textAlign: 'center', zIndex: 2 }}
          >
            Crustecan Warrior Membership
          </Typography>

          <ul className="member__benefit-list">
            <li className="member__benefit-item">Loyalty points</li>
            <li className="member__benefit-item">
              Discounts at merchandise store
            </li>
            <li className="member__benefit-item">Free drink bar on matchday</li>
          </ul>

          <Button
            variant="outlined"
            className="member__action-btn"
            sx={{
              borderColor: 'common.white',
              color: 'common.white',
              zIndex: 2,
              ':active': {
                borderColor: 'common.white',
              },
              ':hover': {
                borderColor: 'common.white',
              },
            }}
            onClick={handleMembership}
          >
            Become a member
          </Button>
        </Box>
      </SectionWrapper>

      <SectionWrapper className="sponsors">
        <SectionTitle variant="h4">Our Sponsors</SectionTitle>

        <Stack
          direction="row"
          justifyContent="center"
          sx={{ flexWrap: 'wrap' }}
        >
          {sponsors}
        </Stack>
      </SectionWrapper>
    </Container>
  );
};

export default Home;
