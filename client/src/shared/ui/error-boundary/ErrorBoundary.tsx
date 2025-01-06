import React, { Component, PropsWithChildren } from 'react';

import { AxiosError } from 'axios';

import { ERROR_CODE } from './error-code';

interface ErrorBoundaryProps extends PropsWithChildren {
 // ErrorBoundary 타입에서는 defaultProps를 지원하지 않음
  // eslint-disable-next-line react/require-default-props
  onReset?: () => void;
  renderFallback: (error: Error, reset: () => void) => React.ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
  errorData: typeof ERROR_CODE[keyof typeof ERROR_CODE] | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null, errorData: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    if (error instanceof AxiosError) {
      const serverErrorCode = error?.response?.data?.code;
      const httpErrorCode = error?.response?.status;
      const axiosErrorCode = error?.code;

      if (
        (serverErrorCode && ERROR_CODE[serverErrorCode]?.requireLogin)
        || (httpErrorCode && ERROR_CODE[httpErrorCode]?.requireLogin)
        || axiosErrorCode === 'ERR_NETWORK'
      ) {
        throw error;
      }

      const errorData = (serverErrorCode && ERROR_CODE[serverErrorCode])
        || (httpErrorCode && ERROR_CODE[httpErrorCode])
        || (axiosErrorCode && ERROR_CODE[axiosErrorCode])
        || ERROR_CODE.default;

      return { error, errorData };
    }

    return { error, errorData: ERROR_CODE.default };
  }

  reset = () => {
    const { onReset } = this.props;
    this.setState({ error: null, errorData: null });
    onReset?.();
  };

  render() {
    const { renderFallback, children } = this.props;
    const { error, errorData } = this.state;

    if (error && errorData) {
      return renderFallback(error, this.reset);
    }

    return children;
  }
}

export default ErrorBoundary;
