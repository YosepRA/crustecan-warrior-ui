/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Layout from './components/Layout.jsx';
import RequireAuth from './components/RequireAuth.jsx';
import Home from './pages/Home.jsx';
import FixtureList from './pages/FixtureList.jsx';
import TicketFixtureList from './pages/TicketFixtureList.jsx';
import TicketSearch from './pages/TicketSearch.jsx';
import TicketCheckout from './pages/TicketCheckout.jsx';
import TicketCheckoutResult from './pages/TicketCheckoutResult.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import { getLoginSessionThunk } from './store/user/user-slice.js';

import '@fontsource/roboto';
import '@fontsource/oswald/400.css';

const theme = createTheme({
  palette: {
    common: {
      black: 'rgba(0, 0, 0, 0.87)',
    },
    neutral: {
      main: 'rgba(0, 0, 0, 0.87)',
      contrastText: '#fff',
    },
  },
});

const App = function AppComponent() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoginSessionThunk());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route
                path="fixtures"
                element={
                  <FixtureList
                    initialSearch={{
                      increment: 1,
                      includeSeat: false,
                      homeOnly: false,
                    }}
                  />
                }
              />
              <Route path="ticket">
                <Route
                  path="fixtures"
                  element={
                    <TicketFixtureList
                      initialSearch={{
                        increment: 1,
                        includeSeat: false,
                        homeOnly: true,
                      }}
                    />
                  }
                />
                <Route path="search" element={<TicketSearch />} />
                <Route
                  path="checkout/:fixtureId/*"
                  element={<TicketCheckout />}
                />
                <Route
                  path="checkout/result"
                  element={<TicketCheckoutResult />}
                />
              </Route>
              <Route
                path="dashboard"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
};

export default App;
