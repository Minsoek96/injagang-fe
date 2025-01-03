import { useState } from 'react';

import axios from 'axios';

import { styled } from 'styled-components';

import {
  ThrowError,
} from '@/src/pages/test';

import { ErrorBoundary } from '@/src/features/boundary';
import GlobalErrorBoundary from '@/src/features/boundary/GlobalErrorBoundary';

import { MainButton } from '@/src/shared/ui';

type ErrorType = 'network' | 'timeout' | 'auth' | 'forbidden' | 'badRequest'

export default function ErrorBoundaryTest() {
  const [errorType, setErrorType] = useState<ErrorType | null>(null);

  const errorButtons = [
    { type: 'network', label: '네트워크 에러' },
    { type: 'timeout', label: '타임아웃 에러' },
    { type: 'auth', label: '인증 에러 (401)' },
    { type: 'forbidden', label: '권한 에러 (403)' },
    { type: 'badRequest', label: '잘못된 요청 (400)' },
  ] as const;

  const renderFallback = (error: Error, reset: () => void) => (
    <ErrorDisplay>
      <h3>에러가 발생했습니다!</h3>
      <p>
        타입:
        {error.name}
      </p>
      <p>
        메시지:
        {error.message}
      </p>
      {error instanceof axios.AxiosError && (
        <p>
          에러 코드:
          {error.code}
        </p>
      )}
      <MainButton onClick={reset} label="다시 시도" variant="signature" />
    </ErrorDisplay>
  );

  const handleReset = () => {
    setErrorType(null);
  };

  return (
    <Container>
      <h2>ErrorBoundary 테스트</h2>
      <GlobalErrorBoundary>
        <Wrapper>
          {errorButtons.map(({ type, label }) => (
            <MainButton
              key={type}
              onClick={() => setErrorType(type)}
              label={label}
            />
          ))}
        </Wrapper>

        <ErrorBoundary onReset={handleReset} renderFallback={renderFallback}>
          {errorType && <ThrowError type={errorType} />}
        </ErrorBoundary>
      </GlobalErrorBoundary>
    </Container>
  );
}

const Container = styled.div`
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 2rem;
`;

const ErrorDisplay = styled.div`
  padding: 1rem;
  margin: 1rem 0;
  border: 1px solid #ff0000;
  border-radius: 4px;
  background-color: #fff5f5;
`;
