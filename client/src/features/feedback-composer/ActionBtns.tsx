import { MainButton } from '@/src/shared/ui/button';
import { V } from '@/src/shared/styles';

import styled from 'styled-components';

type Infos = {
  id: string;
  text: string;
  onClick: () => void;
};

type ActionProps = {
  btnInfos: Infos[];
};

/** 피드백 관련 액션을 수행 (비우기, 작성) */
export default function ActionBtns({ btnInfos }: ActionProps) {
  return (
    <ControlRightButtons>
      {btnInfos.map((info) => (
        <MainButton
          label={info.text}
          key={info.id}
          onClick={info.onClick}
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
      width: auto !important;
    }
  }
`;
