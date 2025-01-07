import styled from 'styled-components';

import { MainButton } from '@/src/shared/ui';

type Props = {
  onReset: () => void,
}

export default function TemplateSelectorFallback({ onReset }: Props) {
  return (
    <FallbackContainer>
      <Message>템플릿 목록을 불러오는 중 문제가 발생했습니다</Message>
      <MainButton
        label="재시도"
        onClick={onReset}
        variant="ghost"
      />
    </FallbackContainer>
  );
}

const FallbackContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem;
  border: 1px solid ${(props) => props.theme.colors.mainLine};
  border-radius: 0.4rem;
  background-color: ${(props) => props.theme.colors.primary};
`;

const Message = styled.span`
  font-size: 1.6rem;
`;
