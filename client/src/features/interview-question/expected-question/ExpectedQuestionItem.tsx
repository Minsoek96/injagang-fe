import { memo } from 'react';

import { V } from '@/src/shared/styles';

import styled from 'styled-components';

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
        readOnly
      />
      <label htmlFor={`checkbox-${id}`}>{question}</label>
    </CheckedWrapper>
  );
}

export default memo(ExpectedQuestionItem);

type StyleProps = {
  $checked: boolean;
};

const CheckedWrapper = styled.li<StyleProps>`
  background-color: ${(props) =>
    (props.$checked ? props.theme.colors.mainHover : 'none')};
  opacity: ${(props) => (props.$checked ? 0.5 : 1)};
  font-size: 1.8rem;
  border-radius: 0.5rem;
  border: 0.1rem solid ${(props) => props.theme.colors.mainLine};
  padding: 0.5em 1em;
  border-left: 0.2em solid ${(props) => props.theme.colors.signatureColor};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  margin-bottom: 12px;
  line-height: 1.4;
  cursor: pointer;

  @media screen and (max-width: ${V.mediaMobile}) {
    font-size: 1.4rem;
  }
`;

const HiddenCheckbox = styled.input`
  display: none;
`;
