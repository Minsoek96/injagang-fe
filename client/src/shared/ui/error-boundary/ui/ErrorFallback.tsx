import { BiErrorAlt } from 'react-icons/bi';

import { MainButton } from '@/src/shared/ui/button';
import { S } from './styled';

type Props = {
    onReset: () => void;
    title: string;
    message: string;
}

export default function ErrorFallback({
  onReset,
  title,
  message,
}: Props) {
  return (
    <S.container>
      <S.iconWrapper>
        <BiErrorAlt size={48} />
      </S.iconWrapper>
      <S.messageContainer>
        <S.errorTitle>{title}</S.errorTitle>
        <S.errorMessage>{message}</S.errorMessage>
      </S.messageContainer>
      <MainButton onClick={onReset} label="다시 시도" variant="signature" />
    </S.container>
  );
}
