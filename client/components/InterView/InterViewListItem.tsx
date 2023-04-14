import React, { useState, useEffect } from "react";
import styled from "styled-components";

const InterViewListItemStyle = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 3px;
  input {
    margin-right: 15px;
  }
`;

type InterViewListItemProps = {
  questions: string;
  allCheck: boolean;
  id: number;
  onChange: (id: number, isCheck: boolean) => void;
};

const InterViewListItem = ({
  onChange,
  questions,
  allCheck,
  id,
}: InterViewListItemProps) => {
  const [isCheck, setIsCheck] = useState<boolean>(false);

  useEffect(() => {
    if (allCheck) {
      setIsCheck(true);
    } else {
      setIsCheck(false);
    }
  }, [allCheck]);

  /**현재 리스트의 체크리스트 변경하고 핸들러를 통해 id값과 체크 상태를 전달 */
  const handleCheckList = () => {
    onChange(id, isCheck);
    setIsCheck(!isCheck);
  };
  return (
    <InterViewListItemStyle>
      <input type="checkbox" checked={isCheck} onChange={handleCheckList} />
      <label htmlFor={questions}>{questions}</label>
    </InterViewListItemStyle>
  );
};

export default React.memo(InterViewListItem);
