import { MainButton } from '@/src/shared/components/button';
import { V } from '@/src/shared/styles';

import styled from 'styled-components';

type ActionProps = {
  handleClear: () => void;
  handleSubmit: () => void;
};

/** 텍스트 관련 액션을 수행 (비우기, 작성) */
export default function TextActionBtns({
  handleClear,
  handleSubmit,
}: ActionProps) {
  const btnInfo = [
    { id: 'btn-01', text: '비우기', onClick: handleClear },
    { id: 'btn-02', text: '작성', onClick: handleSubmit },
  ];
  return (
    <ControlRightButtons>
      {btnInfo.map((info) => (
        <MainButton
          label={info.text}
          key={info.id}
          onAction={info.onClick}
          sx={{ width: '150px', font: '15px' }}
        />
      ))}
    </ControlRightButtons>
  );
}

const ControlRightButtons = styled.div`
  display: flex;
  gap: 0.3rem;
  @media screen and (max-width: ${V.mediaMobile}) {
    button {
      width: auto!important;
    }
  }
`;
