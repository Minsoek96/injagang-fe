import React from 'react';
import axios, { AxiosError } from 'axios';
import { reRequest } from '@/src/shared/apis/errorhandlers';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  shouldHandleError: boolean;
  shouldRethrow: boolean;
  error: AxiosError | null;
}

class APIErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      shouldHandleError: false,
      shouldRethrow: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: AxiosError): ErrorBoundaryState {
    if (
      error.response?.status === 401
      || error.response?.status === 402
      || error.response?.status === 500
    ) {
      return {
        shouldHandleError: true,
        shouldRethrow: false,
        error,
      };
    }
    return {
      shouldHandleError: false,
      shouldRethrow: true,
      error,
    };
  }

  reset() {
    this.setState({ shouldHandleError: false });
    const { error } = this.state;
    if (axios.isAxiosError(error)) {
      const { config } = error;
      if (config) reRequest(config);
    }
  }

  render() {
    const { shouldHandleError, shouldRethrow, error } = this.state;
    const { children } = this.props;

    if (shouldRethrow) {
      throw error;
    }
    if (!shouldHandleError) {
      return children;
    }
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401 || error.response?.status === 402) {
        return <AuthError />;
      }
      return <NetworkError onClickRetry={() => this.reset()} />;
    }
    return <UnknownError onClickRetry={() => this.reset()} />;
  }
}

export default APIErrorBoundary;

function AuthError() {
  return <div>로그인이 필요합니다.</div>;
}

function NetworkError({ onClickRetry }: { onClickRetry: () => void }) {
  return (
    <div>
      네트워크 오류가 발생했습니다.
      {' '}
      <button type="button" onClick={onClickRetry}>
        재시도
      </button>
    </div>
  );
}

function UnknownError({ onClickRetry }: { onClickRetry: () => void }) {
  return (
    <div>
      알 수 없는 오류가 발생했습니다.
      {' '}
      <button type="button" onClick={onClickRetry}>
        재시도
      </button>
    </div>
  );
}
