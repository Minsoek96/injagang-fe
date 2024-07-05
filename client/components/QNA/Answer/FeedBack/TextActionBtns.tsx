import { StyleButton } from '@/styles/GlobalStyle';

import styled from 'styled-components';

type ActionProps = {
  handleClear: () => void;
  handleSubmit: () => void;
};
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
        <StyleButton
          key={info.id}
          onClick={info.onClick}
          Size={{ width: '150px', font: '15px' }}
        >
          {info.text}
        </StyleButton>
      ))}
    </ControlRightButtons>
  );
}

const ControlRightButtons = styled.div`
  button:first-child {
    margin-right: 5px;
  }

  @media screen and (max-width: 756px) {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;
