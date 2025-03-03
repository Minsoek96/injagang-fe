import { Component, PropsWithChildren } from 'react';

import { AxiosError } from 'axios';

import RequireLogin from './ui/RequireLogin';
import ConnectionError from './ui/ConnectionError';
import { ERROR_CODE } from './error-code';

interface ErrorBoundaryState {
  error: Error | null;
  errorData: typeof ERROR_CODE[keyof typeof ERROR_CODE] | null;
}

const isDevelopment = process.env.NODE_ENV === 'development';
class GlobalErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = { error: null, errorData: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    if (error instanceof AxiosError) {
      if (isDevelopment) {
        console.error(error);
      }
      const serverErrorCode = error?.response?.data?.code;
      const httpErrorCode = error?.response?.status;
      const axiosErrorCode = error?.code;

      const errorData = (serverErrorCode && ERROR_CODE[serverErrorCode])
        || (httpErrorCode && ERROR_CODE[httpErrorCode])
        || (axiosErrorCode && ERROR_CODE[axiosErrorCode])
        || ERROR_CODE.default;

      return { error, errorData };
    }

    return { error, errorData: ERROR_CODE.default };
  }

  reset = () => {
    this.setState({ error: null, errorData: null });
  };

  render() {
    const { children } = this.props;
    const { error, errorData } = this.state;

    if (error && errorData?.requireLogin) {
      return (
        <RequireLogin onReset={this.reset} />
      );
    }
    if (error && errorData) {
      return (
        <ConnectionError onReset={this.reset} />
      );
    }

    return children;
  }
}

export default GlobalErrorBoundary;
