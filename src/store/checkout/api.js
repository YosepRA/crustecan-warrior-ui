import axios from 'axios';

import { promiseResolver } from '../../utilities/helpers.js';

const { VITE_API_ENDPOINT } = import.meta.env;

axios.defaults.withCredentials = true;

async function createCheckoutSession(payload) {
  const [response, error] = await promiseResolver(
    axios.post(`${VITE_API_ENDPOINT}/ticket/create-checkout-session`, payload),
  );

  if (error) {
    throw error;
  } else if (response.data.success === false) {
    throw new Error(response.data.message);
  }

  return response.data;
}

export { createCheckoutSession };
