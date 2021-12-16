import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import FixtureList from './pages/FixtureList.jsx';
import TicketFixtureList from './pages/TicketFixtureList.jsx';
import TicketSearch from './pages/TicketSearch.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

import '@fontsource/roboto';
import '@fontsource/oswald/400.css';

const App = function AppComponent() {
  return (
    <Box className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="fixtures" element={<FixtureList />} />
            <Route path="ticket">
              <Route path="fixtures" element={<TicketFixtureList />} />
              <Route path="search" element={<TicketSearch />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </Router>
    </Box>
  );
};

export default App;
