import { memo } from 'react';

import styled from 'styled-components';

import { S } from '@/src/entities/interview_question';

type InterViewListItemProps = {
  question: string;
  isChecked: boolean;
  id: number;
  onChange: (id: number, isCheck: boolean) => void;
};

/** ExpectedQuestionItem : 예상 질문 아이템
 *
 * @param onChange : 아이템 체크 상태 변화
 * @param question : 질문 내용
 * @param isChecked : 현재 질문 체크 상태
 * @param id : 현재 질문 아이디
 */
function ExpectedQuestionItem({
  onChange,
  question,
  isChecked,
  id,
}: InterViewListItemProps) {
  /** 현재 리스트의 체크리스트 변경하고 핸들러를 통해 id값과 체크 상태를 전달 */
  const handleCheckList = () => {
    onChange(id, !isChecked);
  };

  return (
    <CheckedWrapper $checked={isChecked} onClick={handleCheckList}>
      <HiddenCheckbox
        type="checkbox"
        id={`checkbox-${id}`}
        checked={isChecked}
        onChange={handleCheckList}
      />
      <StyledLabel htmlFor={`checkbox-${id}`}>{question}</StyledLabel>
    </CheckedWrapper>
  );
}

export default memo(ExpectedQuestionItem);

type StyleProps = {
  $checked: boolean;
};

const CheckedWrapper = styled(S.ListItem)<StyleProps>`
  background-color: ${(props) =>
    (props.$checked ? props.theme.colors.mainHover : 'none')};
  opacity: ${(props) => (props.$checked ? 0.5 : 1)};
  border: 0.1rem solid ${(props) => props.theme.colors.mainLine};
  border-left: 4px solid ${(props) => props.theme.colors.signatureColor};

  cursor: pointer;
`;

const HiddenCheckbox = styled.input`
  display: none;
`;

const StyledLabel = styled.label`
  cursor: pointer;
  flex: 1;
  padding-inline: 1rem;
  user-select: none;
  word-break: break-all;
`;
