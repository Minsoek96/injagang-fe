import { fetcher, METHOD } from './fetcher';

import { API } from '../apis';

jest.mock('../apis', () => ({
  API: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('fetcher 함수', () => {
  describe('HTTP 메서드로 API 요청을 보낼 때', () => {
    const context = describe;

    const mockUrl = '/test-url';
    const mockResponse = { data: 'test data' };
    const mockParams = { param1: 'value1' };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    context('GET 요청일 때', () => {
      it('API.get이 호출되어야 한다', async () => {
        (API.get as jest.Mock).mockResolvedValue(mockResponse);

        const result = await fetcher(METHOD.GET, mockUrl, mockParams);

        expect(API.get).toHaveBeenCalledWith(mockUrl, mockParams);
        expect(result).toEqual(mockResponse);
      });
    });

    context('POST 요청일 때', () => {
      it('API.post가 호출되어야 한다', async () => {
        (API.post as jest.Mock).mockResolvedValue(mockResponse);

        const result = await fetcher(METHOD.POST, mockUrl, mockParams);

        expect(API.post).toHaveBeenCalledWith(mockUrl, mockParams);
        expect(result).toEqual(mockResponse);
      });
    });

    context('PUT 요청일 때', () => {
      it('API.put이 호출되어야 한다', async () => {
        (API.put as jest.Mock).mockResolvedValue(mockResponse);

        const result = await fetcher(METHOD.PUT, mockUrl, mockParams);

        expect(API.put).toHaveBeenCalledWith(mockUrl, mockParams);
        expect(result).toEqual(mockResponse);
      });
    });

    context('PATCH 요청일 때', () => {
      it('API.patch가 호출되어야 한다', async () => {
        (API.patch as jest.Mock).mockResolvedValue(mockResponse);

        const result = await fetcher(METHOD.PATCH, mockUrl, mockParams);

        expect(API.patch).toHaveBeenCalledWith(mockUrl, mockParams);
        expect(result).toEqual(mockResponse);
      });
    });

    context('DELETE 요청일 때', () => {
      it('API.delete가 호출되어야 한다', async () => {
        (API.delete as jest.Mock).mockResolvedValue(mockResponse);

        const result = await fetcher(METHOD.DELETE, mockUrl, mockParams);

        expect(API.delete).toHaveBeenCalledWith(mockUrl, mockParams);
        expect(result).toEqual(mockResponse);
      });
    });
  });
});
