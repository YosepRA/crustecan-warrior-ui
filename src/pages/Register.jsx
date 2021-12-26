import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

import { registerThunk, setUserError } from '../store/user/userSlice.js';
import UserPromptWrapper from '../components/styled/UserPromptWrapper.jsx';
import UserPromptHeader from '../components/styled/UserPromptHeader.jsx';
import UserPromptTextField from '../components/styled/UserPromptTextField.jsx';
import LineSeparator from '../components/styled/LineSeparator.jsx';

const formModel = [
  { type: 'text', name: 'name', label: 'Full Name' },
  { type: 'text', name: 'email', label: 'Email' },
  { type: 'text', name: 'username', label: 'Username' },
  { type: 'password', name: 'password', label: 'Password' },
];

// Formik initial values.
const initialValues = formModel.reduce(
  (acc, current) => ({ ...acc, [current.name]: '' }),
  {},
);

function createFormFields(model, isSubmitting) {
  return model.map(({ type, name, label }) => (
    <Field key={name} name={name}>
      {({ field }) => (
        <UserPromptTextField
          {...field}
          type={type}
          label={label}
          variant="standard"
          fullWidth
          disabled={isSubmitting}
        />
      )}
    </Field>
  ));
}

const Register = function LoginComponent() {
  const { error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const resetUserError = () => {
    const setUserErrorPayload = { status: false, message: '' };

    dispatch(setUserError(setUserErrorPayload));
  };

  /* ========== Effect hooks. ========== */

  useEffect(() => resetUserError, []);

  /* ========== Event handlers. ========== */

  const handleFormSubmit = (values, formikBag) => {
    const navigateCallback = navigate.bind(null, '/dashboard', {
      replace: true,
    });
    const registerThunkPayload = {
      payload: values,
      formikBag,
      navigateCallback,
    };

    resetUserError();
    dispatch(registerThunk(registerThunkPayload));
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
            Register
          </Typography>
        </UserPromptHeader>

        {error.status && <Alert severity="error">{error.message}</Alert>}

        <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
          {({ isSubmitting }) => (
            <Form>
              {createFormFields(formModel, isSubmitting)}

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
                Register
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
          Already have an account? <Link to="/login">Login.</Link>
        </Typography>
      </UserPromptWrapper>
    </Container>
  );
};

export default Register;
