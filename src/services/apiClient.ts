import axios from 'axios';

export const apiCLient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10_000,
  headers: {
    Accept: 'application/json',
  },
});
