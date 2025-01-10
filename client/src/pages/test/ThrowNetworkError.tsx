import axios from 'axios';

const ThrowNetworkError = () => {
  throw new axios.AxiosError(
    'Network Error',
    'ERR_NETWORK',
  );
};

export default ThrowNetworkError;
