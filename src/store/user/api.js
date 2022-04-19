import axios from 'axios';

import { promiseResolver } from '../../utilities/helpers.js';

const { VITE_API_ENDPOINT } = import.meta.env;

axios.defaults.withCredentials = true;

async function login(payload) {
  const [response, loginError] = await promiseResolver(
    axios.post(`${VITE_API_ENDPOINT}/user/login`, payload),
  );

  if (loginError) {
    throw loginError;
  } else if (response.data.success === false) {
    throw new Error(response.data.message);
  }

  return response.data;
}

async function register(payload) {
  const [response, registerError] = await promiseResolver(
    axios.post(`${VITE_API_ENDPOINT}/user/register`, payload),
  );

  if (registerError) {
    throw registerError;
  } else if (response.data.success === false) {
    throw new Error(response.data.message);
  }

  return response.data;
}

async function getLoginSession() {
  const [response, loginSessionError] = await promiseResolver(
    axios.get(`${VITE_API_ENDPOINT}/user/login-session`),
  );

  if (loginSessionError) {
    throw loginSessionError;
  } else if (response.data.success === false) {
    throw new Error(response.data.message);
  }

  return response.data;
}

async function logout() {
  const [response, logoutError] = await promiseResolver(
    axios.get(`${VITE_API_ENDPOINT}/user/logout`),
  );

  if (logoutError) {
    throw logoutError;
  } else if (response.data.success === false) {
    throw new Error(response.data.message);
  }

  return response.data;
}

export { login, register, getLoginSession, logout };
