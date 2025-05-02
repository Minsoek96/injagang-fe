import { useMemo } from 'react';

import { useRouter } from 'next/router';

import { styled } from 'styled-components';
import { BiErrorAlt } from 'react-icons/bi';

import { blink, styleMixin, V } from '@/src/shared/styles';
import { AUTH_ERROR_CODES } from '@/src/shared/const';
import { keys } from '@/src/shared/utils';

type ErrorMessage = {
  title: string;
  description: string[];
};

type ErrorCodeType = typeof AUTH_ERROR_CODES[keyof typeof AUTH_ERROR_CODES] | string;

const ERROR_MESSAGES: Record<ErrorCodeType, ErrorMessage> = {
  [AUTH_ERROR_CODES.TOKEN_EXPIRED]: {
    title: '로그인 세션이 만료되었습니다.',
    description: ['다시 로그인해 주세요.'],
  },
  [AUTH_ERROR_CODES.ACCESS_DENIED]: {
    title: '페이지 접근 권한이 없습니다.',
    description: ['로그인이 필요합니다.'],
  },
  [AUTH_ERROR_CODES.ADMIN_ONLY]: {
    title: '관리자 전용 페이지입니다.',
    description: ['관리자 계정으로 로그인해 주세요.'],
  },
  default: {
    title: '오류가 발생했습니다.',
    description: ['다시 시도해 주세요.'],
  },
};

export default function AuthErrorDisplay() {
  const router = useRouter();
  const { error } = router.query;

  const errorData = useMemo(
    () =>

      ERROR_MESSAGES[error as string] || ERROR_MESSAGES.default
    , [error],
  );

  if (!error) {
    return null;
  }

  return (
    <ErrorWrapper>
      <ErrorIcon>
        <BiErrorAlt />
      </ErrorIcon>
      <ErrorMessage>
        <p>{errorData.title}</p>
        <p>
          {errorData.description.map((item, index) => (
            <p key={keys(item, index)}>{item}</p>
          ))}
        </p>
      </ErrorMessage>
    </ErrorWrapper>
  );
}

const ErrorWrapper = styled.div`
  ${styleMixin.Flex('center', 'flex-start')};
  gap: 1.2rem;
  margin-block: 1rem;
  padding: 1.6rem 2rem;
  border: 2px dashed ${(props) => props.theme.colors.highlightLine};
  width: 100%;
  max-width: 40rem;
  height: 8rem;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.secondary};

  @media screen and (max-width: ${V.mediaMobile}) {
    width: 35rem;
  }
`;

const ErrorIcon = styled.div`
  flex-shrink: 0;
  color: ${(props) => props.theme.colors.signatureColor};
  font-size: 4.4rem;
  animation: ${blink} 2s ease infinite;
`;

const ErrorMessage = styled.div`
  ${styleMixin.Column('center', 'flex-start')}
  height: 100%;
  flex: 1;
  gap: 0.4rem;
  font-weight: 600;
`;
