import axios from 'axios';

const ThrowAuthError = () => {
  const error = new axios.AxiosError('Unauthorized');
  error.response = {
    status: 401,
    data: { code: '401' },
    statusText: '',
    headers: {},
    config: {} as never,
  };
  throw error;
};

export default ThrowAuthError;
