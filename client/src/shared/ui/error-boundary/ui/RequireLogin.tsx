import { BiErrorAlt } from 'react-icons/bi';

import { MainButton } from '@/src/shared/ui';
import { S } from './styled';

type Props = {
    onReset : ()=>void;
}
export default function RequireLogin({ onReset }:Props) {
  const handleClick = () => {
    onReset();
    const returnUrl = encodeURIComponent(window.location.pathname + window.location.search);
    window.location.href = `/login?returnUrl=${returnUrl}`;
  };

  return (
    <S.container>
      <S.iconWrapper>
        <BiErrorAlt size={48} />
      </S.iconWrapper>
      <S.messageContainer>

        <S.errorTitle>로그인이 만료되었습니다.</S.errorTitle>
        <S.errorMessage>로그인 세션이 만료되었어요.</S.errorMessage>
      </S.messageContainer>
      <MainButton onClick={handleClick} label="다시 로그인" variant="signature" />
    </S.container>
  );
}
