import { Component, PropsWithChildren } from 'react';

import { AxiosError } from 'axios';
import { ERROR_CODE } from './error-code';

interface ErrorBoundaryState {
  error: Error | null;
  errorData: typeof ERROR_CODE[keyof typeof ERROR_CODE] | null;
}

class GlobalErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = { error: null, errorData: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    if (error instanceof AxiosError) {
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

  // reset = () => {
  //   this.setState({ error: null, errorData: null });
  // };

  render() {
    const { children } = this.props;
    const { error, errorData } = this.state;

    if (error && errorData?.requireLogin) {
      return (
        <div> 로그인을 해주세요.</div>
      );
    }
    if (error && errorData?.code === '통신 에러') {
      return (
        <div> 서버와의 연결이 끊어짐</div>
      );
    }

    return children;
  }
}

export default GlobalErrorBoundary;
