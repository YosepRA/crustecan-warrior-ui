/* eslint-disable indent */

import { createSlice } from '@reduxjs/toolkit';

import { login, register, getLoginSession, logout } from './userAPI.js';
import { promiseResolver } from '../../utilities/helpers.js';

const initialState = {
  authenticated: false,
  username: '',
  error: {
    status: false,
    message: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthenticate: (state, { payload: { status, user } }) => {
      state.error = initialState.error;

      if (!status) {
        state.authenticated = false;
        state.username = '';

        return undefined;
      }

      state.authenticated = true;
      state.username = user.username;

      return undefined;
    },
    setUserError: (state, action) => {
      state.error = action.payload;
    },
  },
});

const { setAuthenticate, setUserError } = userSlice.actions;

const loginThunk =
  ({ payload, formikBag, navigateCallback }) =>
  async (dispatch) => {
    const [data, loginError] = await promiseResolver(login(payload));

    if (loginError) {
      formikBag.resetForm();

      const setUserErrorPayload = { status: true, message: loginError.message };

      dispatch(setUserError(setUserErrorPayload));

      return undefined;
    }

    const setAuthenticatePayload = { status: true, user: data.user };

    dispatch(setAuthenticate(setAuthenticatePayload));
    navigateCallback();

    return undefined;
  };

const registerThunk =
  ({ payload, formikBag, navigateCallback }) =>
  async (dispatch) => {
    const [data, registerError] = await promiseResolver(register(payload));

    if (registerError) {
      formikBag.setSubmitting(false);

      const setUserErrorPayload = {
        status: true,
        message: registerError.message,
      };

      dispatch(setUserError(setUserErrorPayload));

      return undefined;
    }

    const setAuthenticatePayload = { status: true, user: data.user };

    dispatch(setAuthenticate(setAuthenticatePayload));
    navigateCallback();

    return undefined;
  };

const getLoginSessionThunk = () => async (dispatch) => {
  const [data, loginSessionError] = await promiseResolver(getLoginSession());

  if (loginSessionError) return undefined;

  const setAuthenticatePayload = { status: true, user: data.user };

  dispatch(setAuthenticate(setAuthenticatePayload));

  return undefined;
};

const logoutThunk = (navigateCallback) => async (dispatch) => {
  await logout();

  const setAuthenticatePayload = { status: false };

  navigateCallback();
  dispatch(setAuthenticate(setAuthenticatePayload));
};

export {
  loginThunk,
  registerThunk,
  getLoginSessionThunk,
  logoutThunk,
  setUserError,
};

export default userSlice.reducer;
