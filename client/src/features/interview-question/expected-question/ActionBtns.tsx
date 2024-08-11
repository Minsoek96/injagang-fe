import { MainButton } from '@/src/shared/components/button';
import { interviewType } from '@/src/entities/interview_question';
import { useAuthStore } from '@/src/entities/auth';
import styled from 'styled-components';

interface ActionBtnProps {
  checkList: number[];
  onRemove: (checkList: number[]) => void;
  onToggleAll: () => void;
  isAllChecked: boolean;
  onAdd: (questions: interviewType.IQuestion[], checkList: number[]) => void;
  questions: interviewType.IQuestion[];
}

function ActionBtns({
  onToggleAll,
  onRemove,
  checkList,
  isAllChecked,
  onAdd,
  questions,
}: ActionBtnProps) {
  const { role } = useAuthStore();
  const isAdmin = role === 'ADMIN' ? 'ADMIN' : 'USER';

  const handleRemove = () => {
    onToggleAll();
    onRemove(checkList);
  };

  const btnConfig = {
    ADMIN: {
      onClick: handleRemove,
      text: '삭제하기',
    },
    USER: {
      onClick: () => onAdd(questions, checkList),
      text: '항목추가',
    },
  };

  return (
    <ActionContainer>
      <MainButton
        label={isAllChecked ? '전체해제' : '전체선택'}
        onAction={onToggleAll}
        sx={{ width: '100%', height: '4rem', marginRight: '.5rem' }}
      />
      <MainButton
        label={btnConfig[isAdmin].text}
        onAction={btnConfig[isAdmin].onClick}
        sx={{ width: '100%', height: '4rem' }}
      />
    </ActionContainer>
  );
}

export default ActionBtns;

const ActionContainer = styled.div`
  display: flex;
  width: 100%;
`;
