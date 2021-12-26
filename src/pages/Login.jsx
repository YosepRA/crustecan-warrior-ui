import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

import UserPromptWrapper from '../components/styled/UserPromptWrapper.jsx';
import UserPromptHeader from '../components/styled/UserPromptHeader.jsx';
import UserPromptTextField from '../components/styled/UserPromptTextField.jsx';
import LineSeparator from '../components/styled/LineSeparator.jsx';
import { loginThunk, setUserError } from '../store/user/userSlice.js';

// Formik initial values.
const initialValues = {
  username: '',
  password: '',
};

const Login = function LoginComponent() {
  const { error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const resetUserError = () => {
    const setUserErrorPayload = { status: false, message: '' };

    dispatch(setUserError(setUserErrorPayload));
  };

  /* ========== Effect hooks. ========== */

  useEffect(() => resetUserError, []);

  /* ========== Event handlers. ========== */

  const handleFormSubmit = (values, formikBag) => {
    /* If login is the result of redirection from a protected page, redirect back
    to that page. */
    const navigateCallback = navigate.bind(null, from, { replace: true });
    const loginThunkPayload = { payload: values, formikBag, navigateCallback };

    resetUserError();
    dispatch(loginThunk(loginThunkPayload));
  };

  /* ========== Component return. ========== */

  return (
    <Container>
      <UserPromptWrapper elevation={2}>
        <UserPromptHeader className="login__header">
          <Typography
            variant="h4"
            component="h1"
            sx={{ textAlign: 'center' }}
            className="login__title"
          >
            Login
          </Typography>
        </UserPromptHeader>

        {error.status && <Alert severity="error">{error.message}</Alert>}

        <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <Field name="username">
                {({ field }) => (
                  <UserPromptTextField
                    {...field}
                    type="text"
                    label="Username"
                    variant="standard"
                    fullWidth
                    disabled={isSubmitting}
                  />
                )}
              </Field>

              <Field name="password">
                {({ field }) => (
                  <UserPromptTextField
                    {...field}
                    type="password"
                    label="Password"
                    variant="standard"
                    fullWidth
                    disabled={isSubmitting}
                  />
                )}
              </Field>

              <Button
                type="submit"
                variant="contained"
                sx={{ width: 1 }}
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <CircularProgress
                    color="inherit"
                    size="20px"
                    sx={{ mr: 0.5 }}
                  />
                )}
                Login
              </Button>
            </Form>
          )}
        </Formik>

        <LineSeparator />

        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ textAlign: 'center' }}
        >
          Don&apos;t have an account?{' '}
          <Link to="/register">Create a new account.</Link>
        </Typography>
      </UserPromptWrapper>
    </Container>
  );
};

export default Login;
