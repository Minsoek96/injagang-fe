import axios from 'axios';
import Router from 'next/router';
import Cookies from 'js-cookie';
import { ERROR_MESSAGES, TOKEN_KEYS } from '@/src/shared/const';
import MockAdapter from 'axios-mock-adapter';
import { headers } from 'next/headers';
import {
  API,
} from './client';
import { tokenReissue } from './tokenReissue';

jest.mock('js-cookie');

jest.mock('./tokenReissue');

describe('API Interceptors', () => {
  const context = describe;

  const baseURL = '/test-example';
  const token = { key: 'test_token' };

  let mock: MockAdapter;
  beforeEach(() => {
    mock = new MockAdapter(API);
    jest.clearAllMocks();
  });

  context('요청 인터셉트', () => {
    it('액세스 토큰이 쿠키에 있으면 Authorization 헤더를 추가해야 합니다', async () => {
      (Cookies.get as jest.Mock).mockReturnValue(token);
      mock.onGet(baseURL).reply((config) => {
        expect(config.headers?.Authorization).toBe(token);
        return [200, {}];
      });
      const result = await API.get(baseURL);
    });
  });
});
