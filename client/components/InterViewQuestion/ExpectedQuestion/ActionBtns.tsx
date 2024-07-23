import { BaseButton } from '@/src/shared/components/button';
import { interviewType } from '@/src/entities/interview_question';
import { useAuthStore } from '@/src/entities/auth';

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
    <div>
      <BaseButton
        onClick={onToggleAll}
        $Size={{ width: '100px', font: '15px' }}
      >
        {isAllChecked ? '전체해제' : '전체선택'}
      </BaseButton>
      <BaseButton
        onClick={btnConfig[isAdmin].onClick}
        $Size={{ width: '100px', font: '15px' }}
      >
        {btnConfig[isAdmin].text}
      </BaseButton>
    </div>
  );
}

export default ActionBtns;
