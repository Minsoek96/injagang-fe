import axios from 'axios';

import { getCookies } from '@/src/shared/utils';
import { errorManager, serverDisconnected } from './errorhandlers';
import { SERVER } from '../config/apis';

export const API = axios.create({
  baseURL: SERVER,
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use(
  (config) => {
    const { accessToken } = getCookies();
    if (accessToken) {
      const newConfig = { ...config };
      newConfig.headers.Authorization = `Bearer ${accessToken}`;
      return newConfig;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response) {
      throw serverDisconnected(error.message);
    }
    const originRequest = error.response;

    const { status, config } = originRequest;
    const errorMessage = originRequest.data.message;
    if (status === 401) {
      errorManager(errorMessage, config);
    }
    return Promise.reject(error);
  },
);
