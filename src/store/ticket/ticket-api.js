import axios from 'axios';

import { promiseResolver } from '../../utilities/helpers.js';

const { VITE_API_ENDPOINT } = import.meta.env;

async function getTicketDetails(ticketId) {
  const [response, error] = await promiseResolver(
    axios.get(`${VITE_API_ENDPOINT}/ticket/${ticketId}`),
  );

  if (error) {
    throw error;
  } else if (response.data.success === false) {
    throw new Error(response.data.message);
  }

  return response.data;
}

export { getTicketDetails };
