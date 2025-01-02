import { useState } from 'react';

import axios from 'axios';

import { styled } from 'styled-components';

import {
  ThrowAuthError,
  ThrowError,
  ThrowNetworkError,
} from '@/src/pages/test';
import { ErrorBoundary } from '@/src/features/boundary';
import { MainButton } from '@/src/shared/ui';

export default function ErrorBoundaryTest() {
  const [errorComponent, setErrorComponent] = useState<string | null>(null);

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
    setErrorComponent(null);
  };

  return (
    <Container>
      <h2>ErrorBoundary 테스트</h2>
      <Wrapper>
        <MainButton
          onClick={() => setErrorComponent('general')}
          label=" 일반 에러 발생"
        />
        <MainButton
          onClick={() => setErrorComponent('network')}
          label="네트워크 에러 발생"
        >
          네트워크 에러 발생
        </MainButton>
        <MainButton
          onClick={() => setErrorComponent('auth')}
          label="인증 에러 발생"
        />
      </Wrapper>

      <ErrorBoundary onReset={handleReset} renderFallback={renderFallback}>
        {errorComponent === 'general' && <ThrowError />}
        {errorComponent === 'network' && <ThrowNetworkError />}
        {errorComponent === 'auth' && <ThrowAuthError />}
      </ErrorBoundary>
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
