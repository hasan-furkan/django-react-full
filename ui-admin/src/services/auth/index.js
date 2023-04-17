import axios from 'axios';

export const registerServices = (data) => {
  // eslint-disable-next-line no-undef
  return axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, data);
};
