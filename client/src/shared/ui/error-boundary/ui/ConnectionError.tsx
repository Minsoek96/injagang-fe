/* eslint-disable no-alert */
import { BiErrorAlt } from 'react-icons/bi';
import { MdRefresh } from 'react-icons/md';
import { FaPhoneAlt } from 'react-icons/fa';

import { MainButton } from '@/src/shared/ui';

import { S } from './styled';

type Props = {
  onReset: () => void;
};

export default function ConnectionError({ onReset }: Props) {
  const handleClick = () => {
    onReset();
  };

  const copyAdminNumber = () => {
    const adminNumber = 'admin@gmail.com';
    navigator.clipboard
      .writeText(adminNumber)
      .then(() => {
        alert('관리자 연락처가 복사되었습니다.');
      })
      .catch(() => {
        alert(`복사에 실패했습니다. ${adminNumber}를 메모해주세요.`);
      });
  };

  return (
    <S.container>
      <S.iconWrapper>
        <BiErrorAlt size={48} />
      </S.iconWrapper>
      <S.messageContainer>
        <S.errorTitle>페이지내에 문제가 발생했습니다.</S.errorTitle>
        <S.errorMessage>잠시 후 다시 시도 해주세요.</S.errorMessage>
        <S.errorMessage>
          정상화가 되지 않으면 관리자에게 문의를 주세요.
        </S.errorMessage>
      </S.messageContainer>
      <S.buttonContainer>
        <MainButton
          onClick={handleClick}
          label={(
            <>
              <MdRefresh size={20} />
              <p>다시시도</p>
            </>
          )}
          variant="signature"
        />
        <MainButton
          onClick={copyAdminNumber}
          label={(
            <>
              <FaPhoneAlt size={18} />
              <p>관리자 연락처 복사</p>
            </>
          )}
          variant="signature"
        />
      </S.buttonContainer>
    </S.container>
  );
}
