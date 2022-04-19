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
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

import Layout from './components/Layout.jsx';
import RequireAuth from './components/RequireAuth.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Home from './pages/Home.jsx';
import FixtureList from './pages/FixtureList.jsx';
import TicketFixtureList from './pages/TicketFixtureList.jsx';
import TicketSearch from './pages/TicketSearch.jsx';
import TicketCheckout from './pages/TicketCheckout.jsx';
import TicketCheckoutResult from './pages/TicketCheckoutResult.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Overview from './components/dashboard/Overview.jsx';
import TicketList from './components/dashboard/TicketList.jsx';
import TransactionList from './components/dashboard/TransactionList.jsx';
import { getLoginSessionThunk } from './store/user/slice.js';
import theme from './components/mui-theme.js';

import '@fontsource/roboto';
import '@fontsource/oswald';

// FontAwesome library.
library.add(faTrophy, faFacebook, faInstagram, faTwitter);

const App = function AppComponent() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoginSessionThunk());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box className="App">
        <Router>
          <ScrollToTop />

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
                  element={
                    <RequireAuth>
                      <TicketCheckout />
                    </RequireAuth>
                  }
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
              >
                <Route index element={<Navigate to="overview" />} />
                <Route path="overview" element={<Overview />} />
                <Route
                  path="ticket"
                  element={
                    <TicketList initialSearch={{ latest: false, page: 1 }} />
                  }
                />
                <Route
                  path="transaction"
                  element={
                    <TransactionList
                      initialSearch={{ latest: false, page: 1 }}
                    />
                  }
                />
              </Route>

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
