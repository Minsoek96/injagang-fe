/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, isAxiosError } from 'axios';

import Router from 'next/router';

import Cookies from 'js-cookie';

import { ERROR_MESSAGES, TOKEN_KYES } from '@/src/shared/const';

import { tokenReissue } from '../../entities/auth/apis';

import { SERVER } from '../config/apis';

export const API = axios.create({
  baseURL: SERVER,
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use(
  (config) => {
    if (Cookies.get(TOKEN_KYES.ACCESS_TOKEN)) {
      const newConfig = { ...config };
      newConfig.headers.Authorization = Cookies.get(TOKEN_KYES.ACCESS_TOKEN);
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
      handleErrorMessage(errorMessage, config);
    }
    return Promise.reject(error);
  },
);

const handleErrorMessage = (
  message: string,
  originRequest: AxiosRequestConfig,
) => {
  message === ERROR_MESSAGES.JWT_EXPIRED && jwtExpired(originRequest);
};

const unauthorized = () => {
  Router.replace('/login');
};

const serverDisconnected = (message: string) =>
  (message === 'Network Error'
    ? new Error('서버와 연결이 끊겼습니다. 잠시후 다시시도해주세요.')
    : new Error('원인 파악이 불명한 에러가 발생했습니다.'));

const jwtExpired = async (originRequest: AxiosRequestConfig) => {
  try {
    const response = await tokenReissue();
    if (response) {
      const { access } = response.data;
      Cookies.set(TOKEN_KYES.ACCESS_TOKEN, access);
      await reRequest(originRequest);
    }
  } catch (error) {
    if (isAxiosError(error)) {
      const errorMessage = error.response?.data?.message;
      errorMessage && unauthorized();
    }
  }
};

export const reRequest = async (originRequest: AxiosRequestConfig) =>
  API.request(originRequest);
