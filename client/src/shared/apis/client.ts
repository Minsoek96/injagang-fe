import axios from 'axios';

import { getCookies } from '@/src/shared/utils';
import { errorManager } from './errorhandlers';
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
      throw error;
    }
    const originRequest = error.response;
    const { status, config } = originRequest;
    const errorMessage = originRequest.data.message;

    if (status === 401 && !config.isRetrying) {
      try {
        await errorManager(errorMessage, config, error);
      // eslint-disable-next-line no-shadow
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);
