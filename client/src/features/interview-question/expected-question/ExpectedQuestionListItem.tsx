import { V } from '@/src/shared/styles';
import { useState, useEffect, memo } from 'react';

import styled from 'styled-components';

type InterViewListItemProps = {
  questions: string;
  allCheck: boolean;
  id: number;
  onChange: (id: number, isCheck: boolean) => void;
};

function ExpectedQuestionListItem({
  onChange,
  questions,
  allCheck,
  id,
}: InterViewListItemProps) {
  const [isCheck, setIsCheck] = useState<boolean>(false);

  useEffect(() => {
    if (allCheck) {
      setIsCheck(true);
    } else {
      setIsCheck(false);
    }
  }, [allCheck]);

  /** 현재 리스트의 체크리스트 변경하고 핸들러를 통해 id값과 체크 상태를 전달 */
  const handleCheckList = () => {
    onChange(id, isCheck);
    setIsCheck((check) => !check);
  };

  return (
    <InterViewListItemStyle $checked={isCheck} onClick={handleCheckList}>
      <label htmlFor={questions}>{questions}</label>
    </InterViewListItemStyle>
  );
}

export default memo(ExpectedQuestionListItem);

type StyleProps = {
  $checked : boolean
}

const InterViewListItemStyle = styled.li<StyleProps>`
  background-color: ${(props) => (props.$checked ? props.theme.colors.mainHover : 'none')};
  opacity: ${(props) => (props.$checked ? 0.5 : 1)};
  font-size: 1.8rem;
  border-radius: .5rem;
  border: .1rem solid ${(props) => props.theme.colors.mainLine};
  padding: .5em 1em;
  border-left: 0.2em solid ${(props) => props.theme.colors.signatureColor};
  display: flex;
  width: 100%;
  margin-bottom: 12px;
  line-height: 1.4;
  input {
    margin-right: 15px;
  }

  @media screen and (max-width:${V.mediaMobile}){
    font-size: 1.4rem;
  }
`;
