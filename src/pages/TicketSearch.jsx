import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import SearchIcon from '@mui/icons-material/Search';

import TicketSearchResult from '../components/TicketSearchResult.jsx';
import { getTicketDetails } from '../store/ticket/ticket-slice.js';

const TicketSearch = function TicketSearchComponent() {
  const [ticketId, setTicketId] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const handleChange = ({ target: { value } }) => {
    setTicketId(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setHasSubmitted(true);
    dispatch(getTicketDetails(ticketId));
  };

  return (
    <Container>
      <Box component="section">
        <Box
          component="form"
          noValidate
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 3,
            py: 5,
          }}
          onSubmit={handleSubmit}
        >
          <TextField
            name="fixtureId"
            label="Search using fixture ID"
            value={ticketId}
            onChange={handleChange}
            autoFocus
            inputRef={inputRef}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ display: 'inline-block', ml: 1 }}
          >
            Search
          </Button>
        </Box>
      </Box>

      <TicketSearchResult hasSubmitted={hasSubmitted} />
    </Container>
  );
};

export default TicketSearch;
