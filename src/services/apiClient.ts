import axios from 'axios';
import { getAccessToken } from './authTokenProvider';

export const apiCLient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10_000,
  headers: {
    Accept: 'application/json',
  },
});

apiCLient.interceptors.request.use(async config => {
  const token = await getAccessToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
